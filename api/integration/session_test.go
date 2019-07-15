package integration

import (
	"testing"
	"time"

	"github.com/18f/e-QIP-prototype/api/session"
)

func TestCreateSession(t *testing.T) {
	// get a store
	services := cleanTestServices(t) // actually *returning* clean test services

	// create a user
	testUser := createTestAccount(t, services.db)

	// get a session service
	sessionService := session.NewSessionService(5*time.Second, services.store)

	// create a session for the user
	sessionKey, userAuthdErr := sessionService.UserDidAuthenticate(testUser.ID)
	if userAuthdErr != nil {
		t.Fatal(userAuthdErr)
	}

	// verify there is now a session for the user
	account, getAccountErr := sessionService.GetAccountIfSessionIsValid(sessionKey)
	if getAccountErr != nil {
		t.Fatal(getAccountErr)
	}

	if account != testUser {
		t.Fatal("returned account does not match testUser account")
	}

}
