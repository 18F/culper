package handlers

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	saml "github.com/RobotsAndPencils/go-saml"
	"github.com/sirupsen/logrus"
)

var (
	redirectTo = os.Getenv("API_REDIRECT")
)

// SamlServiceHandler is the initial entry point for authentication.
func SamlServiceHandler(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)

	if !cf.SamlEnabled() {
		log.Warn(logmsg.SamlAttemptDenied)
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	sp := configureSAML()
	log.WithFields(logrus.Fields{
		"PublicCertPath":              sp.PublicCertPath,
		"PrivateKeyPath":              sp.PrivateKeyPath,
		"IDPSSOURL":                   sp.IDPSSOURL,
		"IDPSSODescriptorURL":         sp.IDPSSODescriptorURL,
		"IDPPublicCertPath":           sp.IDPPublicCertPath,
		"SPSignRequest":               sp.SPSignRequest,
		"AssertionConsumerServiceURL": sp.AssertionConsumerServiceURL,
	}).Debug("SAML configuration")

	// Generate the AuthnRequest and then get a base64 encoded string of the XML
	request, encoded, err := createAuthenticationRequest(sp)
	if err != nil {
		log.WithError(err).Warn(logmsg.SamlRequestError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	} else {
		requestAsXml, _ := request.String()
		log.WithField("xml", requestAsXml).Debug("SAML authentication request")
	}

	// Get a URL formed with the SAMLRequest parameter
	url, err := saml.GetAuthnRequestURL(sp.IDPSSOURL, encoded, "state")
	if err != nil {
		log.WithError(err).Warn(logmsg.SamlRequestURLError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	EncodeJSON(w, struct {
		Base64XML string
		URL       string
	}{
		encoded,
		url,
	})
}

// SamlCallbackHandler is the returning entry point for authentication.
func SamlCallbackHandler(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)

	if !cf.SamlEnabled() {
		log.Warn(logmsg.SamlAttemptDenied)
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	encodedXML := r.FormValue("SAMLResponse")
	if encodedXML == "" {
		log.Warn(logmsg.SamlFormError)
		redirectAccessDenied(w, r)
		return
	}

	response, err := saml.ParseEncodedResponse(encodedXML)
	authnResponseXML, _ := response.String()
	log.WithField("xml", authnResponseXML).Debug("SAML authentication response")
	if err != nil {
		log.WithError(err).Warn(logmsg.SamlParseError)
		redirectAccessDenied(w, r)
		return
	}

	sp := configureSAML()
	err = response.Validate(&sp)
	if err != nil {
		log.WithError(err).Warn(logmsg.SamlInvalid)
		redirectAccessDenied(w, r)
		return
	}

	username := cleanName(response.Assertion.Subject.NameID.Value)
	if username == "" {
		log.WithError(err).Warn(logmsg.SamlIdentifierMissing)
		redirectAccessDenied(w, r)
		return
	}

	// Associate with a database context.
	account := &model.Account{
		Username: username,
	}
	account.WithContext(db.NewDB())
	if err := account.Get(); err != nil {
		log.WithField("username", username).WithError(err).Warn(logmsg.NoAccount)

		// Attempt to create a new account if one is not
		// found in the system but is verified to have
		// access.
		//
		// NOTE: This may only be a pilot circumstance. If so
		// make sure the final release does not allow the creation
		// of a new account and returns an error in its place.
		if err := account.Save(); err != nil {
			log.WithField("username", username).WithError(err).Warn(logmsg.AccountUpdateError)
			redirectAccessDenied(w, r)
			return
		}
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken(jwt.SingleSignOnAudience)
	if err != nil {
		log.WithField("account", account.ID).WithError(err).Warn(logmsg.JWTError)
		redirectAccessDenied(w, r)
		return
	}

	log.WithField("account", account.ID).Info(logmsg.SamlValid)
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
func configureSAML() saml.ServiceProviderSettings {
	sp := saml.ServiceProviderSettings{
		PublicCertPath:              os.Getenv("SAML_PUBLIC_CERT"),
		PrivateKeyPath:              os.Getenv("SAML_PRIVATE_CERT"),
		IDPSSOURL:                   os.Getenv("SAML_IDP_SSO_URL"),
		IDPSSODescriptorURL:         os.Getenv("SAML_IDP_SSO_DESC_URL"),
		IDPPublicCertPath:           os.Getenv("SAML_IDP_PUBLIC_CERT"),
		SPSignRequest:               os.Getenv("SAML_SIGN_REQUEST") != "",
		AssertionConsumerServiceURL: os.Getenv("SAML_CONSUMER_SERVICE_URL"),
	}

	if sp.AssertionConsumerServiceURL == "" {
		sp.AssertionConsumerServiceURL = os.Getenv("API_BASE_URL") + "/auth/saml/callback"
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
