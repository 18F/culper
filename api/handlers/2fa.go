package handlers

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/twofactor"
	"github.com/gorilla/mux"
)

// TwofactorHandler is the initial entry and subscription for two-factor
// authentication.
func TwofactorHandler(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	if cf.TwofactorDisabled() {
		log.Warn(logmsg.MFAAttemptDenied)
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	_, err = jwt.CheckToken(r, account.ValidJwtToken, jwt.BasicAuthAudience)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	png := ""
	if !account.TokenUsed {
		log.Info(logmsg.GenerateQRCode)
		png, err = twofactor.Generate(account.Username, account.Token)
		if err != nil {
			log.WithError(err).Warn(logmsg.QRCodeError)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	fmt.Fprintf(w, png)
}

// TwofactorVerifyHandler verifies a token provided by the end user.
func TwofactorVerifyHandler(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	if cf.TwofactorDisabled() {
		log.Warn(logmsg.MFAAttemptDenied)
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	account, err := getAccountFromRequest(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Valid token and audience
	_, err = jwt.CheckToken(r, account.ValidJwtToken, jwt.BasicAuthAudience)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var body struct {
		Token string
	}
	DecodeJSON(r.Body, &body)

	ok, err := twofactor.Authenticate(body.Token, account.Token)
	if err != nil {
		log.WithError(err).Warn(logmsg.MFAError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !ok {
		log.Warn(logmsg.MFAInvalid)
		http.Error(w, "Failed two-factor authentication", http.StatusUnauthorized)
		return
	}

	account.TokenUsed = true
	if err := account.Save(); err != nil {
		log.WithError(err).Warn(logmsg.AccountUpdateError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	signedToken, _, err := account.NewJwtToken(jwt.TwoFactorAudience)
	if err != nil {
		log.WithError(err).Warn(logmsg.JWTError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	log.WithField("account", account.ID).Info(logmsg.MFAValid)
	fmt.Fprintf(w, signedToken)
}

// TwofactorResetHandler allows for multiple factor authentication to be reset.
// NOTE: This should not be enabled on production environments.
func TwofactorResetHandler(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	if cf.TwofactorDisabled() {
		log.Warn(logmsg.MFAAttemptDenied)
		http.Error(w, "Multiple factor authentication is disabled", http.StatusInternalServerError)
		return
	}

	if !cf.TwofactorResettable() {
		log.Warn(logmsg.MFAResetAttempt)
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
	jwtToken, err := jwt.CheckToken(r, account.ValidJwtToken, jwt.BasicAuthAudience)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Make sure the account does not have a token assigned
	log.Info(logmsg.ResetMFA)
	account.Token = ""
	account.TokenUsed = false
	if err := account.Save(); err != nil {
		log.WithError(err).Warn(logmsg.AccountUpdateError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, jwtToken)
}

// getAccountFromRequest extracts account information from the token returning an
// error and/or the associated account.
func getAccountFromRequest(r *http.Request) (*model.Account, error) {
	log := logmsg.NewLoggerFromRequest(r)
	log.Info(logmsg.RetrievingAccount)

	// Sanity check for username
	vars := mux.Vars(r)
	username := vars["account"]
	if username == "" {
		log.Warn(logmsg.NoUsername)
		return &model.Account{}, errors.New("No username provided")
	}

	// Retrieve the current account information
	account := &model.Account{
		Username: username,
	}

	dbContext := db.NewDB()
	account.WithContext(dbContext)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.NoAccount)
		return account, err
	}

	// Make sure the account has a token
	if account.Token == "" {
		account.Token = twofactor.Secret()
		if err := account.Save(); err != nil {
			log.WithError(err).Warn(logmsg.AccountUpdateError)
			return account, err
		}
	}

	return account, nil
}
