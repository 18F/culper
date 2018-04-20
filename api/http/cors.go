package http

import (
	"net/http"
	"regexp"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

type CORSHandler struct {
	Log api.LogService
	Env api.Settings
}

// CORS Wraps an http handler with logic to handle cors requests.
// Specifies the allowed origins, methods and headers.
func (service CORSHandler) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if allowedOrigin(origin, service.Env) {
			service.Log.Debug("Setting allowed CORS parameters", api.LogFields{"origin": origin})
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers",
				"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		} else {
			service.Log.Info(api.CORSDenied, api.LogFields{"origin": origin})
			http.Error(w, api.CORSDenied, http.StatusBadRequest)
			return
		}

		// Stop here for a Preflighted OPTIONS request.
		if r.Method == "OPTIONS" {
			service.Log.Debug(api.CORSIgnored, api.LogFields{})
			return
		}

		// Let gorilla mux do its thing
		next.ServeHTTP(w, r)
	})
}

// AllowedOrigin checks the given origin is whitelisted as an acceptable address.
func allowedOrigin(origin string, env api.Settings) bool {
	addresses := strings.TrimSpace(env.String(api.CORS_ALLOWED))
	for _, addr := range strings.Split(addresses, ";") {
		if addr == "" {
			continue
		}

		if addr == "*" {
			return true
		}
		re := regexp.MustCompile(strings.TrimSpace(addr))
		if re.MatchString(origin) {
			return true
		}
	}

	return false
}
