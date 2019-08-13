package http

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/gorilla/csrf"
)

// tokenHeaderName is the header name the token will be set in.
const tokenHeaderName = "X-CSRF-Token"

// CSRFMiddleware is a middleware that uses gorilla/csrf to protect all state changing operations from CSRF attacks.
type CSRFMiddleware struct {
	gorillaMiddleware func(http.Handler) http.Handler
}

// NewCSRFMiddleware returns a configured CSRFMiddleware
func NewCSRFMiddleware(log api.LogService, authKey []byte, useSecureCookie bool) (*CSRFMiddleware, error) {
	if len(authKey) == 0 {
		log.Warn("CSRF_SECRET is not set. A random secret is being generated. This should be set in production so that restarting the server doesn't break CSRF protection", api.LogFields{})
		// Generate a random 32 byte secret for CSRF
		b := make([]byte, 32)
		_, err := rand.Read(b)
		if err != nil {
			return nil, errors.New("Failed to generate temporary random CSRF secret")
		}

		authKey = []byte(base64.StdEncoding.EncodeToString(b))
	}

	errorHandler := newCSRFErrorHandler(log)

	gorillaMiddleware := csrf.Protect(authKey, csrf.Secure(useSecureCookie), csrf.ErrorHandler(errorHandler))

	return &CSRFMiddleware{
		gorillaMiddleware,
	}, nil
}

// Middleware for verifying the CSRF token
func (m CSRFMiddleware) Middleware(next http.Handler) http.Handler {
	return m.gorillaMiddleware(next)
}

// crsfErrorHandler gets called whenever gorilla detects a CSRF error
type crsfErrorHandler struct {
	log api.LogService
}

func newCSRFErrorHandler(log api.LogService) crsfErrorHandler {
	return crsfErrorHandler{
		log,
	}
}

// csrfErrorHandler renders an error if the CSRF middleware fails
func (e crsfErrorHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	token := r.Header.Get(tokenHeaderName)

	if token == "" {
		e.log.Warn(api.CSRFTokenMissing, api.LogFields{})
		RespondWithStructuredError(w, api.CSRFTokenMissing, http.StatusForbidden)
	} else {
		e.log.Warn(api.CSRFTokenInvalid, api.LogFields{})
		RespondWithStructuredError(w, api.CSRFTokenInvalid, http.StatusForbidden)
	}

}

// AddCSRFTokenHeader adds the current token header to the response
func AddCSRFTokenHeader(w http.ResponseWriter, r *http.Request) {
	// if CSRF middleware has not been engaged, then Token() returns the empty string
	token := csrf.Token(r)
	w.Header()[tokenHeaderName] = []string{token}
}
