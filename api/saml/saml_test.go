package saml

import (
	"io/ioutil"
	"os"
	"regexp"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
	saml "github.com/RobotsAndPencils/go-saml"
)

func TestSamlResponse(t *testing.T) {
	os.Setenv("SAML_PUBLIC_CERT", "/go/src/github.com/18F/e-QIP-prototype/api/eapp.crt")
	os.Setenv("SAML_PRIVATE_CERT", "/go/src/github.com/18F/e-QIP-prototype/api/eapp.key")
	os.Setenv("SAML_IDP_SSO_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_SSO_DESC_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_PUBLIC_CERT", "/go/src/github.com/18F/e-QIP-prototype/api/eapp.crt")
	os.Setenv("SAML_SIGN_REQUEST", "1")
	os.Setenv("SAML_CONSUMER_SERVICE_URL", "")

	settings := mock.Native{}
	service := &Service{Log: &mock.LogService{}, Env: settings}

	// Create a request
	_, _, err := service.CreateAuthenticationRequest()
	if err != nil {
		t.Fatal(err)
	}

	// Public signing cert
	b, err := ioutil.ReadFile(settings.String(api.SamlPublicCert))
	if err != nil {
		t.Fatal(err)
	}
	publickey := string(b)
	re := regexp.MustCompile("---(.*)CERTIFICATE(.*)---")
	publickey = re.ReplaceAllString(publickey, "")
	publickey = strings.Trim(publickey, " \n")
	publickey = strings.Replace(publickey, " \n", "", -1)

	// Find the right callback URI
	callback := settings.String(api.SamlConsumerServiceURL)
	if callback == "" {
		callback = settings.String(api.APIBaseURL) + "/auth/saml/callback"
	}

	// Create a response
	signedResponse := saml.NewSignedResponse()
	signedResponse.Destination = callback
	signedResponse.Issuer.Url = settings.String(api.SamlIdpSsoURL)
	signedResponse.Assertion.Issuer.Url = settings.String(api.SamlIdpSsoURL)
	signedResponse.Signature.KeyInfo.X509Data.X509Certificate.Cert = publickey
	signedResponse.Assertion.Subject.NameID.Value = "test01"
	signedResponse.AddAttribute("uid", "test01")
	signedResponse.AddAttribute("email", "someone@domain")
	signedResponse.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.InResponseTo = callback
	signedResponse.InResponseTo = settings.String(api.SamlIdpSsoDescURL)
	signedResponse.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.Recipient = callback

	// Signed base64 encoded XML string
	encodedResponse, err := signedResponse.EncodedSignedString(settings.String(api.SamlPrivateCert))
	if err != nil {
		t.Fatal(err)
	}

	// Validate the response
	username, err := service.ValidateAuthenticationResponse(encodedResponse)
	if err != nil || username != "test01" {
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
