package http

import (
	"io/ioutil"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// ValidateHandler is the handler for validating a payload.
type ValidateHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP validates if the payload pass validation procedures.
func (service ValidateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		service.Log.WarnError(api.PayloadEmpty, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		service.Log.WarnError(api.PayloadDeserializeError, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	// Extract the entity interface of the payload and validate it
	if ok, err := payload.Valid(); !ok {
		service.Log.WarnError(api.PayloadInvalid, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	EncodeErrJSON(w, nil)
}
