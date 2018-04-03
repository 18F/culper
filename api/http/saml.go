package http

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
	saml "github.com/RobotsAndPencils/go-saml"
)

var (
	redirectTo = os.Getenv("API_REDIRECT")
)

type SamlHandler struct {
	Env      *api.Settings
	Log      *api.LogService
	Token    *api.TokenService
	Database *api.DatabaseService
}

// SamlServiceHandler is the initial entry point for authentication.
func (service SamlHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(SAML_ENABLED) {
		service.Log.Warn(api.SamlAttemptDenied, api.LogFields{})
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	service.Log.Debug("SAML configuration", api.LogFields{
		"PublicCertPath":              sp.PublicCertPath,
		"PrivateKeyPath":              sp.PrivateKeyPath,
		"IDPSSOURL":                   sp.IDPSSOURL,
		"IDPSSODescriptorURL":         sp.IDPSSODescriptorURL,
		"IDPPublicCertPath":           sp.IDPPublicCertPath,
		"SPSignRequest":               sp.SPSignRequest,
		"AssertionConsumerServiceURL": sp.AssertionConsumerServiceURL,
	})

	// Generate the AuthnRequest and then get a base64 encoded string of the XML
	request, encoded, err := createAuthenticationRequest(sp)
	if err != nil {
		service.Log.Warn(api.SamlRequestError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		requestAsXml, _ := request.String()
		log.WithField("xml", requestAsXml).Debug("SAML authentication request")
	}

	// Get a URL formed with the SAMLRequest parameter
	url, err := saml.GetAuthnRequestURL(sp.IDPSSOURL, encoded, "state")
	if err != nil {
		service.Log.Warn(api.SamlRequestURLError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	authnRequestXML, _ := authnRequest.String()
	service.Log.Debug("SAML authentication request", api.LogFields{"xml": authnRequestXML})
	EncodeJSON(w, struct {
		Base64XML string
		URL       string
	}{
		encoded,
		url,
	})
}

type SamlCallbackHandler struct {
	Env      *api.Settings
	Log      *api.LogService
	Token    *api.TokenService
	Database *api.DatabaseService
}

// SamlCallbackHandler is the returning entry point for authentication.
func (service SamlCallbackHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(SAML_ENABLED) {
		service.Log.Warn(api.SamlAttemptDenied)
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	encodedXML := r.FormValue("SAMLResponse")
	if encodedXML == "" {
		service.Log.Warn(api.SamlFormError)
		redirectAccessDenied(w, r)
		return
	}

	response, err := saml.ParseEncodedResponse(encodedXML)
	authnResponseXML, _ := response.String()
	service.Log.Debug("SAML authentication response", api.LogFields{"xml", authnResponseXML})
	if err != nil {
		service.Log.Warn(api.SamlParseError, err, api.LogFields{})
		redirectAccessDenied(w, r)
		return
	}

	sp := configureSAML(service.Env)
	err = response.Validate(&sp)
	if err != nil {
		service.Log.Warn(api.SamlInvalid, err, api.LogFields{})
		redirectAccessDenied(w, r)
		return
	}

	username := cleanName(response.Assertion.Subject.NameID.Value)
	if username == "" {
		service.Log.Warn(api.SamlIdentifierMissing, err, api.LogFields{})
		redirectAccessDenied(w, r)
		return
	}

	// Associate with a database context.
	account := &api.Account{
		Username: username,
	}
	if err := account.Get(); err != nil {
		service.Log.Warn(api.NoAccount, err, api.LogFields{"username": username})

		// Attempt to create a new account if one is not
		// found in the system but is verified to have
		// access.
		//
		// NOTE: This may only be a pilot circumstance. If so
		// make sure the final release does not allow the creation
		// of a new account and returns an error in its place.
		if err := account.Save(); err != nil {
			service.Log.Warn(api.AccountUpdateError, err, api.LogFields{"username": username})
			redirectAccessDenied(w, r)
			return
		}
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken(jwt.SingleSignOnAudience)
	if err != nil {
		service.Log.Warn(api.JWTError, err, api.LogFields{"account": account})
		redirectAccessDenied(w, r)
		return
	}

	service.Log.Info(api.SamlValid, api.LogFields{"account": account})
	url := fmt.Sprintf("%s?token=%s", redirectTo, signedToken)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

func redirectAccessDenied(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf("%s?error=access_denied", redirectTo)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// Example configuration:
//  - PublicCertPath:              "../default.crt",
//  - PrivateKeyPath:              "../default.key",
//  - IDPSSOURL:                   "http://idp/saml2",
//  - IDPSSODescriptorURL:         "http://idp/issuer",
//  - IDPPublicCertPath:           "idpcert.crt",
//  - SPSignRequest:               "true",
//  - AssertionConsumerServiceURL: "http://localhost:8000/saml_consume",
func configureSAML(env *api.Settings) saml.ServiceProviderSettings {
	sp := saml.ServiceProviderSettings{
		PublicCertPath:              env.String("SAML_PUBLIC_CERT"),
		PrivateKeyPath:              env.String("SAML_PRIVATE_CERT"),
		IDPSSOURL:                   env.String("SAML_IDP_SSO_URL"),
		IDPSSODescriptorURL:         env.String("SAML_IDP_SSO_DESC_URL"),
		IDPPublicCertPath:           env.String("SAML_IDP_PUBLIC_CERT"),
		SPSignRequest:               env.True("SAML_SIGN_REQUEST"),
		AssertionConsumerServiceURL: env.String("SAML_CONSUMER_SERVICE_URL"),
	}

	if sp.AssertionConsumerServiceURL == "" {
		sp.AssertionConsumerServiceURL = env.String("API_BASE_URL") + "/auth/saml/callback"
	}

	sp.Init()
	return sp
}

// Create a SAML 2.0 authentication request based on the service provider settings.
// If configured to sign the request then the Base64 XML will be signed.
func createAuthenticationRequest(settings saml.ServiceProviderSettings) (*saml.AuthnRequest, string, error) {
	var encodedXml string
	var err error

	request := settings.GetAuthnRequest()
	if settings.SPSignRequest {
		encodedXml, err = request.EncodedSignedString(settings.PrivateKeyPath)
	} else {
		encodedXml, err = request.EncodedString()
	}
	return request, encodedXml, err
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
