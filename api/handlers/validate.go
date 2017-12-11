package handlers

import (
	"io/ioutil"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model/form"
	log "github.com/sirupsen/logrus"
)

// Validate checks if an entire address is valid
func Validate(w http.ResponseWriter, r *http.Request) {
	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.WithError(err).Warn(logmsg.PayloadEmpty)
		EncodeErrJSON(w, err)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &form.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		log.WithError(err).Warn(logmsg.PayloadDeserializeError)
		EncodeErrJSON(w, err)
		return
	}

	// Extract the entity interface of the payload and validate it
	if ok, err := payload.Valid(); !ok {
		log.WithError(err).Warn(logmsg.PayloadInvalid)
		EncodeErrJSON(w, err)
		return
	}

	EncodeErrJSON(w, nil)
}
