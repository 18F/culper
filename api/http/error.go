package http

import (
	"encoding/json"
	"net/http"
)

// Error renders http error information.
func Error(w http.ResponseWriter, r *http.Request, err error) {
	switch err {
	default:
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

type structuredError struct {
	Message string `json:"message"`
}

type structuredErrors struct {
	Errors []structuredError `json:"errors"`
}

func newStructuredError(message string) structuredError {
	return structuredError{
		Message: message,
	}
}

func newStructuredErrors(errors ...structuredError) structuredErrors {
	return structuredErrors{
		Errors: errors,
	}
}

// RespondWithStructuredError writes an error code and a json error response
func RespondWithStructuredError(w http.ResponseWriter, errorMessage string, code int) {
	errorStruct := newStructuredErrors(newStructuredError(errorMessage))
	// It's a little ugly to not just have json write directly to the the Writer, but I don't see another way
	// to return 500 correctly in the case of an error.
	jsonString, err := json.Marshal(errorStruct)
	if err != nil {
		// Log error
		http.Error(w, "Internal Server Error: failed to encode error json", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	http.Error(w, string(jsonString), code)
}
