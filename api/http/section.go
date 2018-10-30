package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// SectionHandler is the handler for returning section information.
type SectionHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP returns data for one section of the application.
func (service SectionHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// Get account ID
	id := AccountIDFromRequestContext(r)

	// Get the account information from the data store
	account := &api.Account{ID: id}
	if _, err := account.Get(service.Database, id); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		RespondWithStructuredError(w, api.NoAccount, http.StatusUnauthorized)
		return
	}

	// If the account is locked then we cannot proceed
	if account.Locked {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		RespondWithStructuredError(w, api.AccountLocked, http.StatusForbidden)
		return
	}

	payloadType := r.FormValue("type")
	if payloadType == "" {
		service.Log.WarnError(api.PayloadMissingType, nil, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadMissingType, http.StatusBadRequest)
		return
	}

	payload := &api.Payload{
		Type: payloadType,
	}
	entity, err := payload.Entity()
	if err != nil {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEntityError, http.StatusBadRequest)
		return
	}

	if _, err = entity.Get(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.EntityError, err, api.LogFields{})
		EncodeJSON(w, `{}`)
		return
	}

	EncodeJSON(w, entity.Marshal())
}
