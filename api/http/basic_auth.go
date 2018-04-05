package http

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

type BasicAuthHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// BasicAuth processes a users request to login with a Username and Password
func (service BasicAuthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if !service.Env.True(api.BASIC_ENABLED) {
		service.Log.Warn(api.BasicAuthAttemptDenied, api.LogFields{})
		http.Error(w, "Basic authentication is not implemented", http.StatusInternalServerError)
		return
	}

	var respBody struct {
		Username string
		Password string
	}

	if err := DecodeJSON(r.Body, &respBody); err != nil {
		service.Log.WarnError(api.BasicAuthError, err, api.LogFields{})
		Error(w, r, err)
		return
	}

	if respBody.Username == "" {
		service.Log.Warn(api.BasicAuthMissingUsername, api.LogFields{})
		Error(w, r, fmt.Errorf("Username is required"))
		return
	}

	if respBody.Password == "" {
		service.Log.Warn(api.BasicAuthMissingPassword, api.LogFields{})
		Error(w, r, fmt.Errorf("Password is required"))
		return
	}

	account := &api.Account{
		Username: respBody.Username,
	}

	// Associate with a database context.
	if err := account.Get(); err != nil {
		service.Log.Username.WarnError(api.AccountUpdateError, err, api.LogFields{"username", username})
		Error(w, r, err)
		return
	}

	// Validate the user name and password combination
	if err := account.BasicAuthentication(respBody.Password); err != nil {
		service.Log.ID.WarnError(api.BasicAuthInvalid, err, api.LogFields{"account", account.ID})
		Error(w, r, err)
		return
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken(api.BasicAuthAudience)
	if err != nil {
		service.Log.ID.WarnError(api.JWTError, err, api.LogFields{"account", account.ID})
		Error(w, r, err)
		return
	}

	// If we need to flush the storage first then do so now.
	if service.Env.True(FLUSH_STORAGE) {
		service.Log.ID.Info(api.PurgeAccountData, api.LogFields{"account", account.ID})
		postgresql.PurgeAccountStorage(context, account.ID)
	}

	service.Log.ID.Info(api.BasicAuthValid, api.LogFields{"account", account.ID})
	EncodeJSON(w, signedToken)
}
