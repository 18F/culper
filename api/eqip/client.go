package eqip

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
)

// Client is a webservice client used to interact with eqip webservice
type Client struct {
	endpointURL    string
	privateKeyPath string
	ipAddr         string
}

// ImportRequest is used to import applicant information into eqip. Based on the documentation,
// error responses possible with this service call include EqipWSException and CharacterEncodingException.
func (c *Client) ImportRequest(r *ImportRequest) (*ImportSOAPResponse, error) {
	var importResp ImportSOAPResponse
	// Execute request. Errors returned here will be network, decoder or token generation related
	if err := c.Send(r, &importResp); err != nil {
		return nil, err
	}
	return &importResp, nil
}

// Send prepares the SOAP envelope and request body and fires off the request
func (c *Client) Send(action RequestBody, response Body) error {
	unsignedToken := generateSecurityToken()
	signedToken, err := signSecurityToken(unsignedToken, c.privateKeyPath)

	if err != nil {
		return err
	}

	// Generates XML based of text/templates from the golang lib.
	xmlContent, err := NewSOAPEnvelopeTemplate(action, unsignedToken, string(signedToken))
	if err != nil {
		return fmt.Errorf("Could not generate SOAP message: %s", err.Error())
	}
	buf := new(bytes.Buffer)
	buf.ReadFrom(xmlContent)

	// Since we're generating XML using templates and not structs, we pass the xml contents
	// into the XML marshaler to validate that we have generated valid XML. Issues with
	// invalid XML will be caught here. For instance, missing closing tag or mismatched tags.
	var temp struct {
		XML []byte `xml:",innerxml"`
	}
	err = xml.Unmarshal(buf.Bytes(), &temp)
	if err != nil {
		return fmt.Errorf("SOAP request is malformed: %s", err.Error())
	}

	resp, err := http.Post(c.endpointURL, "text/xml; charset=utf-8", bytes.NewReader(temp.XML))
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	status := fmt.Sprintf("Post %s: %s: ", c.endpointURL, resp.Status)

	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf(status+"Cannot read HTTP response: %s", err.Error())
	}

	err = xml.Unmarshal(bodyBytes, response)
	if err != nil {
		return fmt.Errorf(status+"HTTP response is not an expected SOAP message: %s", string(bodyBytes))
	}

	response.SetResponseBody(bodyBytes)
	return nil
}

// IsAlive checks if the webservice API is available
func (c *Client) IsAlive() error {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var isAliveResp IsAliveSOAPResponse
	var isAlive IsAlive
	if err := c.Send(&isAlive, &isAliveResp); err != nil {
		return err
	}
	return isAliveResp.SOAPFault.Error()
}

// NewClient creates a new Client that interacts with the eqip webservice. This client
// requires the endpoint URL to send data to and the path to the private key file
// that is used for signing security tokens.
func NewClient(endpointURL, privateKeyPath string) *Client {
	return &Client{
		endpointURL:    endpointURL,
		privateKeyPath: privateKeyPath,
	}
}
