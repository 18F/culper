package handlers

import (
	"fmt"
	"net/http"
	"os"

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

	sp := configureSAML(r)

	// Generate the AuthnRequest and then get a base64 encoded string of the XML
	authnRequest := sp.GetAuthnRequest()
	var b64XML string
	var err error
	if sp.SPSignRequest {
		b64XML, err = authnRequest.EncodedSignedString(sp.PrivateKeyPath)
	} else {
		b64XML, err = authnRequest.EncodedString()
	}
	if err != nil {
		log.WithError(err).Warn(logmsg.SamlRequestError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get a URL formed with the SAMLRequest parameter
	url, err := saml.GetAuthnRequestURL(sp.IDPSSOURL, b64XML, "state")
	if err != nil {
		log.WithError(err).Warn(logmsg.SamlRequestURLError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	authnRequestXML, _ := authnRequest.String()
	log.WithField("xml", authnRequestXML).Debug("SAML authentication request")
	EncodeJSON(w, struct {
		Base64XML string
		URL       string
	}{
		b64XML,
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

	sp := configureSAML(r)
	err = response.Validate(&sp)
	if err != nil {
		log.WithError(err).Warn(logmsg.SamlInvalid)
		// TODO: Uncomment once testing is complete
		// redirectAccessDenied(w, r)
		// return
	}

	username := response.Assertion.Subject.NameID.Value
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
func configureSAML(r *http.Request) saml.ServiceProviderSettings {
	log := logmsg.NewLoggerFromRequest(r)
	log.WithFields(logrus.Fields{
		"PublicCertPath":              os.Getenv("SAML_PUBLIC_CERT"),
		"PrivateKeyPath":              os.Getenv("SAML_PRIVATE_CERT"),
		"IDPSSOURL":                   os.Getenv("SAML_IDP_SSO_URL"),
		"IDPSSODescriptorURL":         os.Getenv("SAML_IDP_SSO_DESC_URL"),
		"IDPPublicCertPath":           os.Getenv("SAML_IDP_PUBLIC_CERT"),
		"SPSignRequest":               os.Getenv("SAML_SIGN_REQUEST") != "",
		"AssertionConsumerServiceURL": os.Getenv("SAML_CONSUMER_SERVICE_URL"),
	}).Debug("SAML configuration")

	sp := saml.ServiceProviderSettings{
		PublicCertPath:              os.Getenv("SAML_PUBLIC_CERT"),
		PrivateKeyPath:              os.Getenv("SAML_PRIVATE_CERT"),
		IDPSSOURL:                   os.Getenv("SAML_IDP_SSO_URL"),
		IDPSSODescriptorURL:         os.Getenv("SAML_IDP_SSO_DESC_URL"),
		IDPPublicCertPath:           os.Getenv("SAML_IDP_PUBLIC_CERT"),
		SPSignRequest:               os.Getenv("SAML_SIGN_REQUEST") != "",
		AssertionConsumerServiceURL: os.Getenv("SAML_CONSUMER_SERVICE_URL"),
	}
	sp.Init()
	return sp
}
