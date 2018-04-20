package http

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/gorilla/mux"
)

type MFAGenerateHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	MFA      api.MFAService
}

// TwofactorHandler is the initial entry and subscription for two-factor
// authentication.
func (handler MFAGenerateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.True(api.DISABLE_2FA) {
		handler.Log.Warn(api.MFAAttemptDenied, api.LogFields{})
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account, err := getAccountFromRequest(r, handler.Log, handler.MFA, handler.Database)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	_, id, err := handler.Token.CheckToken(r)
	if err != nil {
		handler.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	account.ID = id
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

type MFAVerifyHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	MFA      api.MFAService
}

// TwofactorVerifyHandler verifies a token provided by the end user.
func (handler MFAVerifyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.True(api.DISABLE_2FA) {
		handler.Log.Warn(api.MFAAttemptDenied, api.LogFields{})
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account, err := getAccountFromRequest(r, handler.Log, handler.MFA, handler.Database)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	_, id, err := handler.Token.CheckToken(r)
	if err != nil {
		handler.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	account.ID = id

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

type MFAResetHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	MFA      api.MFAService
}

// TwofactorResetHandler allows for multiple factor authentication to be reset.
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

	// Retrieve the current account information
	account, err := getAccountFromRequest(r, handler.Log, handler.MFA, handler.Database)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	jwtToken, id, err := handler.Token.CheckToken(r)
	if err != nil {
		handler.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	account.ID = id

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

// getAccountFromRequest extracts account information from the token returning an
// error and/or the associated account.
func getAccountFromRequest(r *http.Request, log api.LogService, mfasvc api.MFAService, database api.DatabaseService) (*api.Account, error) {
	log.Info(api.RetrievingAccount, api.LogFields{})

	// Sanity check for username
	vars := mux.Vars(r)
	username := vars["account"]
	if username == "" {
		log.Warn(api.NoUsername, api.LogFields{})
		return &api.Account{}, errors.New("No username provided")
	}

	// Retrieve the current account information
	account := &api.Account{
		Username: username,
	}

	if _, err := account.Get(database, 0); err != nil {
		log.WarnError(api.NoAccount, err, api.LogFields{})
		return account, err
	}

	// Make sure the account has a token
	if account.Token == "" {
		account.Token = mfasvc.Secret()
		if _, err := account.Save(database, 0); err != nil {
			log.WarnError(api.AccountUpdateError, err, api.LogFields{})
			return account, err
		}
	}

	return account, nil
}
