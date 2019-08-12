package http

import (
	"net/http"

	"github.com/gorilla/csrf"
)

// tokenHeaderName is the header name the token will be set in.
const tokenHeaderName = "X-CSRF-Token"

// CSRFMiddleware is a middleware that uses gorilla/csrf to protect all state changing operations from CSRF attacks.
type CSRFMiddleware struct {
	gorillaMiddleware func(http.Handler) http.Handler
}

// NewCSRFMiddleware returns a configured CSRFMiddleware
func NewCSRFMiddleware(authKey []byte, useSecureCookie bool) *CSRFMiddleware {
	gorillaMiddleware := csrf.Protect(authKey, csrf.Secure(useSecureCookie))

	return &CSRFMiddleware{
		gorillaMiddleware,
	}
}

// Middleware for verifying the CSRF token
func (m CSRFMiddleware) Middleware(next http.Handler) http.Handler {
	return m.gorillaMiddleware(next)
}

// AddCSRFTokenHeader adds the current token header to the response
// Strangely, in test, at least, if this isn't passed explicitly as a pointer it doesn't pass by refrence correctly.
// even though the writer instance is a pointer already
func AddCSRFTokenHeader(w *http.ResponseWriter, r *http.Request) {
	token := csrf.Token(r)
	(*w).Header()[tokenHeaderName] = []string{token}
}
