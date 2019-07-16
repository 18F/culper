package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// SessionMiddleware is the session handler.
type SessionMiddleware struct {
	log     api.LogService
	session api.SessionService
}

func NewSessionMiddleware(log api.LogService, session api.SessionService) *SessionMiddleware {
	return &SessionMiddleware{
		log,
		session,
	}
}

// Middleware for verifying session
func (service SessionMiddleware) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// TODO: use a better name for session key cookie piece
		_, cookieErr := r.Cookie("session-key")
		if cookieErr != nil {
			service.log.WarnError("Error retrieving session key from Cookie", cookieErr, api.LogFields{})
			RespondWithStructuredError(w, api.InvalidJWT, http.StatusUnauthorized) // TODO: fix returned error
			return
		}

		// account, err := service.session.GetAccountIfSessionIsValid(r)
		// if err != nil {
		// 	service.log.WarnError(api.InvalidJWT, err, api.LogFields{})
		// 	RespondWithStructuredError(w, api.InvalidJWT, http.StatusUnauthorized)
		// 	return
		// }
		// service.log.AddField("account", id)
		// newContext := SetAccountIDInRequestContext(r, id)

		// next.ServeHTTP(w, r.WithContext(newContext))
	})
}

// type authContextKey string

// const accountIDKey authContextKey = "ACCOUNT_ID"

// // SetAccountIDInRequestContext modifies the request's Context() to add the Account
// func SetAccountIDInRequestContext(r *http.Request, accountID int) context.Context {
// 	return context.WithValue(r.Context(), accountIDKey, accountID)
// }

// // AccountIDFromRequestContext gets the reference to the Account stored in the request.Context()
// func AccountIDFromRequestContext(r *http.Request) int {
// 	// This will panic if it is not set or if it's not an int. That will always be a programmer
// 	// error so I think that it's worth the tradeoff for the simpler method signature.
// 	accountID := r.Context().Value(accountIDKey).(int)
// 	return accountID
// }
