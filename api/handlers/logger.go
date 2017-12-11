package handlers

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/sirupsen/logrus"
)

func LoggerHandler(w http.ResponseWriter, r *http.Request) error {
	log := logmsg.NewLogger()
	log.WithFields(logrus.Fields{
		"method": r.Method,
		"url":    r.URL.String(),
		"ip":     r.RemoteAddr,
	}).Debug("Incoming HTTP(s) request")
	return nil
}
