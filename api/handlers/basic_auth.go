package handlers

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/db"
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

	// Associate with a database context.
	account.WithContext(db.NewDB())
	if err := account.Get(); err != nil {
		Error(w, r, err)
		return
	}

	// Validate the user name and password combination
	if err := account.BasicAuthentication(respBody.Password); err != nil {
		Error(w, r, err)
		return
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken(model.BasicAuthAudience)
	if err != nil {
		Error(w, r, err)
		return
	}

	EncodeJSON(w, signedToken)
}
