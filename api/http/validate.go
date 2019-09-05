package http

import (
	"io/ioutil"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// ValidateHandler is the handler for validating a payload.
type ValidateHandler struct {
	Log api.LogService
}

// ServeHTTP validates if the payload pass validation procedures.
func (service ValidateHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		service.Log.WarnError(api.PayloadEmpty, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEmpty, http.StatusBadRequest)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		service.Log.WarnError(api.PayloadDeserializeError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadDeserializeError, http.StatusBadRequest)
		return
	}

	entity, err := payload.Entity()
	if err != nil {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEntityError, http.StatusBadRequest)

		EncodeErrJSON(w, err)
		return
	}

	location, ok := entity.(*api.Location)
	if !ok {
		service.Log.Warn(api.InvalidValidation, api.LogFields{})
		RespondWithStructuredError(w, api.InvalidValidation, http.StatusBadRequest)
		return
	}

	// Perform minimal field validation on location and send it
	// to the USPS geocoding service. Validation errors of this
	// nature are normal, expected, and parsed by the caller.
	if ok, err := location.Valid(); !ok {
		EncodeErrJSON(w, err)
		return
	}

}
