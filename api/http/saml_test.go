package handlers

import (
	"strings"
	"testing"

	saml "github.com/RobotsAndPencils/go-saml"
)

func TestSamlResponse(t *testing.T) {
	// Configure SAML
	settings := configureSAML()

	// Create a request
	request, _, err := createAuthenticationRequest(settings)
	if err != nil {
		t.Fatal(err)
	}

	// Create a response
	signedResponse := saml.NewSignedResponse()
	signedResponse.Destination = settings.AssertionConsumerServiceURL
	signedResponse.Issuer.Url = request.Issuer.Url
	signedResponse.Assertion.Issuer.Url = request.Issuer.Url
	signedResponse.Signature.KeyInfo.X509Data.X509Certificate.Cert = request.Signature.KeyInfo.X509Data.X509Certificate.Cert
	signedResponse.Assertion.Subject.NameID.Value = "test01"
	signedResponse.AddAttribute("uid", "test01")
	signedResponse.AddAttribute("email", "someone@domain")
	signedResponse.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.InResponseTo = request.ID
	signedResponse.InResponseTo = request.ID
	signedResponse.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.Recipient = settings.AssertionConsumerServiceURL

	// Signed base64 encoded XML string
	encodedResponse, err := signedResponse.EncodedSignedString(settings.PrivateKeyPath)
	if err != nil {
		t.Fatal(err)
	}

	// Parse the encoded response
	response, err := saml.ParseEncodedResponse(encodedResponse)
	if err != nil {
		t.Fatal(err)
	}

	// Validate the response
	err = response.Validate(&settings)
	if err != nil {
		t.Fatal(err)
	}
}

func TestCleanName(t *testing.T) {
	var tests = []struct {
		nameID   string
		expected string
	}{
		{"test01", "test01"},
		{" \t\n test01     \n\n\r\t", "test01"},
		{"t\te\r\nst\n01", "test01"},
		{"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890", "12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"},
	}

	for _, x := range tests {
		if !strings.EqualFold(cleanName(x.nameID), x.expected) {
			t.Fatalf("Expected name to be '%s' but was '%s'.", x.expected, x.nameID)
		}
	}
}
