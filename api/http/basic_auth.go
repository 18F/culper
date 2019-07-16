package http

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// BasicAuthHandler is the handler for basic authentication.
type BasicAuthHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	Store    api.StorageService
	Session  api.SessionService
}

// ServeHTTP processes a users request to login with a Username and Password
func (service BasicAuthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.BasicEnabled) {
		service.Log.Warn(api.BasicAuthNotImplemented, api.LogFields{})
		RespondWithStructuredError(w, api.BasicAuthNotImplemented, http.StatusInternalServerError)
		return
	}

	var respBody struct {
		Username string
		Password string
	}

	if err := DecodeJSON(r.Body, &respBody); err != nil {
		service.Log.WarnError(api.BasicAuthError, err, api.LogFields{})
		RespondWithStructuredError(w, api.BasicAuthError, http.StatusInternalServerError)
		return
	}

	if respBody.Username == "" {
		service.Log.Warn(api.BasicAuthMissingUsername, api.LogFields{})
		RespondWithStructuredError(w, api.BasicAuthMissingUsername, http.StatusBadRequest)
		return
	}

	if respBody.Password == "" {
		service.Log.Warn(api.BasicAuthMissingPassword, api.LogFields{})
		RespondWithStructuredError(w, api.BasicAuthMissingPassword, http.StatusBadRequest)
		return
	}

	fmt.Println("AUTHS", respBody.Username, respBody.Password)

	account := &api.Account{
		Username: respBody.Username,
	}

	// Associate with a database context.
	if _, err := account.Get(service.Database, 0); err != nil {
		service.Log.WarnError(api.AccountUpdateError, err, api.LogFields{"username": account.Username})
		RespondWithStructuredError(w, api.AccountUpdateError, http.StatusInternalServerError)
		return
	}

	// Validate the user name and password combination
	if err := account.BasicAuthentication(service.Database, respBody.Password); err != nil {
		service.Log.WarnError(api.BasicAuthInvalid, err, api.LogFields{"account": account.ID})
		RespondWithStructuredError(w, api.BasicAuthInvalid, http.StatusUnauthorized)
		return
	}

	sessionKey, authErr := service.Session.UserDidAuthenticate(account.ID)
	if authErr != nil {
		service.Log.WarnError("bad session get", authErr, api.LogFields{"account": account.ID})
		RespondWithStructuredError(w, "bad session get", http.StatusInternalServerError)
		return
	}

	AddSessionKeyToResponse(w, sessionKey)

	// If we need to flush the storage first then do so now.
	if service.Env.True(api.FlushStorage) {
		service.Log.Info(api.PurgeAccountData, api.LogFields{"account": account.ID})
		delErr := service.Store.DeleteApplication(account.ID)
		if delErr != nil {
			service.Log.Warn("Unable to purge the application data on login", api.LogFields{"account": account.ID})
		}
	}

	service.Log.Info(api.BasicAuthValid, api.LogFields{"account": account.ID})
}
