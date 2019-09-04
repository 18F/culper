package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// SecurityHandler implements the security related settings on web responses.
type SecurityHandler struct {
	Log api.LogService
	Env api.Settings
}

// Middleware applies security-related headers to the response.
func (service SecurityHandler) Middleware(next http.Handler) http.Handler {

	handler := func(w http.ResponseWriter, r *http.Request) {

		if !service.Env.True(api.DevDisableSSL) {
			w.Header().Set("Strict-Transport-Security", "max-age = 31536000; includeSubDomains")
		}

		// Additional headers here

		// Dispatch
		next.ServeHTTP(w, r)
	}

	return http.HandlerFunc(handler)
}
