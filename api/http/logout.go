package http

import (
	"net/http"

	"github.com/18F/e-QIP-prototype/api"
)

// LogoutHandler is the handler for logging out of a session.
type LogoutHandler struct {
	Log     api.LogService
	Session api.SessionService
}

// ServeHTTP will end the user session.
func (service LogoutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	_, session := AccountAndSessionFromRequestContext(r)

	logoutErr := service.Session.UserDidLogout(session.SessionKey)
	if logoutErr != nil {
		service.Log.WarnError(api.BasicLogoutFailed, logoutErr, api.LogFields{})
		RespondWithStructuredError(w, api.BasicLogoutFailed, http.StatusInternalServerError)
		return
	}

	DeleteSessionCookie(w)

	service.Log.Info(api.LoggedOut, api.LogFields{})
}
