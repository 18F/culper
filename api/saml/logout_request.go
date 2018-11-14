package saml

import (
	"encoding/base64"
	"encoding/xml"
	"time"

	"github.com/satori/go.uuid"
)

type LogoutRequest struct {
	XMLName        xml.Name  `xml:"samlp:LogoutRequest"`
	ID             string    `xml:"ID,attr"`
	Version        string    `xml:"Version,attr"`
	IssueInstant   time.Time `xml:"IssueInstant,attr"`
	SAMLPNamespace string    `xml:"xmlns:samlp,attr"`
	SAMLNamespace  string    `xml:"xmlns:saml,attr"`
	SessionIndex   string    `xml:"samlp:SessionIndex"`

	Name   LogoutRequestName
	Issuer string `xml:"saml:Issuer"`
}

type LogoutRequestName struct {
	XMLName    xml.Name `xml:"saml:NameID"`
	NameFormat string   `xml:"Format,attr"`
	NameID     string   `xml:",chardata"`
}

func NewLogoutRequest(issuer string, username string, sessionIndex string) LogoutRequest {
	requestID := uuid.NewV4().String()
	issueInstant := time.Now().UTC()

	emailFormat := "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
	samlpNamespace := "urn:oasis:names:tc:SAML:2.0:protocol"
	samlNamespace := "urn:oasis:names:tc:SAML:2.0:assertion"

	return LogoutRequest{
		ID:             requestID,
		Version:        "2.0",
		IssueInstant:   issueInstant,
		SAMLPNamespace: samlpNamespace,
		SAMLNamespace:  samlNamespace,
		SessionIndex:   sessionIndex,
		Name: LogoutRequestName{
			NameID:     username,
			NameFormat: emailFormat,
		},
		Issuer: issuer,
	}
}

func (req *LogoutRequest) XML() ([]byte, error) {
	output, err := xml.MarshalIndent(req, "", "    ")
	if err != nil {
		return nil, err
	}

	fullOutput := append([]byte(xml.Header), output...)

	return fullOutput, nil

}

func (req *LogoutRequest) Base64() (string, error) {
	fullXML, err := req.XML()
	if err != nil {
		return "", err
	}

	encoded := base64.StdEncoding.EncodeToString(fullXML)

	return encoded, nil

}
