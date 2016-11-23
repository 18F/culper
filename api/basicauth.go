package main

import (
	"net/http"

	"github.com/truetandem/e-QIP-prototype/api/basicauth"
)

// Logs in a user and generates a jwt token
func basicAuthHandler(w http.ResponseWriter, r *http.Request) {

	var respBody struct {
		Username string
		Password string
	}

	DecodeJSON(r, &respBody)

	token, err := basicauth.Authenticate(respBody.Username, respBody.Password)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	EncodeJSON(w, token)
}
