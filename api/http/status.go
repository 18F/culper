package http

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// StatusHandler is the handler for the application status.
type StatusHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP returns the accounts current state.
func (service StatusHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// Get account ID
	id := AccountIDFromRequestContext(r)

	// Get the account information from the data store
	account := &api.Account{ID: id}
	if _, err := account.Get(service.Database, id); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		RespondWithStructuredError(w, api.NoAccount, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	statusBytes, err := api.FormStatus(service.Database, account.ID, account.Locked)
	if err != nil {
		service.Log.WarnError(api.HashingFailure, err, api.LogFields{})
		RespondWithStructuredError(w, api.HashingFailure, http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, string(statusBytes))
}
