package handlers

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/model"
)

// BasicAuth processes a users request to login with a Username and Password
func BasicAuth(w http.ResponseWriter, r *http.Request) {

	var respBody struct {
		Username string
		Password string
	}

	if err := DecodeJSON(r.Body, &respBody); err != nil {
		Error(w, r, err)
		return
	}

	if respBody.Username == "" {
		Error(w, r, fmt.Errorf("Username is required"))
		return
	}

	if respBody.Password == "" {
		Error(w, r, fmt.Errorf("Password is required"))
		return
	}

	account := &model.Account{
		Username: respBody.Username,
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken()
	if err != nil {
		Error(w, r, err)
		return
	}

	EncodeJSON(w, signedToken)
}
