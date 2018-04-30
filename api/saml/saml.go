package saml

import (
	"encoding/base64"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
	saml "github.com/RobotsAndPencils/go-saml"
)

// SamlService implements the handling of SAMl requests and responses.
type SamlService struct {
	Log      api.LogService
	Env      api.Settings
	provider saml.ServiceProviderSettings
}

// CreateAuthenticationRequest creates a SAML 2.0 authentication request based on the service provider settings.
// If configured to sign the request then the Base64 XML will be signed.
func (service *SamlService) CreateAuthenticationRequest() (string, string, error) {
	service.configure()
	var encoded string
	var url string
	var err error

	// Generate the AuthnRequest and then get a base64 encoded string of the XML
	request := service.provider.GetAuthnRequest()
	if service.provider.SPSignRequest {
		encoded, err = request.EncodedSignedString(service.provider.PrivateKeyPath)
	} else {
		encoded, err = request.EncodedString()
	}

	if err != nil {
		return "", "", err
	}
	requestAsXML, _ := request.String()
	service.Log.Debug("SAML authentication request", api.LogFields{"xml": requestAsXML})

	// Get a URL formed with the SAMLRequest parameter
	url, err = saml.GetAuthnRequestURL(service.provider.IDPSSOURL, encoded, "state")
	if err != nil {
		return "", "", err
	}
	return encoded, url, err
}

// ValidateAuthenticationResponse validations a SAML authentication response.
func (service *SamlService) ValidateAuthenticationResponse(encoded string) (string, error) {
	service.configure()

	authnResponseXML, _ := base64.StdEncoding.DecodeString(encoded)
	service.Log.Debug("SAML authentication response", api.LogFields{"xml": string(authnResponseXML)})

	response, err := saml.ParseEncodedResponse(encoded)
	if err != nil {
		service.Log.WarnError(api.SamlParseError, err, api.LogFields{})
		return "", err
	}

	err = response.Validate(&service.provider)
	if err != nil {
		service.Log.WarnError(api.SamlInvalid, err, api.LogFields{})
		return "", err
	}

	username := cleanName(response.Assertion.Subject.NameID.Value)
	if username == "" {
		service.Log.WarnError(api.SamlIdentifierMissing, err, api.LogFields{})
		return "", err
	}

	return username, nil
}

// Example configuration:
//  - PublicCertPath:              "../default.crt",
//  - PrivateKeyPath:              "../default.key",
//  - IDPSSOURL:                   "http://idp/saml2",
//  - IDPSSODescriptorURL:         "http://idp/issuer",
//  - IDPPublicCertPath:           "idpcert.crt",
//  - SPSignRequest:               "true",
//  - AssertionConsumerServiceURL: "http://localhost:8000/saml_consume",
func (service *SamlService) configure() {
	service.provider = saml.ServiceProviderSettings{
		PublicCertPath:              service.Env.String("SAML_PUBLIC_CERT"),
		PrivateKeyPath:              service.Env.String("SAML_PRIVATE_CERT"),
		IDPSSOURL:                   service.Env.String("SAML_IDP_SSO_URL"),
		IDPSSODescriptorURL:         service.Env.String("SAML_IDP_SSO_DESC_URL"),
		IDPPublicCertPath:           service.Env.String("SAML_IDP_PUBLIC_CERT"),
		SPSignRequest:               service.Env.True("SAML_SIGN_REQUEST"),
		AssertionConsumerServiceURL: service.Env.String("SAML_CONSUMER_SERVICE_URL"),
	}

	if service.provider.AssertionConsumerServiceURL == "" {
		service.provider.AssertionConsumerServiceURL = service.Env.String("API_BASE_URL") + "/auth/saml/callback"
	}

	service.provider.Init()
}

// cleanName applies some basic sanitization of the NameID for storage.
func cleanName(nameID string) string {
	// Trim any leading or trailing whitespace characters.
	nameID = strings.TrimSpace(nameID)

	// Check for any special whitespace characters within the string and
	// remove them.
	for _, c := range []string{"\n", "\t", "\r"} {
		nameID = strings.Replace(nameID, c, "", -1)
	}

	// The database only allows the username to be 200 characters.
	// Passing an empty substring to `strings.Count()` returns the number of
	// runes + 1.
	if strings.Count(nameID, "")-1 > 200 {
		runes := []rune{}
		for i, r := range nameID {
			if i > 199 {
				break
			}
			runes = append(runes, r)
		}
		nameID = string(runes)
	}

	return nameID
}
