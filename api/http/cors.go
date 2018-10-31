package http

import (
	"net/http"
	"regexp"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

// CORSHandler is the handler for CORS.
type CORSHandler struct {
	Log api.LogService
	Env api.Settings
}

// Middleware wraps an http handler with logic to handle cors requests.
// Specifies the allowed origins, methods and headers.
func (service CORSHandler) Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		// Sometimes the "Origin" is empty or missing. This is typically due
		// to a pre-flight in some use cases. When this occurs we fall back on
		// verification of the "Referer" header.
		//
		// https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#Checking_the_Referer_Header
		if origin == "" {
			origin = r.Header.Get("Referer")
		}

		if allowedOrigin(origin, service.Env) {
			service.Log.Debug("Setting allowed CORS parameters", api.LogFields{"origin": origin})
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers",
				"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		} else {
			service.Log.Info(api.CORSDenied, api.LogFields{"origin": origin})
			RespondWithStructuredError(w, api.CORSDenied, http.StatusBadRequest)
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

// allowedOrigin checks the given origin is whitelisted as an acceptable address.
func allowedOrigin(origin string, env api.Settings) bool {
	addresses := strings.TrimSpace(env.String(api.CORSAllowed))
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
