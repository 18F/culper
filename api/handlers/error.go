package handlers

import "net/http"

// TODO: Handle errors in one location?
func Error(w http.ResponseWriter, r *http.Request, err error) {
	switch err {
	default:
		w.Write([]byte(err.Error()))
	}
}

func ErrorJSON(w http.ResponseWriter, r *http.Request, err error) {
	switch err {
	default:
		EncodeJSON(w, err.Error())
	}
}
