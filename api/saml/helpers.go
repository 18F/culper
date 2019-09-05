package saml

import (
	"testing"

	saml "github.com/RobotsAndPencils/go-saml"
)

// TestResponseConfig is way to configure CreateSamlTestResponse
type TestResponseConfig struct {
	SigningCert    string
	SigningKey     string
	IDPIssuerURL   string
	SSODescription string
	CallbackURL    string
}

// CreateSamlTestResponse crafts a SAML response, mimicing a response from WSO2
func CreateSamlTestResponse(t *testing.T, conf TestResponseConfig) string {
	publickey, exErr := extractCertBody(conf.SigningCert)
	if exErr != nil {
		t.Fatal(exErr)
	}

	// Create a response
	signedResponse := saml.NewSignedResponse()
	signedResponse.Destination = conf.CallbackURL
	signedResponse.Issuer.Url = conf.IDPIssuerURL
	signedResponse.Assertion.Issuer.Url = conf.IDPIssuerURL
	signedResponse.Signature.KeyInfo.X509Data.X509Certificate.Cert = publickey
	signedResponse.Assertion.Subject.NameID.Value = "test01"
	signedResponse.AddAttribute("uid", "test01")
	signedResponse.AddAttribute("email", "someone@domain.com")
	signedResponse.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.InResponseTo = conf.CallbackURL
	signedResponse.InResponseTo = conf.SSODescription
	signedResponse.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.Recipient = conf.CallbackURL

	signedResponse.Assertion.AuthnStatements = append(signedResponse.Assertion.AuthnStatements, saml.AuthnStatement{})
	signedResponse.Assertion.AuthnStatements[0].SessionIndex = "fake-session-index"

	// Signed base64 encoded XML string
	// For testing purposes, we just just the same signing key as our signing key to sign the response
	encodedResponse, err := signedResponse.EncodedSignedString(conf.SigningKey)
	if err != nil {
		t.Fatal(err)
	}

	return encodedResponse
}
