package http

import (
	"fmt"
	"net/http"
	"os"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/simplestore"
)

var (
	redirectTo   = os.Getenv("API_REDIRECT")
	cookieDomain = os.Getenv("COOKIE_DOMAIN")
)

// SamlRequestHandler is the handler for creating a SAML request.
type SamlRequestHandler struct {
	Env      api.Settings
	Log      api.LogService
	Database api.DatabaseService
	SAML     api.SamlService
}

// ServeHTTP is the initial entry point for authentication.
func (service SamlRequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.SamlEnabled) {
		service.Log.Warn(api.SamlNotEnabled, api.LogFields{})
		RespondWithStructuredError(w, api.SamlNotEnabled, http.StatusInternalServerError)
		return
	}

	encoded, url, err := service.SAML.CreateAuthenticationRequest()
	if err != nil {
		service.Log.WarnError(api.SamlRequestError, err, api.LogFields{})
		RespondWithStructuredError(w, api.SamlRequestError, http.StatusInternalServerError)
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

// SamlSLORequestHandler is the handler for creating a SAML Logout request
type SamlSLORequestHandler struct {
	Env      api.Settings
	Log      api.LogService
	Database api.DatabaseService
	SAML     api.SamlService
	Session  api.SessionService
}

// ServeHTTP is the initial entry point for authentication.
func (service SamlSLORequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.SamlEnabled) || !service.Env.True(api.SamlSloEnabled) {
		service.Log.Warn(api.SamlSLONotEnabled, api.LogFields{})
		http.Error(w, api.SamlSLONotEnabled, http.StatusInternalServerError)
		return
	}

	account, session := AccountAndSessionFromRequestContext(r)

	if !session.SessionIndex.Valid {
		service.Log.Warn(api.SamlSLOMissingSessionIndex, api.LogFields{})
		http.Error(w, api.SamlSLOMissingSessionIndex, http.StatusInternalServerError)
		return
	}

	sessionIndex := session.SessionIndex.String

	encoded, url, err := service.SAML.CreateSLORequest(account.Username, sessionIndex)
	if err != nil {
		service.Log.WarnError(api.SamlSLORequestGeneration, err, api.LogFields{})
		http.Error(w, api.SamlSLORequestGeneration, http.StatusInternalServerError)
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

// SamlResponseHandler is the callback handler for both login and logout SAML Responses.
type SamlResponseHandler struct {
	Env      api.Settings
	Log      api.LogService
	Database api.DatabaseService
	SAML     api.SamlService
	Session  api.SessionService
}

// ServeHTTP is the callback handler for both login and logout SAML Responses.
func (service SamlResponseHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.SamlEnabled) {
		service.Log.Warn(api.SamlNotImplemented, api.LogFields{})
		RespondWithStructuredError(w, api.SamlNotImplemented, http.StatusInternalServerError)
		return
	}

	encoded := r.FormValue("SAMLResponse")
	if encoded == "" {
		service.Log.Warn(api.SamlFormError, api.LogFields{})
		redirectAccessDenied(w, r)
		return
	}

	responseType, err := service.SAML.ResponseType(encoded)
	if err != nil {
		service.Log.WarnError(api.SamlParseError, err, api.LogFields{})
		redirectAccessDenied(w, r)
		return
	}

	switch responseType {
	case api.AuthnSAMLResponseType:
		service.serveAuthnResponse(encoded, w, r)
		return
	case api.LogoutSAMLResponseType:
		service.serveLogoutResponse(encoded, w, r)
		return
	default:
		service.Log.Fatal("SAML.ResponseType returned an unknown response type. This is programmer error due to the lack of go enums", api.LogFields{"unknownResponseType": responseType})
		http.Error(w, "Server Error", http.StatusInternalServerError)
	}
}

func (service SamlResponseHandler) serveAuthnResponse(encodedResponse string, w http.ResponseWriter, r *http.Request) {
	username, sessionIndex, err := service.SAML.ValidateAuthenticationResponse(encodedResponse)
	if err != nil {
		redirectAccessDenied(w, r)
		return
	}

	// Associate with a database context.
	account := &api.Account{
		Username: username,
	}
	if _, err := account.Get(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{"username": username})

		redirectAccessDenied(w, r)
	}

	sessionKey, authErr := service.Session.UserDidAuthenticate(account.ID, simplestore.NonNullString(sessionIndex))
	if authErr != nil {
		service.Log.WarnError("bad session get", authErr, api.LogFields{"account": account.ID})
		RespondWithStructuredError(w, "bad session get", http.StatusInternalServerError)
		return
	}

	AddSessionKeyToResponse(w, sessionKey)

	http.Redirect(w, r, redirectTo, http.StatusFound)
}

func (service SamlResponseHandler) serveLogoutResponse(encodedResponse string, w http.ResponseWriter, r *http.Request) {
	redirectLogout(w, r)
}

func redirectAccessDenied(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf("%s?error=access_denied", redirectTo)
	http.Redirect(w, r, url, http.StatusFound)
}

func redirectLogout(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, redirectTo, http.StatusFound)
}
