package handlers

import (
	"io/ioutil"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/model/form"
)

// Validate checks if an entire address is valid
func Validate(w http.ResponseWriter, r *http.Request) {
	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &form.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Extract the entity interface of the payload and validate it
	if ok, err := payload.Valid(); !ok {
		EncodeErrJSON(w, err)
		return
	}

	EncodeErrJSON(w, nil)
}
