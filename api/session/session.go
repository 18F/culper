package session

import (
	"database/sql"
	"encoding/base64"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/gorilla/securecookie"
	"github.com/pkg/errors"
)

// SessionCookieName is the name of the cookie that is used to store the session
const SessionCookieName = "eapp-session-key"

// Service represents a StorageService internally
type Service struct {
	timeout time.Duration
	store   api.StorageService
}

// NewSessionService returns a SessionService
func NewSessionService(timeout time.Duration, store api.StorageService) *Service {
	return &Service{
		timeout,
		store,
	}
}

//TODO Log Correct

// generateSessionKey generates a cryptographically random session key
func generateSessionKey() (string, error) {
	secureBytes := securecookie.GenerateRandomKey(32)
	if secureBytes == nil {
		return "", errors.New("Failed to generate random data for a key")
	}

	secureString := base64.StdEncoding.EncodeToString(secureBytes)

	return secureString, nil

}

// UserDidAuthenticate returns a session key and an error if applicable
func (s Service) UserDidAuthenticate(accountID int, sessionIndex sql.NullString) (string, error) {
	sessionKey, keyErr := generateSessionKey()
	if keyErr != nil {
		return "", keyErr
	}

	createErr := s.store.CreateOrUpdateSession(accountID, sessionKey, sessionIndex, s.timeout)

	// TODO: update accounts table with login datetime

	if createErr != nil {
		return "", createErr
	}

	return sessionKey, createErr
}

// GetAccountIfSessionIsValid returns an Account if the session key is valid and an error otherwise
func (s Service) GetAccountIfSessionIsValid(sessionKey string) (api.Account, api.Session, error) {
	return s.store.ExtendAndFetchSessionAccount(sessionKey, s.timeout)
}

// UserDidLogout attempts to end the session and returns an error on failure
func (s Service) UserDidLogout(sessionKey string) error {
	return s.store.DeleteSession(sessionKey)
}
