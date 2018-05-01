package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// JWTHandler is the handler for JWT.
type JWTHandler struct {
	Log   api.LogService
	Token api.TokenService
}

// Middleware for verifying Javascript Web Tokens.
func (service JWTHandler) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, id, err := service.Token.CheckToken(r)
		if err != nil {
			service.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}
		service.Log.AddField("account", id)
		next.ServeHTTP(w, r)
	})
}
