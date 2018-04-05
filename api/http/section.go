package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

type SectionHandler struct {
	Env      *api.Settings
	Log      *api.LogService
	Token    *api.TokenService
	Database *api.DatabaseService
}

// Section returns the data for one section of the application.
func (service SectionHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		EncodeErrJSON(w, err)
		return
	}

	payloadType := r.FormValue("type")
	if payloadType == "" {
		service.Log.WarnError(api.PayloadMissingType, err, api.LogFields{})
		http.Error(w, "No payload type provided", http.StatusInternalServerError)
		return
	}

	payload := &api.Payload{
		Type: payloadType,
	}
	entity, err := payload.Entity()
	if err != nil {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if _, err = entity.Get(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.EntityError, err, api.LogFields{})
		EncodeJSON(w, `{}`)
		return
	}

	EncodeJSON(w, entity.Marshal())
}
