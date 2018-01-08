package handlers

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/linkedin"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

var (
	oauthStateString = "random"
	redirectTo       = os.Getenv("API_REDIRECT")
)

// AuthServiceHandler is the initial entry point for authentication.
func AuthServiceHandler(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)

	if !cf.OAuthEnabled() {
		log.Warn(logmsg.OAuthAttemptDenied)
		http.Error(w, "OAuth is not implemented", http.StatusInternalServerError)
		return
	}

	vars := mux.Vars(r)
	service := vars["service"]

	config, ok := configureAuthentication(r, service)
	if !ok {
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
	}

	http.Redirect(w, r, config.AuthCodeURL(oauthStateString), http.StatusTemporaryRedirect)
}

// AuthCallbackHandler handles responses from the authentication provider.
func AuthCallbackHandler(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)

	if !cf.OAuthEnabled() {
		log.Warn(logmsg.OAuthAttemptDenied)
		http.Error(w, "OAuth is not implemented", http.StatusInternalServerError)
		return
	}

	vars := mux.Vars(r)
	service := vars["service"]

	config, ok := configureAuthentication(r, service)
	if !ok {
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
	}

	state := r.FormValue("state")
	if state != oauthStateString {
		log.WithFields(logrus.Fields{
			"expected": oauthStateString,
			"actual":   state,
		}).Warn(logmsg.OAuthStateError)
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
		return
	}

	code := r.FormValue("code")
	token, err := config.Exchange(oauth2.NoContext, code)
	if err != nil {
		log.WithError(err).Warn(logmsg.OAuthCodeExchangeError)
		http.Redirect(w, r, redirectTo, http.StatusTemporaryRedirect)
		return
	}

	redirectToWithToken := fmt.Sprintf("%s?token=%s&refresh=%s&expiration=%s", redirectTo, token.AccessToken, token.RefreshToken, token.Expiry)
	http.Redirect(w, r, redirectToWithToken, http.StatusTemporaryRedirect)
}

// ConfigureAuthentication takes a service name and configures the OAuth 2.0 with
// appropriate endpoints and scopes.
func configureAuthentication(r *http.Request, service string) (*oauth2.Config, bool) {
	log := logmsg.NewLoggerFromRequest(r)
	ok := true
	config := &oauth2.Config{
		RedirectURL:  fmt.Sprintf("%s/auth/%s/callback", cf.PublicURI(), strings.ToLower(service)),
		ClientID:     cf.UserService("github-client", "id"),
		ClientSecret: cf.UserService("github-client", "secret"),
	}

	switch service {
	case "facebook":
		log.WithField("service", service).Info(logmsg.OAuthConfiguration)
		config.Endpoint = facebook.Endpoint
		config.Scopes = []string{
			"public_profile",
			"email",
			"user_birthday",
			"user_work_history",
		}
	case "github":
		log.WithField("service", service).Info(logmsg.OAuthConfiguration)
		config.Endpoint = github.Endpoint
		config.Scopes = []string{
			"user",
		}
	case "google":
		log.WithField("service", service).Info(logmsg.OAuthConfiguration)
		config.Endpoint = google.Endpoint
		config.Scopes = []string{
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
		}
	case "linkedin":
		log.WithField("service", service).Info(logmsg.OAuthConfiguration)
		config.Endpoint = linkedin.Endpoint
		config.Scopes = []string{
			"r_basicprofile",
			"r_contactinfo",
			"r_emailaddress",
		}
	// case "microsoft":
	// 	config.Endpoint = microsoft.Endpoint
	// 	config.Scopes = []string{
	// 		"wl.basic",
	// 		"wl.birthday",
	// 		"wl.emails",
	// 	}
	default:
		log.WithField("service", service).Info(logmsg.OAuthConfigurationError)
		ok = false
	}

	return config, ok
}
