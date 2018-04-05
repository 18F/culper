package http

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mfa"
	"github.com/gorilla/mux"
)

type MFAGenerateHandler struct {
	Env      *api.Settings
	Log      *api.LogService
	Token    *api.TokenService
	Database *api.DatabaseService
}

// TwofactorHandler is the initial entry and subscription for two-factor
// authentication.
func (handler MFAGenerateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.IsTrue(api.DISABLE_2FA) {
		handler.Log.Warn(api.MFAAttemptDenied, api.LogFields{})
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	_, err = handler.TokenService.CheckToken(r, account.ValidJwtToken)
	if err != nil {
		handler.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	png := ""
	if !account.TokenUsed {
		handler.Log.Info(api.GenerateQRCode, api.LogFields{})
		png, err = mfa.Generate(account.Username, account.Token)
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
}

// TwofactorVerifyHandler verifies a token provided by the end user.
func (handler MFAVerifyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.True(api.DISABLED_2FA) {
		log.Warn(api.MFAAttemptDenied, api.LogFields{})
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	_, err = handler.Token.CheckToken(r, account.ValidJwtToken, jwt.BasicAuthAudience)
	if err != nil {
		log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var body struct {
		Token string
	}
	DecodeJSON(r.Body, &body)

	ok, err := mfa.Authenticate(body.Token, account.Token)
	if err != nil {
		log.WarnError(api.MFAError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !ok {
		log.Warn(api.MFAInvalid, api.LogFields{})
		http.Error(w, "Failed two-factor authentication", http.StatusUnauthorized)
		return
	}

	account.TokenUsed = true
	if err := account.Save(); err != nil {
		log.WarnError(api.AccountUpdateError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	signedToken, _, err := account.NewJwtToken(jwt.TwoFactorAudience)
	if err != nil {
		log.WarnError(api.JWTError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	log.Info(api.MFAValid, api.LogFields{"account": account.ID})
	fmt.Fprintf(w, signedToken)
}

type MFAResetHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// TwofactorResetHandler allows for multiple factor authentication to be reset.
// NOTE: This should not be enabled on production environments.
func (handler MFAResetHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	if handler.Env.True(api.DISABLED_2FA) {
		log.Warn(api.MFAAttemptDenied)
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	if !handler.Env.True(api.ALLOW_2FA_RESET) {
		log.Warn(api.MFAResetAttempt)
		http.Error(w, "Reset two-factor authentication not allowed on this server", http.StatusUnauthorized)
		return
	}

	// Retrieve the current account information
	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	jwtToken, err := handler.Token.CheckToken(r, account.ValidJwtToken)
	if err != nil {
		log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Make sure the account does not have a token assigned
	log.Info(api.ResetMFA, api.LogFields{})
	account.Token = ""
	account.TokenUsed = false
	if err := account.Save(); err != nil {
		log.WarnError(api.AccountUpdateError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, jwtToken)
}

// getAccountFromRequest extracts account information from the token returning an
// error and/or the associated account.
func getAccountFromRequest(r *http.Request, log *api.LogService) (*api.Account, error) {
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

	if err := account.Get(); err != nil {
		log.WarnError(api.NoAccount, err, api.LogFields{})
		return account, err
	}

	// Make sure the account has a token
	if account.Token == "" {
		account.Token = mfa.Secret()
		if err := account.Save(); err != nil {
			log.WarnError(api.AccountUpdateError, err, api.LogFields{})
			return account, err
		}
	}

	return account, nil
}
