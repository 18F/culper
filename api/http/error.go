package http

import "net/http"

// Error renders http error information
func Error(w http.ResponseWriter, r *http.Request, err error) {
	switch err {
	default:
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
