package http

import (
	"context"
	"net/http"
	"net/url"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

// SessionCookieName is the name of the cookie that is used to store the session
const SessionCookieName = "eapp-session-key"

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

		sessionCookie, cookieErr := r.Cookie(SessionCookieName)
		if cookieErr != nil {
			service.log.WarnError(api.RequestIsMissingSessionCookie, cookieErr, api.LogFields{})
			RespondWithStructuredError(w, api.RequestIsMissingSessionCookie, http.StatusUnauthorized)
			return
		}

		sessionKey := sessionCookie.Value
		account, session, err := service.session.GetAccountIfSessionIsValid(sessionKey)
		if err != nil {
			if err == api.ErrValidSessionNotFound {
				service.log.WarnError(api.SessionDoesNotExist, err, api.LogFields{})
				RespondWithStructuredError(w, api.SessionDoesNotExist, http.StatusUnauthorized)
			}
			if err == api.ErrSessionExpired {
				service.log.WarnError(api.SessionExpired, err, api.LogFields{})
				RespondWithStructuredError(w, api.SessionExpired, http.StatusUnauthorized)
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

// SessionCookieService writes session cookies to a response
type SessionCookieService struct {
	secure bool
	domain string
}

// NewSessionCookieService returns a SessionCookieService
func NewSessionCookieService(apiBaseURL string) (SessionCookieService, error) {
	// We use the API Base URL to determine some of the cookie settings.
	uri, parseErr := url.Parse(apiBaseURL)
	if parseErr != nil {
		return SessionCookieService{}, parseErr
	}

	secure := uri.Scheme == "https"
	parts := strings.Split(uri.Host, ":")
	domain := parts[0]

	// Some browsers (safari for sure) don't handle cookies
	// with a domain without a "." in them. For example localhost:3000
	// This is apparently per-spec but Chrome does work
	if strings.Index(domain, ".") == -1 {
		domain = ""
	}

	return SessionCookieService{
		secure,
		domain,
	}, nil
}

// AddSessionKeyToResponse adds the session cookie to a response given a valid sessionKey
func (s SessionCookieService) AddSessionKeyToResponse(w http.ResponseWriter, sessionKey string) {
	// LESSONS:
	// The domain must be "" for localhost to work
	// Safari will fuck up cookies if you have a .local hostname, chrome does fine
	// Secure must be false for http to work

	cookie := &http.Cookie{
		Secure:   s.secure,
		Domain:   s.domain,
		Name:     SessionCookieName,
		Value:    sessionKey,
		HttpOnly: true,
		Path:     "/",
		// Omit MaxAge and Expires to make this a session cookie.
	}

	http.SetCookie(w, cookie)

}

// -- Context Storage
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
