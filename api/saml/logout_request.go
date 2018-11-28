package saml

import (
	"bytes"
	"crypto/tls"
	"encoding/base64"
	"encoding/xml"
	"time"

	"github.com/amdonov/xmlsig"
	"github.com/satori/go.uuid"
)

// logoutRequest is a SAML Logout Request message XML
type logoutRequest struct {
	XMLName        xml.Name  `xml:"samlp:LogoutRequest"`
	ID             string    `xml:"ID,attr"`
	Version        string    `xml:"Version,attr"`
	IssueInstant   time.Time `xml:"IssueInstant,attr"`
	SAMLPNamespace string    `xml:"xmlns:samlp,attr"`
	SAMLNamespace  string    `xml:"xmlns:saml,attr"`
	SessionIndex   string    `xml:"samlp:SessionIndex"`

	Name   logoutRequestName
	Issuer string `xml:"saml:Issuer"`

	Signature *xmlsig.Signature
}

// logoutRequestName is the name field of the XML
type logoutRequestName struct {
	XMLName    xml.Name `xml:"saml:NameID"`
	NameFormat string   `xml:"Format,attr"`
	NameID     string   `xml:",chardata"`
}

// newLogoutRequest creates a new logout request
func newLogoutRequest(issuer string, username string, sessionIndex string) logoutRequest {
	requestID := uuid.NewV4().String()
	issueInstant := time.Now().UTC()

	emailFormat := "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
	samlpNamespace := "urn:oasis:names:tc:SAML:2.0:protocol"
	samlNamespace := "urn:oasis:names:tc:SAML:2.0:assertion"

	return logoutRequest{
		ID:             requestID,
		Version:        "2.0",
		IssueInstant:   issueInstant,
		SAMLPNamespace: samlpNamespace,
		SAMLNamespace:  samlNamespace,
		SessionIndex:   sessionIndex,
		Name: logoutRequestName{
			NameID:     username,
			NameFormat: emailFormat,
		},
		Issuer: issuer,
	}
}

func (req *logoutRequest) signRequest(certFile, keyFile string) error {
	cert, err := tls.LoadX509KeyPair(certFile, keyFile)
	if err != nil {
		return err
	}

	signer, err := xmlsig.NewSigner(cert)
	if err != nil {
		return err
	}

	sig, err := signer.CreateSignature(req)
	if err != nil {
		return err
	}
	req.Signature = sig

	return nil
}

// xml returns the xml for the logout request
func (req *logoutRequest) xml() ([]byte, error) {

	var b bytes.Buffer
	b.Write([]byte(xml.Header))
	encoder := xml.NewEncoder(&b)
	err := encoder.Encode(req)
	if err != nil {
		return nil, err
	}
	fullOutput := b.Bytes()


	return fullOutput, nil

}

// base64 returns the base64 encoding of the xml of the logout request
func (req *logoutRequest) base64() (string, error) {
	fullXML, err := req.xml()
	if err != nil {
		return "", err
	}

	encoded := base64.StdEncoding.EncodeToString(fullXML)

	return encoded, nil

}
