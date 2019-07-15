package simplestore

import (
	"time"

	"github.com/18F/e-QIP-prototype/api"
)

// CreateOrUpdateSession returns session key or error
func (s SimpleStore) CreateOrUpdateSession(accountID int, sessionKey string, timeout time.Duration) error {
	// do something
	return nil
}

// DeleteSession removes a session record from the db
func (s SimpleStore) DeleteSession(sessionKey string) error {
	return nil
}

// FetchSessionAccount fetches an account and session data from the db
func (s SimpleStore) FetchSessionAccount(sessionKey string) (api.Account, error) {
	return api.Account{}, nil
}
