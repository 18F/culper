package http

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// HashHandler is the handler for the form hash.
type HashHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// ServeHTTP returns the hash of the application data used to verify data integrity.
func (service HashHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// Get account ID
	id := AccountIDFromRequestContext(r)

	// Get the account information from the data store
	account := &api.Account{ID: id}
	if _, err := account.Get(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		RespondWithStructuredError(w, api.NoAccount, http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	hash, err := api.Hash(service.Database, account.ID)
	if err != nil {
		service.Log.WarnError(api.HashingFailure, err, api.LogFields{})
		RespondWithStructuredError(w, api.HashingFailure, http.StatusInternalServerError)
		return
	}

	fmt.Fprint(w, hash)
}
