package handlers

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/model/form"
	log "github.com/sirupsen/logrus"
)

// BasicAuth processes a users request to login with a Username and Password
func BasicAuth(w http.ResponseWriter, r *http.Request) {
	if !cf.BasicEnabled() {
		log.Warn(logmsg.BasicAuthAttemptDenied)
		http.Error(w, "Basic authentication is not implemented", http.StatusInternalServerError)
		return
	}

	var respBody struct {
		Username string
		Password string
	}

	if err := DecodeJSON(r.Body, &respBody); err != nil {
		log.WithError(err).Warn(logmsg.BasicAuthError)
		Error(w, r, err)
		return
	}

	if respBody.Username == "" {
		log.Warn(logmsg.BasicAuthMissingUsername)
		Error(w, r, fmt.Errorf("Username is required"))
		return
	}

	if respBody.Password == "" {
		log.Warn(logmsg.BasicAuthMissingPassword)
		Error(w, r, fmt.Errorf("Password is required"))
		return
	}

	account := &model.Account{
		Username: respBody.Username,
	}

	// Associate with a database context.
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		log.WithError(err).Warn(logmsg.AccountUpdateError)
		Error(w, r, err)
		return
	}

	// Validate the user name and password combination
	if err := account.BasicAuthentication(respBody.Password); err != nil {
		log.WithError(err).Warn(logmsg.BasicAuthInvalid)
		Error(w, r, err)
		return
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken(model.BasicAuthAudience)
	if err != nil {
		log.WithError(err).Warn(logmsg.JWTError)
		Error(w, r, err)
		return
	}

	// If we need to flush the storage first then do so now.
	if cf.FlushStorage() {
		log.Info(logmsg.PurgeAccountData)
		form.PurgeAccountStorage(context, account.ID)
	}

	EncodeJSON(w, signedToken)
}
