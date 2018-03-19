package webservice

import (
	"bytes"
	"encoding/base64"
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
func (c *Client) ImportRequest(r *ImportRequest) (*ImportRequestResponse, error) {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var importResp struct {
		SOAPFault
		ImportRequestResponse *ImportRequestResponse `xml:"Body>importRequestResponse"`
	}
	// Execute request. Errors returned here will be network, decoder or token generation related
	if err := c.Send(r, &importResp); err != nil {
		return nil, err
	}
	// Now check if application level errors were returned in the <Fault> element
	if err := importResp.SOAPFault.Error(); err != nil {
		return nil, err
	}
	return importResp.ImportRequestResponse, nil
}

func (c *Client) GetRequestFormPDF(r *GetRequestFormPDF) (*GetRequestFormPDFResponse, error) {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var getPDFresp struct {
		SOAPFault
		GetRequestFormPDFResponse *GetRequestFormPDFResponse `xml:"Body>getRequestFormPdfResponse"`
	}
	// Execute request. Errors returned here will be network, decoder or token generation related
	if err := c.Send(r, &getPDFresp); err != nil {
		return nil, err
	}
	// Now check if application level errors were returned in the <Fault> element
	if err := getPDFresp.SOAPFault.Error(); err != nil {
		return nil, err
	}

	b, err := base64.StdEncoding.DecodeString(getPDFresp.GetRequestFormPDFResponse.Return)
	if err != nil {
		return nil, err
	}
	ioutil.WriteFile("test.pdf", b, 0777)
	return getPDFresp.GetRequestFormPDFResponse, nil
}

func (c *Client) Send(action RequestBody, response Body) error {
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
		return err
	}
	defer resp.Body.Close()
	if bodyBytes, err := ioutil.ReadAll(resp.Body); err != nil {
		return err
	} else {
		respStr := string(bodyBytes)
		fmt.Println("=============== Response ================")
		fmt.Println(respStr)
		fmt.Println("=========================================")
		return xml.Unmarshal(bodyBytes, response)

	}
}

func (c *Client) IsAlive() error {
	// Use anonymous struct to create temporary structure that pulls out just what we need
	var isAliveResp struct {
		SOAPFault
	}
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
