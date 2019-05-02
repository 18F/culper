package http

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// FormHandler is the handler for the form.
type FormHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
	Store    api.StorageService
}

// ServeHTTP will return a JSON object of all currently saved application
// information specifict to the account.
func (service FormHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

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

	w.Header().Set("Content-Type", "application/json")
	app, loadErr := service.Store.LoadApplication(account.ID)
	if loadErr != nil {
		service.Log.WarnError(api.FormDecodingError, loadErr, api.LogFields{})
		RespondWithStructuredError(w, api.FormDecodingError, http.StatusInternalServerError)
		return
	}

	jsonBytes, jsonErr := json.Marshal(app)
	if jsonErr != nil {
		service.Log.WarnError(api.FormDecodingError, jsonErr, api.LogFields{})
		RespondWithStructuredError(w, api.FormDecodingError, http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, string(jsonBytes))
}
