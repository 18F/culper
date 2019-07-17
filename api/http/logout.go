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

	// TODO: Maybe we want to have UserDidLogout take an account instead of a sessionKey?
	// account := AccountFromRequestContext(r)

	// we've already fetched the cookie in the auth layer so this really sholuldn't
	// be able to error.
	sessionCookie, _ := r.Cookie(session.SessionCookieName)
	sessionKey := sessionCookie.Value

	logoutErr := service.Session.UserDidLogout(sessionKey)
	if logoutErr != nil {
		service.Log.WarnError("Failed to logout user", logoutErr, api.LogFields{})
		RespondWithStructuredError(w, "Failed to logout user", http.StatusInternalServerError)
		return
	}

	service.Log.Info(api.LoggedOut, api.LogFields{})
}
