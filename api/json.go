package main

import (
	"encoding/json"
	"net/http"
)

// EncodeJSON encodes any object and writes it to a response writer
func EncodeJSON(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(data)
}

// DecodeJSON decodes a request body to the specified interface
func DecodeJSON(r *http.Request, v interface{}) error {
	if err := json.NewDecoder(r.Body).Decode(v); err != nil {
		return err
	}
	return nil
}
