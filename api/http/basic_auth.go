package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// BasicAuthHandler is the handler for basic authentication.
type BasicAuthHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
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

	// Generate jwt token
	signedToken, _, err := service.Token.NewToken(account.ID, api.BasicAuthAudience)
	if err != nil {
		service.Log.WarnError(api.JWTError, err, api.LogFields{"account": account.ID})
		RespondWithStructuredError(w, api.JWTError, http.StatusInternalServerError)
		return
	}

	// If we need to flush the storage first then do so now.
	if service.Env.True(api.FlushStorage) {
		service.Log.Info(api.PurgeAccountData, api.LogFields{"account": account.ID})
		api.PurgeAccountStorage(service.Database, account.ID)
	}

	service.Log.Info(api.BasicAuthValid, api.LogFields{"account": account.ID})
	EncodeJSON(w, signedToken)
}
