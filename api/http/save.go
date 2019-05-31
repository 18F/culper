package http

import (
	"io/ioutil"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// SaveHandler is the handler for saving the application.
type SaveHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	Store    api.StorageService
}

// ServeHTTP saves a payload of information for the provided account.
func (service SaveHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

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

	// Read the body of the request (which should be in JSON)
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		service.Log.WarnError(api.PayloadEmpty, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEmpty, http.StatusBadRequest)
		return
	}

	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	if err := payload.Unmarshal(body); err != nil {
		service.Log.WarnError(api.PayloadDeserializeError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadDeserializeError, http.StatusBadRequest)
		return
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEntityError, http.StatusBadRequest)
		return
	}

	// TODO: Figure out how to make this cleaner.
	section, ok := entity.(api.Section)
	if !ok {
		service.Log.WarnError(api.PayloadEntityError, err, api.LogFields{})
		RespondWithStructuredError(w, api.PayloadEntityError, http.StatusBadRequest)
		return
	}

	// Save to storage and report any errors
	if saveErr := service.Store.SaveSection(section, id); saveErr != nil {
		if saveErr == api.ErrApplicationDoesNotExist {
			// if the application doesn't exist, we need to create it.
			newApplication := api.BlankApplication(account.ID, account.FormType, account.FormVersion)
			newApplication.SetSection(section)

			createErr := service.Store.CreateApplication(newApplication)
			if createErr != nil {
				service.Log.WarnError(api.EntitySaveError, createErr, api.LogFields{})
				RespondWithStructuredError(w, api.EntitySaveError, http.StatusInternalServerError)
				return
			}
		} else {
			service.Log.WarnError(api.EntitySaveError, saveErr, api.LogFields{})
			RespondWithStructuredError(w, api.EntitySaveError, http.StatusInternalServerError)
			return
		}
	}

}
