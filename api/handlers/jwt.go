package handlers

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/jwt"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
)

// JwtTokenValidatorHandler will validate a token or return an error.
func JwtTokenValidatorHandler(w http.ResponseWriter, r *http.Request) error {
	log := logmsg.NewLoggerFromRequest(r)
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience
	audiences := cf.TargetAudiences()
	_, err := jwt.CheckToken(r, account.ValidJwtToken, audiences...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		return fmt.Errorf("Invalid authorization token: %v", err)
	}

	return nil
}

// JwtTokenReferesh refreshes a given token.
func JwtTokenRefresh(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLoggerFromRequest(r)
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience
	audiences := cf.TargetAudiences()
	_, err := jwt.CheckToken(r, account.ValidJwtToken, audiences...)
	if err != nil {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	signedToken, _, err := account.NewJwtToken(jwt.CurrentAudience(r))
	if err != nil {
		log.WithError(err).Warn(logmsg.JWTError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	fmt.Fprintf(w, signedToken)
}
