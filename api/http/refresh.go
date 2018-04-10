package http

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// // JwtTokenValidatorHandler will validate a token or return an error.
// func JwtTokenValidatorHandler(w http.ResponseWriter, r *http.Request) error {
// 	log := logmsg.NewLoggerFromRequest(r)
// 	account := &model.Account{}
// 	account.WithContext(db.NewDB())

// 	// Valid token and audience
// 	audiences := cf.TargetAudiences()
// 	_, id, err := jwt.CheckToken(r)
// 	if err != nil {
// 		log.WithError(err).Warn(logmsg.InvalidJWT)
// 		return fmt.Errorf("Invalid authorization token: %v", err)
// 	}

// 	return nil
// }

type RefreshHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// JwtTokenReferesh refreshes a given token.
func (service RefreshHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	account := &api.Account{}

	// Valid token and audience
	_, id, err := service.Token.CheckToken(r)
	if err != nil {
		service.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Generate a new token
	account.ID = id
	signedToken, _, err := service.Token.NewToken(id, service.Token.CurrentAudience(r))
	if err != nil {
		service.Log.WarnError(api.JWTError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send the new token with a more recent expiration
	fmt.Fprintf(w, signedToken)
}
