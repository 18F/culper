package api

import (
	"errors"
)

var (
	// ErrValidSessionNotFound is returned when a valid session is not found
	ErrValidSessionNotFound = errors.New("Valid session not found")
)

type SessionService interface {
	// UserDidAuthenticate creates a session for a newly logged in user
	UserDidAuthenticate(accountID int) (sessionKey string, err error)
	// GetAccountIfSessionIsValid returns an account if the session is valid, or ErrValidSessionNotFound otherwise
	GetAccountIfSessionIsValid(sessionKey string) (account Account, err error)
	// UserDidLogout invalidates a session for a newly logged out user
	UserDidLogout(sessionKey string) error
}
