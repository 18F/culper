package handlers

import (
	"net/http"

	log "github.com/sirupsen/logrus"
)

// CORS Wraps an http handler with logic to handle cors requests.
// Specifies the allowed origins, methods and headers.
func CORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			log.Debug("Setting allowed CORS parameters")
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers",
				"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		}

		// Stop here for a Preflighted OPTIONS request.
		if r.Method == "OPTIONS" {
			log.Debug("CORS ignoring OPTION method")
			return
		}

		// Let gorilla mux do its thing
		h.ServeHTTP(w, r)
	})
}
