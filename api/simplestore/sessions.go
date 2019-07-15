package simplestore

import "time"

// CreateOrUpdateSession returns session key or error
func (s SimpleStore) CreateOrUpdateSession(accountID int, sessionKey string, timeout time.Duration) error {
	// do something
}
