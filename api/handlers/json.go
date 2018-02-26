package handlers

import (
	"encoding/json"
	"io"
	"net/http"
)

// EncodeErrJSON will return an error in JSON format.
func EncodeErrJSON(w http.ResponseWriter, errors interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(struct {
		Errors interface{}
	}{
		Errors: errors,
	})
}

// EncodeJSON encodes any object and writes it to a response writer
func EncodeJSON(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(data)
}

// DecodeJSON decodes a request body to the specified interface
func DecodeJSON(r io.Reader, v interface{}) error {
	return json.NewDecoder(r).Decode(v)
}
