package handlers

import (
	"net/http"

	"github.com/truetandem/e-QIP-prototype/api/db"
	"github.com/truetandem/e-QIP-prototype/api/model"
)

func BasicAuth(w http.ResponseWriter, r *http.Request) {

	var respBody struct {
		Username string
		Password string
	}

	if err := DecodeJSON(r.Body, &respBody); err != nil {
		ErrorJSON(w, r, err)
		return
	}

	account := &model.Account{
		Username: respBody.Username,
	}

	// Add db connection
	account.WithContext(db.NewDB())

	// Make sure username and password are valid
	if err := account.BasicAuthentication(respBody.Password); err != nil {
		ErrorJSON(w, r, err)
		return
	}

	// Generate jwt token
	signedToken, _, err := account.NewJwtToken()
	if err != nil {
		ErrorJSON(w, r, err)
		return
	}

	EncodeJSON(w, signedToken)

}
