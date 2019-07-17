package http

import (
	"context"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/session"
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

		sessionCookie, cookieErr := r.Cookie(session.SessionCookieName)
		if cookieErr != nil {
			service.log.WarnError("Request is missing session cookie", cookieErr, api.LogFields{})
			RespondWithStructuredError(w, api.InvalidJWT, http.StatusUnauthorized) // TODO: fix returned error
			return
		}

		sessionKey := sessionCookie.Value
		account, err := service.session.GetAccountIfSessionIsValid(sessionKey)
		if err != nil {
			service.log.WarnError(api.InvalidJWT, err, api.LogFields{})
			RespondWithStructuredError(w, api.InvalidJWT, http.StatusUnauthorized)
			return
		}

		service.log.AddField("account_id", account.ID)

		newContext := SetAccountInRequestContext(r, account)
		next.ServeHTTP(w, r.WithContext(newContext))
	})
}

func AddSessionKeyToResponse(w http.ResponseWriter, sessionKey string) {

	cookie := &http.Cookie{
		// Domain:   cookieDomain,
		Name:     session.SessionCookieName,
		Value:    sessionKey,
		HttpOnly: true,
		// Path:     "/",
		// MaxAge:   60,
		// Expires:  expiration,
	}

	http.SetCookie(w, cookie)

}

type authContextKey string

const accountKey authContextKey = "ACCOUNT"

// SetAccountInRequestContext modifies the request's Context() to add the Account
func SetAccountInRequestContext(r *http.Request, account api.Account) context.Context {
	return context.WithValue(r.Context(), accountKey, account)
}

// AccountFromRequestContext gets the reference to the Account stored in the request.Context()
func AccountFromRequestContext(r *http.Request) api.Account {
	// This will panic if it is not set or if it's not an int. That will always be a programmer
	// error so I think that it's worth the tradeoff for the simpler method signature.
	account := r.Context().Value(accountKey).(api.Account)
	return account
}
