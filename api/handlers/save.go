package handlers

import (
	"errors"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/model/form"
)

func Save(w http.ResponseWriter, r *http.Request) {
	// Parse the authorization header for the token
	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		EncodeErrJSON(w, errors.New("No Authorization token header found"))
		return
	}
	token := matches[1]

	// Validate the JWT token and populate the account ID
	account := &model.Account{}
	if ok, err := account.ValidJwtToken(token, model.TwoFactorAudience); !ok {
		EncodeErrJSON(w, err)
		return
	}

	// Get the account information from the data store
	context := db.NewDB()
	account.WithContext(context)
	if err := account.Get(); err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &form.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		EncodeErrJSON(w, err)
		return
	}

	// Save to storage and report any errors
	if _, err = entity.Save(context, account.ID); err != nil {
		EncodeErrJSON(w, err)
		return
	}

	EncodeErrJSON(w, nil)
}

func SaveAttachment(w http.ResponseWriter, r *http.Request) {
	log.Println("Not implemented: /attachment")
}

func GetAttachment(w http.ResponseWriter, r *http.Request) {
	log.Println("Not implemented: /attachment/{id}")
}

func DeleteAttachment(w http.ResponseWriter, r *http.Request) {
	log.Println("Not implemented: /attachment/{id}/delete")
}
