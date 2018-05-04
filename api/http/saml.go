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
	redirectTo = os.Getenv("API_REDIRECT")
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

// SamlResponseHandler is the handler for handling a SAML response.
type SamlResponseHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	SAML     api.SamlService
}

// ServeHTTP is the returning entry point for authentication.
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

	username, err := service.SAML.ValidateAuthenticationResponse(encoded)
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
	signedToken, _, err := service.Token.NewToken(account.ID, api.SingleSignOnAudience)
	if err != nil {
		service.Log.WarnError(api.JWTError, err, api.LogFields{"account": account})
		redirectAccessDenied(w, r)
		return
	}

	service.Log.Info(api.SamlValid, api.LogFields{"account": account})
	uri, _ := url.Parse(redirectTo)
	domain := strings.Split(uri.Host, ":")[0]
	expiration := time.Now().Add(time.Duration(1) * time.Minute)
	cookie := &http.Cookie{
		Domain:   domain,
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

func redirectAccessDenied(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf("%s?error=access_denied", redirectTo)
	http.Redirect(w, r, url, http.StatusFound)
}
