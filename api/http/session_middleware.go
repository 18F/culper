package http

import (
	"context"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/session"
)

// SessionMiddleware is the session handler.
type SessionMiddleware struct {
	log     api.LogService
	session api.SessionService
}

// NewSessionMiddleware returns a configured SessionMiddleware
func NewSessionMiddleware(log api.LogService, session api.SessionService) *SessionMiddleware {
	return &SessionMiddleware{
		log,
		session,
	}
}

// Middleware for verifying session
func (service SessionMiddleware) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("CHECING FOR COOKIE", r)

		sessionCookie, cookieErr := r.Cookie(session.SessionCookieName)
		if cookieErr != nil {
			service.log.WarnError(api.RequestIsMissingSessionCookie, cookieErr, api.LogFields{})
			RespondWithStructuredError(w, api.RequestIsMissingSessionCookie, http.StatusUnauthorized)
			return
		}

		fmt.Println("GOT A DOMAIN", sessionCookie.Domain)

		sessionKey := sessionCookie.Value
		account, session, err := service.session.GetAccountIfSessionIsValid(sessionKey)
		if err != nil {
			if err == api.ErrValidSessionNotFound {
				service.log.WarnError(api.SessionDoesNotExist, err, api.LogFields{})
				RespondWithStructuredError(w, api.SessionDoesNotExist, http.StatusUnauthorized)
				return
			}
			if err == api.ErrSessionExpired {
				service.log.WarnError(api.SessionExpired, err, api.LogFields{})
				RespondWithStructuredError(w, api.SessionExpired, http.StatusUnauthorized)
				return
			}
			service.log.WarnError(api.SessionUnexpectedError, err, api.LogFields{})
			RespondWithStructuredError(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}

		service.log.AddField("account_id", account.ID)

		newContext := SetAccountAndSessionInRequestContext(r, account, session)
		next.ServeHTTP(w, r.WithContext(newContext))
	})
}

// AddSessionKeyToResponse adds the session cookie to a response given a valid sessionKey
func AddSessionKeyToResponse(w http.ResponseWriter, sessionKey string) {
	// ugh, this should be configured....TODO
	// cookieDomain = os.Getenv("COOKIE_DOMAIN")

	if cookieDomain == "" {
		// TODO LOOOOG
		// service.Log.Warn(api.CookieDomainNotSet, api.LogFields{})
		// Default to frontend host
		uri, _ := url.Parse(redirectTo)
		cookieDomain = strings.Split(uri.Host, ":")[0]
	}

	// LESSONS:
	// The domain must be "" for localhost to work
	// Safari will fuck up cookies if you have a .local hostname, chrome does fine
	// Secure must be false for http to work

	cookie := &http.Cookie{
		// Secure:   true,
		// Domain:   ".localhost",
		Name:  session.SessionCookieName,
		Value: sessionKey,
		// HttpOnly: true,
		Path: "/",
		// MaxAge:   60,
		// Expires:  expiration,
	}

	fmt.Println("SETTING COOKIE")

	http.SetCookie(w, cookie)

}

type authContextKey string

const accountKey authContextKey = "ACCOUNT"
const sessionKey authContextKey = "SESSION"

// SetAccountAndSessionInRequestContext modifies the request's Context() to add the Account
func SetAccountAndSessionInRequestContext(r *http.Request, account api.Account, session api.Session) context.Context {
	accountContext := context.WithValue(r.Context(), accountKey, account)
	sessionContext := context.WithValue(accountContext, sessionKey, session)

	return sessionContext
}

// AccountAndSessionFromRequestContext gets the reference to the Account stored in the request.Context()
func AccountAndSessionFromRequestContext(r *http.Request) (api.Account, api.Session) {
	// This will panic if it is not set or if it's not an Account. That will always be a programmer
	// error so I think that it's worth the tradeoff for the simpler method signature.
	account := r.Context().Value(accountKey).(api.Account)
	session := r.Context().Value(sessionKey).(api.Session)
	return account, session
}
