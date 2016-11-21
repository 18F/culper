package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/truetandem/e-QIP-prototype/api/twofactor"
)

var (
	secret = twofactor.Secret()
)

// twofactorHandler is the initial entry and subscription for two-factor
// authentication.
func twofactorHandler(w http.ResponseWriter, r *http.Request) {
	png, err := twofactor.Generate("account", secret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, png)
}

// twofactorVerifyHandler verifies a token provided by the end user.
func twofactorVerifyHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	token := vars["token"]

	ok, err := twofactor.Authenticate(token, secret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if !ok {
		http.Error(w, "Failed two-factor authentication", http.StatusUnauthorized)
		return
	}

	fmt.Fprintf(w, "")
}
