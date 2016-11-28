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
	vars := mux.Vars(r)
	account := vars["account"]

	png, err := twofactor.Generate(account, secret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, png)
}

// twofactorVerifyHandler verifies a token provided by the end user.
func twofactorVerifyHandler(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Token string
	}
	DecodeJSON(r, &body)

	ok, err := twofactor.Authenticate(body.Token, secret)
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

func twofactorEmailHandler(w http.ResponseWriter, r *http.Request) {
	err := twofactor.Email("fake@mail.gov", secret)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "")
}
