package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// StandardLogging middleware for HTTP handling.
func StandardLogging(h http.Handler, log api.LogService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Info(api.WebRequest, api.LogFields{
			"method": r.Method,
			"url":    r.URL.String(),
			"remote": r.RemoteAddr,
		})
		h.ServeHTTP(w, r)
	})
}
