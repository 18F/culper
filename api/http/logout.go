package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/session"
)

// LogoutHandler is the handler for logging out of a session.
type LogoutHandler struct {
	Log     api.LogService
	Session api.SessionService
}

// ServeHTTP will end the user session.
func (service LogoutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	_, sessionKey := AccountAndSessionFromRequestContext(r)

	logoutErr := service.Session.UserDidLogout(sessionKey)
	if logoutErr != nil {
		service.Log.WarnError("Failed to logout user", logoutErr, api.LogFields{})
		RespondWithStructuredError(w, "Failed to logout user", http.StatusInternalServerError)
		return
	}

	service.Log.Info(api.LoggedOut, api.LogFields{})
}
