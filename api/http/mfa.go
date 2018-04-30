package http

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// MFAGenerateHandler is the handler for multiple factor authentication.
type MFAGenerateHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	MFA      api.MFAService
}

// ServeHTTP is the initial entry and subscription for two-factor
// authentication.
func (handler MFAGenerateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.True(api.DISABLE_2FA) {
		handler.Log.Warn(api.MFAAttemptDenied, api.LogFields{})
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account := &api.Account{}

	// Valid token and audience
	_, id, err := handler.Token.CheckToken(r)
	if err != nil {
		handler.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	account.ID = id
	if _, err := account.Get(handler.Database, id); err != nil {
		handler.Log.WarnError(api.NoAccount, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		handler.Log.Warn(api.AccountLocked, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	png := ""
	if !account.TokenUsed {
		handler.Log.Info(api.GenerateQRCode, api.LogFields{})
		png, err = handler.MFA.Generate(account.Username, account.Token)
		if err != nil {
			handler.Log.WarnError(api.QRCodeError, err, api.LogFields{})
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	fmt.Fprintf(w, png)
}

// MFAVerifyHandler is the handler for verifying multiple factor authentication.
type MFAVerifyHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	MFA      api.MFAService
}

// ServeHTTP verifies a token provided by the end user.
func (handler MFAVerifyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.True(api.DISABLE_2FA) {
		handler.Log.Warn(api.MFAAttemptDenied, api.LogFields{})
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account := &api.Account{}

	// Valid token and audience
	_, id, err := handler.Token.CheckToken(r)
	if err != nil {
		handler.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	account.ID = id
	if _, err := account.Get(handler.Database, id); err != nil {
		handler.Log.WarnError(api.NoAccount, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		handler.Log.Warn(api.AccountLocked, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var body struct {
		Token string
	}
	DecodeJSON(r.Body, &body)

	ok, err := handler.MFA.Authenticate(body.Token, account.Token)
	if err != nil {
		handler.Log.WarnError(api.MFAError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !ok {
		handler.Log.Warn(api.MFAInvalid, api.LogFields{})
		http.Error(w, "Failed two-factor authentication", http.StatusUnauthorized)
		return
	}

	account.TokenUsed = true
	if _, err := account.Save(handler.Database, account.ID); err != nil {
		handler.Log.WarnError(api.AccountUpdateError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	signedToken, _, err := handler.Token.NewToken(account.ID, api.TwoFactorAudience)
	if err != nil {
		handler.Log.WarnError(api.JWTError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	handler.Log.Info(api.MFAValid, api.LogFields{"account": account.ID})
	fmt.Fprintf(w, signedToken)
}

// MFAResetHandler is the handler for resetting multiplet factor authentication.
type MFAResetHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	MFA      api.MFAService
}

// ServeHTTP allows for multiple factor authentication to be reset.
// NOTE: This should not be enabled on production environments.
func (handler MFAResetHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.True(api.DISABLE_2FA) {
		handler.Log.Warn(api.MFAAttemptDenied, api.LogFields{})
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	if !handler.Env.True(api.ALLOW_2FA_RESET) {
		handler.Log.Warn(api.MFAResetAttempt, api.LogFields{})
		http.Error(w, "Reset two-factor authentication not allowed on this server", http.StatusUnauthorized)
		return
	}

	// Valid token and audience
	account := &api.Account{}
	jwtToken, id, err := handler.Token.CheckToken(r)
	if err != nil {
		handler.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	account.ID = id
	if _, err := account.Get(handler.Database, id); err != nil {
		handler.Log.WarnError(api.NoAccount, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		handler.Log.Warn(api.AccountLocked, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Make sure the account does not have a token assigned
	handler.Log.Info(api.ResetMFA, api.LogFields{})
	account.Token = ""
	account.TokenUsed = false
	if _, err := account.Save(handler.Database, account.ID); err != nil {
		handler.Log.WarnError(api.AccountUpdateError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, jwtToken)
}
