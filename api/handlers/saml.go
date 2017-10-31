package handlers

import (
	"fmt"
	"net/http"
	"os"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
	saml "github.com/RobotsAndPencils/go-saml"
)

// SamlServiceHandler is the initial entry point for authentication.
func SamlServiceHandler(w http.ResponseWriter, r *http.Request) {
	if !cf.SamlEnabled() {
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	sp := configureSAML()

	// Generate the AuthnRequest and then get a base64 encoded string of the XML
	authnRequest := sp.GetAuthnRequest()
	b64XML, err := authnRequest.EncodedSignedString(sp.PrivateKeyPath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get a URL formed with the SAMLRequest parameter
	url, err := saml.GetAuthnRequestURL(sp.IDPSSOURL, b64XML, "state")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// SamlCallbackHandler is the returning entry point for authentication.
func SamlCallbackHandler(w http.ResponseWriter, r *http.Request) {
	if !cf.SamlEnabled() {
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	encodedXML := r.FormValue("SAMLResponse")

	if encodedXML == "" {
		http.Error(w, "SAML response form value missing", http.StatusBadRequest)
		return
	}

	response, err := saml.ParseEncodedResponse(encodedXML)
	if err != nil {
		http.Error(w, "SAML response parse: "+err.Error(), http.StatusBadRequest)
		return
	}

	sp := configureSAML()
	err = response.Validate(&sp)
	if err != nil {
		http.Error(w, "SAML response validation: "+err.Error(), http.StatusBadRequest)
		return
	}

	samlID := response.GetAttribute("uid")
	if samlID == "" {
		http.Error(w, "SAML attribute identifier uid missing", http.StatusBadRequest)
		return
	}

	username := response.GetAttribute("username")
	if samlID == "" {
		http.Error(w, "SAML attribute identifier username missing", http.StatusBadRequest)
		return
	}

	// Associate with a database context.
	account := &model.Account{
		Username: username,
	}
	account.WithContext(db.NewDB())
	if err := account.Get(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken(model.SingleSignOnAudience)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	url := fmt.Sprintf("%s?token=%s", redirectTo, signedToken)
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
		PrivateKeyPath:              os.Getenv("SAML_PRIVATE"),
		IDPSSOURL:                   os.Getenv("SAML_IDP_SSO_URL"),
		IDPSSODescriptorURL:         os.Getenv("SAML_IDP_SSO_DESC_URL"),
		IDPPublicCertPath:           os.Getenv("SAML_IDP_PUBLIC_CERT"),
		SPSignRequest:               os.Getenv("SAML_SIGN_REQUEST") != "",
		AssertionConsumerServiceURL: os.Getenv("SAML_CONSUMER_SERVICE_URL"),
	}
	sp.Init()
	return sp
}
