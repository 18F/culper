package main

import (
	"net/http"

	"github.com/truetandem/e-QIP-prototype/api/db"
	"github.com/truetandem/e-QIP-prototype/api/model"
)

// Logs in a user and generates a jwt token
func basicAuthHandler(w http.ResponseWriter, r *http.Request) {

	var respBody struct {
		Username string
		Password string
	}

	if err := DecodeJSON(r.Body, &respBody); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	account := &model.Account{
		Username: respBody.Username,
	}

	// Add db connection
	account.WithContext(db.NewDB())

	// Make sure username and password are valid
	if err := account.BasicAuthentication(respBody.Password); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	EncodeJSON(w, signedToken)

}
