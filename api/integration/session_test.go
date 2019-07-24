package integration

import (
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/session"
	"github.com/18F/e-QIP-prototype/api/simplestore"
)

func TestFullSessionFlow(t *testing.T) {
	// get a store
	services := cleanTestServices(t) // actually *returning* clean test services

	// create a user
	testUser := createTestAccount(t, services.db)

	// get a session service
	sessionService := session.NewSessionService(5*time.Second, services.store)

	// create a session for the user
	sessionKey, userAuthdErr := sessionService.UserDidAuthenticate(testUser.ID, simplestore.NullString())
	if userAuthdErr != nil {
		t.Fatal("Failed to authenticate user", userAuthdErr)
	}

	// verify there is now a session for the user
	account, _, getAccountErr := sessionService.GetAccountIfSessionIsValid(sessionKey)
	if getAccountErr != nil {
		t.Fatal("Failed to retrieve user's account", getAccountErr)
	}

	if account.ID != testUser.ID {
		t.Fatal("Wrong account retrieved. Returned account does not match testUser account.")
	}

	// logout
	logoutErr := sessionService.UserDidLogout(sessionKey)
	if logoutErr != nil {
		t.Fatal("Failed to logout", logoutErr)
	}

	// verify session key is now invalid
	_, _, expectedErr := sessionService.GetAccountIfSessionIsValid(sessionKey)
	if expectedErr != api.ErrValidSessionNotFound {
		t.Fatal("Failed to invalidate session during logout")
	}
}
