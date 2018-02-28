package webservice

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

// Client contains methods that interact with the eqip webservice
type Client struct {
	endpointURL    string
	privateKeyPath string
}

func (c *Client) IsAlive2() error {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var isAliveResp struct {
		SOAPFault
	}
	var isAlive IsAlive
	if err := c.Execute2(&isAlive, &isAliveResp); err != nil {
		return err
	}
	return isAliveResp.SOAPFault.Error()
}

func (c *Client) Execute2(action RequestBody, response Body) error {
	unsignedToken := generateSecurityToken()
	signedToken, err := signSecurityToken(unsignedToken, c.privateKeyPath)

	if err != nil {
		return err
	}

	//envelope := NewSOAPEnvelope(action, unsignedToken, string(signedToken))
	xmlContent, err := NewSOAPEnvelopeTemplate(action, unsignedToken, string(signedToken))
	if err != nil {
		fmt.Println("Error: ", err)
		return err
	}
	buf := new(bytes.Buffer)
	buf.ReadFrom(xmlContent)
	fmt.Println("======================== XML Request =======================")
	fmt.Println(buf.String())
	fmt.Println("============================================================")
	resp, err := http.Post(c.endpointURL, "text/xml; charset=utf-8", buf)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if bodyBytes, err := ioutil.ReadAll(resp.Body); err != nil {
		return err
	} else {
		fmt.Println("=============== Response ================")
		fmt.Println(resp.Header.Get("Content-Type"))
		fmt.Println(resp.Status)
		fmt.Println(resp.StatusCode)
		fmt.Println(resp.Header)
		fmt.Println(string(bodyBytes))
		ms := time.Now().UnixNano() / int64(time.Millisecond)
		filename := fmt.Sprintf("response-%v.html", ms)
		ioutil.WriteFile(filename, bodyBytes, 777)
		fmt.Println("=========================================")
	}
	fmt.Println("Decoding response")
	if err := xml.NewDecoder(resp.Body).Decode(&response); err != nil {
		return err
	}
	return nil
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

// ImportRequest is used to import applicant information into eqip. Based on the documentation,
// error responses possible with this service call include EqipWSException and CharacterEncodingException.
func (c *Client) ImportRequest(r *ImportRequest) (*ImportRequestResponse, error) {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var importResp struct {
		SOAPFault
		ImportRequestResponse *ImportRequestResponse `xml:"Body>importRequestResponse"`
	}
	// Execute request. Errors returned here will be network, decoder or token generation related
	if err := c.Execute(r, &importResp); err != nil {
		return nil, err
	}
	// Now check if application level errors were returned in the <Fault> element
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
	//xmlContent, err := NewSOAPEnvelopeTemplate(action, unsignedToken, string(signedToken))
	xmlContent, err := envelope.XML()
	if err != nil {
		return err
	}
	if err != nil {
		fmt.Println("Error: ", err)
	}
	buf := new(bytes.Buffer)
	buf.ReadFrom(xmlContent)
	fmt.Println("Cool")
	fmt.Println(buf.String())
	return nil

	resp, err := http.Post(c.endpointURL, "application/xml", xmlContent)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if bodyBytes, err := ioutil.ReadAll(resp.Body); err != nil {
		return err
	} else {
		fmt.Println(string(bodyBytes))
	}

	if err := xml.NewDecoder(resp.Body).Decode(&response); err != nil {
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
