package saml

import (
	"encoding/base64"
	"errors"
	"net/url"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	saml "github.com/RobotsAndPencils/go-saml"
)

// Service implements the handling of SAMl requests and responses.
type Service struct {
	Log      api.LogService
	Env      api.Settings
	provider saml.ServiceProviderSettings
}

// CreateAuthenticationRequest creates a SAML 2.0 authentication request based on the service provider settings.
// If configured to sign the request then the Base64 XML will be signed.
func (service *Service) CreateAuthenticationRequest() (string, string, error) {
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

	url, err = getAuthnRequestURL(service.provider.IDPSSOURL, "state")
	if err != nil {
		return "", "", err
	}
	return encoded, url, err
}

// ValidateAuthenticationResponse validations a SAML authentication response.
func (service *Service) ValidateAuthenticationResponse(encoded string) (string, error) {
	service.configure()

	authnResponseXML, _ := base64.StdEncoding.DecodeString(encoded)
	service.Log.Debug("SAML authentication response", api.LogFields{"xml": string(authnResponseXML)})

	response, err := saml.ParseEncodedResponse(encoded)
	if err != nil {
		service.Log.WarnError(api.SamlParseError, err, api.LogFields{})
		return "", err
	}

	// err = response.Validate(&service.provider)
	err = service.validate(response, string(authnResponseXML))
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
func (service *Service) configure() {
	service.provider = saml.ServiceProviderSettings{
		PublicCertPath:              service.Env.String(api.SamlPublicCert),
		PrivateKeyPath:              service.Env.String(api.SamlPrivateCert),
		IDPSSOURL:                   service.Env.String(api.SamlIdpSsoURL),
		IDPSSODescriptorURL:         service.Env.String(api.SamlIdpSsoDescURL),
		IDPPublicCertPath:           service.Env.String(api.SamlIdpPublicCert),
		SPSignRequest:               service.Env.True(api.SamlSignRequest),
		AssertionConsumerServiceURL: service.Env.String(api.SamlConsumerServiceURL),
	}

	if service.provider.AssertionConsumerServiceURL == "" {
		service.provider.AssertionConsumerServiceURL = service.Env.String(api.APIBaseURL) + "/auth/saml/callback"
	}

	service.provider.Init()
}

func (service *Service) validate(response *saml.Response, original string) error {
	if response.Version != "2.0" {
		return errors.New("unsupported SAML Version")
	}

	if len(response.ID) == 0 {
		return errors.New("missing ID attribute on SAML Response")
	}

	if len(response.Assertion.ID) == 0 {
		return errors.New("no Assertions")
	}

	if len(response.Signature.SignatureValue.Value) == 0 {
		return errors.New("no signature")
	}

	if response.Destination != service.provider.AssertionConsumerServiceURL {
		return errors.New("destination mismath expected: " + service.provider.AssertionConsumerServiceURL + " not " + response.Destination)
	}

	if response.Assertion.Subject.SubjectConfirmation.Method != "urn:oasis:names:tc:SAML:2.0:cm:bearer" {
		return errors.New("assertion method exception")
	}

	if response.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.Recipient != service.provider.AssertionConsumerServiceURL {
		return errors.New("subject recipient mismatch, expected: " + service.provider.AssertionConsumerServiceURL + " not " + response.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.Recipient)
	}

	//CHECK TIMES
	expires := response.Assertion.Subject.SubjectConfirmation.SubjectConfirmationData.NotOnOrAfter
	notOnOrAfter, e := time.Parse(time.RFC3339, expires)
	if e != nil {
		return e
	}
	if notOnOrAfter.Before(time.Now()) {
		return errors.New("assertion has expired on: " + expires)
	}

	err := saml.VerifyResponseSignature(original, service.provider.IDPPublicCertPath)
	if err != nil {
		if service.Env.True(api.SamlVerifyInsecure) {
			service.Log.WarnError(api.SamlVerificationError, err, api.LogFields{})
		} else {
			return err
		}
	}

	return nil
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

// getAuthnRequestURL generates a URL for the AuthnRequest to the IdP with the RelayState parameter encoded
// Altered from the original version from RobotsAndPencils/go-saml so that it
// does not redundantly encode the AuthnRequest as a GET query parameter. The
// login form does a POST to avoid bumping into referrer/URL/cookie maximums
// in browsers and NGINX.
func getAuthnRequestURL(baseURL string, state string) (string, error) {
	u, err := url.Parse(baseURL)
	if err != nil {
		return "", err
	}

	q := u.Query()
	q.Add("RelayState", state)
	u.RawQuery = q.Encode()
	return u.String(), nil
}
