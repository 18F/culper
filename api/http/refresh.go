package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// RefreshHandler is the handler for refreshing JWTs.
type RefreshHandler struct {
	Env      api.Settings
	Log      api.LogService
	Database api.DatabaseService
}

// ServeHTTP refreshes a given token.
func (service RefreshHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	// This API is a no-op but the session middleware will extend the session
	service.Log.Info(api.SessionRefreshed, api.LogFields{})

}
