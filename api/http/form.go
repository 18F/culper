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
	Database api.DatabaseService
	Store    api.StorageService
}

// ServeHTTP will return a JSON object of all currently saved application
// information specifict to the account.
func (service FormHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Get account ID
	account, _ := AccountAndSessionFromRequestContext(r)

	// If the account is locked then we cannot proceed
	if account.Status == api.StatusSubmitted {
		service.Log.Warn(api.AccountLocked, api.LogFields{})
		RespondWithStructuredError(w, api.AccountLocked, http.StatusForbidden)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	app, loadErr := service.Store.LoadApplication(account.ID)
	if loadErr != nil {
		if loadErr == api.ErrApplicationDoesNotExist {
			// They've never saved anything, so just return an in-memory one.
			app = api.BlankApplication(account.ID, account.FormType, account.FormVersion)
		} else {
			service.Log.WarnError(api.FormDecodingError, loadErr, api.LogFields{})
			RespondWithStructuredError(w, api.FormDecodingError, http.StatusInternalServerError)
			return
		}
	}

	var jsonBytes []byte

	if service.Env.True(api.IndentJSON) {
		var jsonErr error
		jsonBytes, jsonErr = json.MarshalIndent(app, "", "  ")
		if jsonErr != nil {
			service.Log.WarnError(api.FormDecodingError, jsonErr, api.LogFields{})
			RespondWithStructuredError(w, api.FormDecodingError, http.StatusInternalServerError)
			return
		}
	} else {
		var jsonErr error
		jsonBytes, jsonErr = json.Marshal(app)
		if jsonErr != nil {
			service.Log.WarnError(api.FormDecodingError, jsonErr, api.LogFields{})
			RespondWithStructuredError(w, api.FormDecodingError, http.StatusInternalServerError)
			return
		}
	}

	fmt.Fprint(w, string(jsonBytes))
}
