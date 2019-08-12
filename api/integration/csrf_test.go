package integration

import (
	"testing"

	"github.com/18F/e-QIP-prototype/api/http"
)

func TestCSRFTokenExists(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	w, req := standardResponseAndRequest("GET", "/me/status", nil, account)

	statusHandler := http.StatusHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	authKey := []byte("123456789012345678901234567890")
	csrfMiddleware := http.NewCSRFMiddleware(authKey, true)

	wrappedHandler := csrfMiddleware.Middleware(statusHandler)

	wrappedHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	csrfTokens := resp.Header["X-CSRF-Token"]
	if len(csrfTokens) != 1 {
		t.Fatal("No CSRF Token included in /status call")
	}

	token := csrfTokens[0]
	if len(token) == 0 {
		t.Fatal("Got nothing for the token")
	}

	// The token is random every time, not much to do to verify that it's right.
}
