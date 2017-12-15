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
	jwt "github.com/dgrijalva/jwt-go"
)

var (
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
)

func JwtTokenValidatorHandler(w http.ResponseWriter, r *http.Request) error {
	account := &model.Account{}
	account.WithContext(db.NewDB())

	// Valid token and audience
	audiences := targetAudiences()
	_, err := checkToken(r, account, audiences...)
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
	audiences := targetAudiences()
	_, err := checkToken(r, account, audiences...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	signedToken, _, err := account.NewJwtToken(currentAudience(r))
	if err != nil {
		log.WithError(err).Warn(logmsg.JWTError)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	fmt.Fprintf(w, signedToken)
}

func checkToken(r *http.Request, account *model.Account, audiences ...string) (string, error) {
	log := logmsg.NewLogger()
	log.Info(logmsg.ValidatingJWT)

	jwtToken := extractToken(r)
	if jwtToken == "" {
		return "", errors.New("No authorization token header found")
	}

	valid := false
	var err error
	for _, audience := range audiences {
		if valid, err = account.ValidJwtToken(jwtToken, audience); valid {
			break
		}
	}

	if !valid {
		log.WithError(err).Warn(logmsg.InvalidJWT)
		return jwtToken, err
	}

	return jwtToken, nil
}

func extractToken(r *http.Request) string {
	log := logmsg.NewLogger()
	log.Info(logmsg.ValidatingJWT)

	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		log.Warn(logmsg.NoAuthorizationToken)
		return ""
	}

	return matches[1]
}

func currentAudience(r *http.Request) string {
	log := logmsg.NewLogger()
	rawToken := extractToken(r)
	token, err := jwt.ParseWithClaims(rawToken, &jwt.StandardClaims{}, keyFunc)
	if err != nil {
		log.WithError(err).Debug("Failed to parse JWT with standard claims")
		return ""
	}

	if token.Valid {
		claims := token.Claims.(*jwt.StandardClaims)
		log.WithField("audience", claims.Audience).Debug("Current audience found")
		return claims.Audience
	}

	log.WithError(err).Debug("JWT is invalid")
	return ""
}

func keyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return model.JwtSecret, nil
}

func targetAudiences() []string {
	audiences := []string{}

	if cf.BasicEnabled() {
		audiences = append(audiences, model.BasicAuthAudience)
	}

	if !cf.TwofactorDisabled() {
		audiences = append(audiences, model.TwoFactorAudience)
	}

	if cf.SamlEnabled() {
		audiences = append(audiences, model.SingleSignOnAudience)
	}

	if cf.OAuthEnabled() {
		audiences = append(audiences, model.SingleSignOnAudience)
	}

	log := logmsg.NewLogger()
	log.WithField("audiences", audiences).Debug("Found audiences")

	return audiences
}
