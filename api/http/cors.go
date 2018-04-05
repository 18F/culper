package http

import (
	"net/http"
	"regexp"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

// CORS Wraps an http handler with logic to handle cors requests.
// Specifies the allowed origins, methods and headers.
func CORS(h http.Handler, log *api.LogService, env *api.Settings) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if allowedOrigin(origin, env) {
			log.Debug("Setting allowed CORS parameters", api.LogFields{"origin": origin})
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers",
				"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		} else {
			log.Info("CORS request denied", api.LogFields{"origin": origin})
			return
		}

		// Stop here for a Preflighted OPTIONS request.
		if r.Method == "OPTIONS" {
			log.Debug("CORS ignoring OPTION method", api.LogFields{})
			return
		}

		// Let gorilla mux do its thing
		h.ServeHTTP(w, r)
	})
}

// AllowedOrigin checks the given origin is whitelisted as an acceptable address.
func allowedOrigin(origin string, env *api.Settings) bool {
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
