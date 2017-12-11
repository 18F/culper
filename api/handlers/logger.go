package handlers

import (
	"net/http"

	log "github.com/sirupsen/logrus"
)

func LoggerHandler(w http.ResponseWriter, r *http.Request) error {
	log.WithFields(log.Fields{
		"method": r.Method,
		"url":    r.URL.String(),
		"ip":     r.RemoteAddr,
	}).Debug("Incoming HTTP(s) request")
	return nil
}
