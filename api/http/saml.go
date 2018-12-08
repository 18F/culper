package http

import (
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api"
)

var (
	redirectTo   = os.Getenv("API_REDIRECT")
	cookieDomain = os.Getenv("COOKIE_DOMAIN")
)

// SamlRequestHandler is the handler for creating a SAML request.
type SamlRequestHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	SAML     api.SamlService
}

// ServeHTTP is the initial entry point for authentication.
func (service SamlRequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.SamlEnabled) {
		service.Log.Warn(api.SamlAttemptDenied, api.LogFields{})
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	encoded, url, err := service.SAML.CreateAuthenticationRequest()
	if err != nil {
		service.Log.WarnError(api.SamlRequestError, err, api.LogFields{})
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

// SamlSLORequestHandler is the handler for creating a SAML request.
type SamlSLORequestHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	SAML     api.SamlService
}

// ServeHTTP is the initial entry point for authentication.
func (service SamlSLORequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.SamlEnabled) {
		service.Log.Warn(api.SamlAttemptDenied, api.LogFields{})
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
		return
	}

	// Valid token and audience while populating the audience ID
	_, id, err := service.Token.CheckToken(r)
	if err != nil {
		service.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the SessionIndex from the token
	sessionIndex := service.Token.SessionIndex(r)
	if sessionIndex == "" {
		service.Log.Error("This user session was started with an instance of WSO2 not configured for SLO.", api.LogFields{})
		http.Error(w, "This user session was started with an instance of WSO2 not configured for SLO.", http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	account := &api.Account{}
	account.ID = id
	if _, err := account.Get(service.Database, id); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		RespondWithStructuredError(w, api.NoAccount, http.StatusUnauthorized)
		return
	}

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
	Token    api.TokenService
	Database api.DatabaseService
	SAML     api.SamlService
}

// ServeHTTP is the callback handler for both login and logout SAML Responses.
func (service SamlResponseHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.SamlEnabled) {
		service.Log.Warn(api.SamlAttemptDenied, api.LogFields{})
		http.Error(w, "SAML is not implemented", http.StatusInternalServerError)
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

		// Attempt to create a new account if one is not
		// found in the system but is verified to have
		// access.
		//
		// NOTE: This may only be a pilot circumstance. If so
		// make sure the final release does not allow the creation
		// of a new account and returns an error in its place.
		if _, err := account.Save(service.Database, account.ID); err != nil {
			service.Log.WarnError(api.AccountUpdateError, err, api.LogFields{"username": username})
			redirectAccessDenied(w, r)
			return
		}
	}

	// Generate jwt token
	signedToken, _, err := service.Token.NewToken(account.ID, sessionIndex, api.SingleSignOnAudience)
	if err != nil {
		service.Log.WarnError(api.JWTError, err, api.LogFields{"account": account})
		redirectAccessDenied(w, r)
		return
	}

	service.Log.Info(api.SamlValid, api.LogFields{"account": account})
	if cookieDomain == "" {
		service.Log.Warn(api.CookieDomainNotSet, api.LogFields{})
		// Default to frontend host
		uri, _ := url.Parse(redirectTo)
		cookieDomain = strings.Split(uri.Host, ":")[0]
	}
	expiration := time.Now().Add(time.Duration(1) * time.Minute)
	cookie := &http.Cookie{
		Domain:   cookieDomain,
		Name:     "token",
		Value:    signedToken,
		HttpOnly: false,
		Path:     "/",
		MaxAge:   60,
		Expires:  expiration,
	}
	http.SetCookie(w, cookie)
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
