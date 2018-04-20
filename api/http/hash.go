package http

import (
	"encoding/hex"
	"fmt"
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

type HashHandler struct {
	Env      api.Settings
	Log      api.LogService
	Token    api.TokenService
	Database api.DatabaseService
}

// Hash of the application data used to verify data integrity.
func (service HashHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	account := &api.Account{}

	// Valid token and audience while populating the audience ID
	_, id, err := service.Token.CheckToken(r)
	if err != nil {
		service.Log.WarnError(api.InvalidJWT, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	account.ID = id

	// Get the account information from the data store
	if _, err := account.Get(service.Database, account.ID); err != nil {
		service.Log.WarnError(api.NoAccount, err, api.LogFields{})
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	hash := api.Hash(service.Database, account.ID)
	fmt.Fprint(w, hex.EncodeToString(hash[:]))
}
