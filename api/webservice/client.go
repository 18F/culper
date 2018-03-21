package webservice

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Client struct {
	endpointURL    string
	privateKeyPath string
	ipAddr         string
}

// ImportRequest is used to import applicant information into eqip. Based on the documentation,
// error responses possible with this service call include EqipWSException and CharacterEncodingException.
func (c *Client) ImportRequest(r *ImportRequest) (*ImportSOAPResponse, error) {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var importResp ImportSOAPResponse
	// Execute request. Errors returned here will be network, decoder or token generation related
	if err := c.Send(r, &importResp); err != nil {
		return nil, err
	}
	return &importResp, nil
}

func (c *Client) Send(action RequestBody, response Body) error {
	unsignedToken := generateSecurityToken()
	signedToken, err := signSecurityToken(unsignedToken, c.privateKeyPath)

	if err != nil {
		return err
	}

	xmlContent, err := NewSOAPEnvelopeTemplate(action, unsignedToken, string(signedToken))
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	buf := new(bytes.Buffer)
	buf.ReadFrom(xmlContent)

	var temp struct {
		XML []byte `xml:",innerxml"`
	}
	err = xml.Unmarshal(buf.Bytes(), &temp)
	if err != nil {
		fmt.Println("Error unmarshalling xml: ", err)
		return err
	}
	fmt.Println("======================== XML Request =======================")
	fmt.Println(string(temp.XML))
	fmt.Println("============================================================")
	resp, err := http.Post(c.endpointURL, "text/xml; charset=utf-8", bytes.NewReader(temp.XML))
	if err != nil {
		response.SetResponseBody([]byte(err.Error()))
		return err
	}
	defer resp.Body.Close()
	if bodyBytes, err := ioutil.ReadAll(resp.Body); err != nil {
		response.SetResponseBody([]byte(err.Error()))
		return err
	} else {
		response.SetResponseBody(bodyBytes)
		return xml.Unmarshal(bodyBytes, response)
	}
}

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
