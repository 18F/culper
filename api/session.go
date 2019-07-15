package api

import (
	"errors"
)

var (
	// ErrSessionInvalid is returned when the session is invalid
	ErrSessionInvalid = errors.New("Session is invalid")
)

type SessionService interface {
	// UserDidAuthenticate creates a session for a newly logged in user
	UserDidAuthenticate(accountID int) (sessionKey string, err error)
	// GetAccountIfSessionIsValid returns an account if the session is valid, or ErrSessionInvalid otherwise
	GetAccountIfSessionIsValid(sessionKey string) (account Account, err error)
	// UserDidLogout invalidates a sessino for a newly logged out user
	UserDidLogout(sessionKey string) error
}
