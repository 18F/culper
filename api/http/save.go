package http

import (
	"io/ioutil"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

type SaveHandler struct {
	Env      *api.Settings
	Log      *api.LogService
	Token    *api.TokenService
	Database *api.DatabaseService
}

// Save a payload of information for the provided account.
func (service SaveHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	account := &api.Account{}

	// Valid token and audience while populating the audience ID
	_, err := service.Token.CheckToken(account.ValidJwtToken)
	if err != nil {
		service.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Get the account information from the data store
	if err := account.Get(); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		service.Log.WarnError(api.PayloadEmpty, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		service.Log.WarnError(api.PayloadDeserializeError, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	// Save to storage and report any errors
	if _, err = entity.Save(context, account.ID); err != nil {
		service.Log.WarnError(api.EntitySaveError, err, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}
	EncodeErrJSON(w, nil)
}
