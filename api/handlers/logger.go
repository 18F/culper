package handlers

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/sirupsen/logrus"
)

// StandardLogging middleware for HTTP handling.
func StandardLogging(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log := logmsg.NewLoggerFromRequest(r)
		log.WithFields(logrus.Fields{
			"method": r.Method,
			"url":    r.URL.String(),
			"remote": r.RemoteAddr,
		}).Info(logmsg.WebRequest)
		h.ServeHTTP(w, r)
	})
}
