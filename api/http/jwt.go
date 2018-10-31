package http

import (
	"context"
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
			RespondWithStructuredError(w, api.InvalidJWT, http.StatusUnauthorized)
			return
		}
		service.Log.AddField("account", id)
		newContext := SetAccountIDInRequestContext(r, id)

		next.ServeHTTP(w, r.WithContext(newContext))
	})
}

type authContextKey string

const accountIDKey authContextKey = "ACCOUNT_ID"

// SetAccountIDInRequestContext modifies the request's Context() to add the Account
func SetAccountIDInRequestContext(r *http.Request, accountID int) context.Context {
	return context.WithValue(r.Context(), accountIDKey, accountID)
}

// AccountIDFromRequestContext gets the reference to the Account stored in the request.Context()
func AccountIDFromRequestContext(r *http.Request) int {
	// This will panic if it is not set or if it's not an int. That will always be a programmer
	// error so I think that it's worth the tradeoff for the simpler method signature.
	accountID := r.Context().Value(accountIDKey).(int)
	return accountID
}
