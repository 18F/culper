package integration

import (
	"net/http/httptest"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/session"
)

func TestFullSessionHTTPFlow_Unauthenticated(t *testing.T) {
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store)
	sessionMiddleware := http.NewSessionMiddleware(services.log, sessionService)

	formHandler := http.FormHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	wrappedHandler := sessionMiddleware.Middleware(formHandler)

	responseWriter := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/me/save", nil)

	// make a request to some endpoint wrapped in middleware
	wrappedHandler.ServeHTTP(responseWriter, req)

	// confirm response follows unauthorized path
	response := responseWriter.Result()
	if response.StatusCode != 401 {
		t.Fatal("Session middleware should have returned 401 unauthorized response")
	}
}

func TestFullSessionHTTPFlow_BadAuthentication(t *testing.T) {
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store)
	sessionMiddleware := http.NewSessionMiddleware(services.log, sessionService)

	formHandler := http.FormHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	wrappedHandler := sessionMiddleware.Middleware(formHandler)

	responseWriter := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/me/save", nil)

	// add invalid cookie to request
	t.Fatal("not implemented")

	// make a request to some endpoint wrapped in middleware
	wrappedHandler.ServeHTTP(responseWriter, req)

	// confirm response follows unauthorized path
	response := responseWriter.Result()
	if response.StatusCode != 401 {
		t.Fatal("Session middleware should have returned 401 unauthorized response")
	}
}

func TestFullSessionHTTPFlow_Authenticated(t *testing.T) {
	// login request
	// - hit saml login endpoint
	// - confirm cookie was set in response
	// - confirm http only cookie
	// make another request to some endpoint wrapped in middleware
	// - confirm works
	// logout
	// - nothing to do here? / verify doesn't throw error
	// make a request to some endpoint wrapped in middleware
	// - confirm doesn't work, returns some invalid session warning
}
