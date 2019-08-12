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

	gorillaMiddleware := csrf.Protect(authKey, csrf.Secure(useSecureCookie))

	return &CSRFMiddleware{
		gorillaMiddleware,
	}, nil
}

// Middleware for verifying the CSRF token
func (m CSRFMiddleware) Middleware(next http.Handler) http.Handler {
	return m.gorillaMiddleware(next)
}

// AddCSRFTokenHeader adds the current token header to the response
func AddCSRFTokenHeader(w http.ResponseWriter, r *http.Request) {
	// if CSRF middleware has not been engaged, then Token() returns the empty string
	token := csrf.Token(r)
	w.Header()[tokenHeaderName] = []string{token}
}
