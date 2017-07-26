package handlers

import (
	"log"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/model/form"
)

// ValidateAddress checks if an entire address is valid
func ValidateAddress(w http.ResponseWriter, r *http.Request) {
	var address form.Location
	DecodeJSON(r.Body, &address)
	log.Printf("Validating Full Address: [%v]\n", address)

	_, err := address.Valid()
	EncodeErrJSON(w, err)
}
