package saml

import (
	"bytes"
	"encoding/base64"
	"encoding/pem"
	"encoding/xml"
	"io/ioutil"
	"os"
	"os/exec"
	"strings"
	"time"

	saml "github.com/RobotsAndPencils/go-saml"
	"github.com/pkg/errors"
	"github.com/satori/go.uuid"
)

// logoutRequest is a SAML Logout Request message XML
type logoutRequest struct {
	XMLName          xml.Name  `xml:"samlp:LogoutRequest"`
	SAMLNamespace    string    `xml:"xmlns:saml,attr"`
	SAMLPNamespace   string    `xml:"xmlns:samlp,attr"`
	SAMLSigNamespace string    `xml:"xmlns:samlsig,attr"`
	ID               string    `xml:"ID,attr"`
	Version          string    `xml:"Version,attr"`
	IssueInstant     time.Time `xml:"IssueInstant,attr"`

	Issuer string `xml:"saml:Issuer"`

	Signature *saml.Signature

	Name logoutRequestName

	SessionIndex string `xml:"samlp:SessionIndex"`
}

// logoutRequestName is the name field of the XML
type logoutRequestName struct {
	XMLName    xml.Name `xml:"saml:NameID"`
	NameFormat string   `xml:"Format,attr"`
	NameID     string   `xml:",chardata"`
}

// newLogoutRequest creates a new logout request
func newLogoutRequest(issuer string, username string, sessionIndex string) logoutRequest {
	requestID := "_" + uuid.NewV4().String()
	issueInstant := time.Now().UTC()

	emailFormat := "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
	samlpNamespace := "urn:oasis:names:tc:SAML:2.0:protocol"
	samlNamespace := "urn:oasis:names:tc:SAML:2.0:assertion"
	samlSigNamespace := "http://www.w3.org/2000/09/xmldsig#"

	return logoutRequest{
		ID:               requestID,
		Version:          "2.0",
		IssueInstant:     issueInstant,
		SAMLPNamespace:   samlpNamespace,
		SAMLNamespace:    samlNamespace,
		SAMLSigNamespace: samlSigNamespace,
		SessionIndex:     sessionIndex,
		Name: logoutRequestName{
			NameID:     username,
			NameFormat: emailFormat,
		},
		Issuer: issuer,
	}
}

func extractCertBody(certFile string) (string, error) {

	certBytes, err := ioutil.ReadFile(certFile)
	if err != nil {
		return "", errors.Wrap(err, "Failed to read cert file")
	}

	data, _ := pem.Decode(certBytes)
	str := base64.StdEncoding.EncodeToString(data.Bytes)
	return str, nil

}

func (req *logoutRequest) addSignatureTemplate(certBody string) {

	signature := &saml.Signature{
		XMLName: xml.Name{
			Local: "samlsig:Signature",
		},
		Id: "Signature1",
		SignedInfo: saml.SignedInfo{
			XMLName: xml.Name{
				Local: "samlsig:SignedInfo",
			},
			CanonicalizationMethod: saml.CanonicalizationMethod{
				XMLName: xml.Name{
					Local: "samlsig:CanonicalizationMethod",
				},
				Algorithm: "http://www.w3.org/2001/10/xml-exc-c14n#",
			},
			SignatureMethod: saml.SignatureMethod{
				XMLName: xml.Name{
					Local: "samlsig:SignatureMethod",
				},
				Algorithm: "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
			},
			SamlsigReference: saml.SamlsigReference{
				XMLName: xml.Name{
					Local: "samlsig:Reference",
				},
				URI: "#" + req.ID,
				Transforms: saml.Transforms{
					XMLName: xml.Name{
						Local: "samlsig:Transforms",
					},
					Transform: []saml.Transform{saml.Transform{
						XMLName: xml.Name{
							Local: "samlsig:Transform",
						},
						Algorithm: "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
					}},
				},
				DigestMethod: saml.DigestMethod{
					XMLName: xml.Name{
						Local: "samlsig:DigestMethod",
					},
					Algorithm: "http://www.w3.org/2000/09/xmldsig#sha1",
				},
				DigestValue: saml.DigestValue{
					XMLName: xml.Name{
						Local: "samlsig:DigestValue",
					},
				},
			},
		},
		SignatureValue: saml.SignatureValue{
			XMLName: xml.Name{
				Local: "samlsig:SignatureValue",
			},
		},
		KeyInfo: saml.KeyInfo{
			XMLName: xml.Name{
				Local: "samlsig:KeyInfo",
			},
			X509Data: saml.X509Data{
				XMLName: xml.Name{
					Local: "samlsig:X509Data",
				},
				X509Certificate: saml.X509Certificate{
					XMLName: xml.Name{
						Local: "samlsig:X509Certificate",
					},
					Cert: certBody,
				},
			},
		},
	}

	req.Signature = signature
}

// This code is ripped from https://github.com/RobotsAndPencils/go-saml/blob/master/xmlsec.go
// wml 2018-12-06: The go library I tried to use to sign our xml never gave me a signature I could validate
// with another tool. The robots and pencils code we are using to sign AuthN requests uses a separate binary
// to do xml signatures, that worked so I chose to re-use it in our LogoutRequests. It would probably be best long
// term to contribute this bak to the robots and pencils library.
// The main advantage to using the separate tool is that it is returning the exact xml string that has been signed.
// The library I tried to use (https://github.com/amdonov/xmlsig) added the signature to the go struct, I suspect that
// some sort of unexpectedness in the serialization is why the digests never seemed to check out.
func sign(xml string, privateKeyPath string, id string) (string, error) {

	samlXmlsecInput, err := ioutil.TempFile(os.TempDir(), "tmpgs")
	if err != nil {
		return "", err
	}
	defer deleteTempFile(samlXmlsecInput.Name())
	samlXmlsecInput.WriteString(xml)
	samlXmlsecInput.Close()

	samlXmlsecOutput, err := ioutil.TempFile(os.TempDir(), "tmpgs")
	if err != nil {
		return "", err
	}
	defer deleteTempFile(samlXmlsecOutput.Name())
	samlXmlsecOutput.Close()

	// fmt.Println("xmlsec1", "--sign", "--privkey-pem", privateKeyPath,
	// 	"--id-attr:ID", id,
	// 	"--output", samlXmlsecOutput.Name(), samlXmlsecInput.Name())
	output, err := exec.Command("xmlsec1", "--sign", "--privkey-pem", privateKeyPath,
		"--id-attr:ID", id,
		"--output", samlXmlsecOutput.Name(), samlXmlsecInput.Name()).CombinedOutput()
	if err != nil {
		return "", errors.New(err.Error() + " : " + string(output))
	}

	samlSignedRequest, err := ioutil.ReadFile(samlXmlsecOutput.Name())
	if err != nil {
		return "", err
	}
	samlSignedRequestXML := strings.Trim(string(samlSignedRequest), "\n")

	return samlSignedRequestXML, nil
}

// deleteTempFile remove a file and ignore error
// Intended to be called in a defer after the creation of a temp file to ensure cleanup
func deleteTempFile(filename string) {
	_ = os.Remove(filename)
}

// ---- /end code that was directly copied from R&P

func (req *logoutRequest) signedRequest(certFile, keyFile string) (string, error) {

	certBody, err := extractCertBody(certFile)
	if err != nil {
		return "", err
	}

	req.addSignatureTemplate(certBody)

	xmlBytes, err := req.xml()
	if err != nil {
		return "", errors.Wrap(err, "Couldn't generate XML for logout request")
	}
	sloRequestID := "urn:oasis:names:tc:SAML:2.0:protocol:LogoutRequest"

	signedXML, err := sign(string(xmlBytes), keyFile, sloRequestID)
	if err != nil {
		return "", errors.Wrap(err, "failed to sign the LogoutRequest")
	}

	return signedXML, nil
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
