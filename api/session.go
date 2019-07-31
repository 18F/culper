package api

import (
	"database/sql"
	"errors"
	"time"
)

var (
	// ErrValidSessionNotFound is returned when a valid session is not found
	ErrValidSessionNotFound = errors.New("Valid session not found")

	// ErrSessionExpired is returned when the requested session has expired
	ErrSessionExpired = errors.New("Valid session not found")
)

// SessionService backs user authentication -- providing a way to verify & modify session status
type SessionService interface {
	// UserDidAuthenticate creates a session for a newly logged in user
	UserDidAuthenticate(accountID int, sessionIndex sql.NullString) (sessionKey string, err error)
	// GetAccountIfSessionIsValid returns an account if the session is valid, or ErrValidSessionNotFound otherwise
	GetAccountIfSessionIsValid(sessionKey string) (account Account, session Session, err error)
	// UserDidLogout invalidates a session for a newly logged out user
	UserDidLogout(sessionKey string) error
}

// Session contains all the information about a given user session in eApp
type Session struct {
	AccountID      int            `db:"account_id"`
	SessionKey     string         `db:"session_key"`
	ExpirationDate time.Time      `db:"expiration_date"`
	SessionIndex   sql.NullString `db:"session_index"` // This is a value related to SAML SLO
}
