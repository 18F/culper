package webservice

import (
	"encoding/xml"
	"fmt"
	"net/http"
)

// Client contains methods that interact with the eqip webservice
type Client struct {
	endpointURL    string
	privateKeyPath string
}

// IsAlive is a no-op method that allows for testing that the e-QIP Agency Web Service Interface is available and operating
func (c *Client) IsAlive() error {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var isAliveResp struct {
		SOAPFault
	}
	var isAlive IsAlive
	if err := c.Execute(&isAlive, &isAliveResp); err != nil {
		return err
	}
	return isAliveResp.SOAPFault.Error()
}

// ImportRequest is used to import applicant information into eqip
func (c *Client) ImportRequest(r *ImportRequest) (*ImportRequestResponse, error) {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var importResp struct {
		SOAPFault
		ImportRequestResponse *ImportRequestResponse `xml:"Body>importRequestResponse"`
	}
	if err := c.Execute(r, &importResp); err != nil {
		return nil, err
	}
	if err := importResp.SOAPFault.Error(); err != nil {
		return nil, err
	}
	return importResp.ImportRequestResponse, nil
}

// Execute sends a SOAP request to the designated endpoint. It generates and
// signs the security token and sends a POST request.
func (c *Client) Execute(action Body, response Body) error {
	unsignedToken := generateSecurityToken()
	signedToken, err := signSecurityToken(unsignedToken, c.privateKeyPath)

	if err != nil {
		return err
	}
	envelope := NewSOAPEnvelope(action, unsignedToken, string(signedToken))
	xmlContent, err := envelope.XML()
	if err != nil {
		return err
	}
	resp, err := http.Post(c.endpointURL, "application/xml", xmlContent)
	if err != nil {
		return err
	}

	if err := xml.NewDecoder(resp.Body).Decode(&response); err != nil {
		fmt.Println("Fail decoding")
		return err
	}
	return nil
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
