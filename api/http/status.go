package http

import (
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

type StatusHandler struct {
	Env      *api.Settings
	Log      *api.LogService
	Token    *api.TokenService
	Database *api.DatabaseService
}

// Status returns the accounts current state.
func (service StatusHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
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

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprint(w, string(api.Metadata(service.Database, account.ID, account.Locked)))
}
