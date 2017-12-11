package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"regexp"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
)

var (
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
)

func JwtTokenValidatorHandler(w http.ResponseWriter, r *http.Request) error {
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience
	audience := targetAudience()
	_, err := checkToken(r, account, audience)
	if err != nil {
		return fmt.Errorf("Invalid authorization token: %v", err)
	}

	return nil
}

func JwtTokenRefresh(w http.ResponseWriter, r *http.Request) {
	log := logmsg.NewLogger()
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience
	audience := targetAudience()
	_, err := checkToken(r, account, audience)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	signedToken, _, err := account.NewJwtToken(audience)
	if err != nil {
		log.WithError(err).Warn(logmsg.JWTError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	fmt.Fprintf(w, signedToken)
}

func checkToken(r *http.Request, account *model.Account, audience string) (string, error) {
	log := logmsg.NewLogger()
	log.Info(logmsg.ValidatingJWT)

	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		log.Warn(logmsg.NoAuthorizationToken)
		return "", errors.New("No authorization token header found")
	}

	jwtToken := matches[1]
	if valid, err := account.ValidJwtToken(jwtToken, audience); !valid {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		return jwtToken, err
	}

	return jwtToken, nil
}

func targetAudience() string {
	if cf.TwofactorDisabled() {
		return model.BasicAuthAudience
	}
	return model.TwoFactorAudience
}
