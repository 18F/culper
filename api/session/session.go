package session

import (
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/google/uuid"
)

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

// UserDidAuthenticate returns a session key and an error if applicable
func (s Service) UserDidAuthenticate(accountID int) (string, error) {
	sessionKey := uuid.New().String()

	// TODO: add tests to sanity check time edge cases / that time.Time is the right type to use here
	expirationDate := time.Now().Add(s.timeout)

	createErr := s.store.CreateOrUpdateSession(accountID, sessionKey, expirationDate)

	// TODO: update accounts table with login datetime

	if createErr != nil {
		return "", createErr
	}

	return sessionKey, createErr
}

// GetAccountIfSessionIsValid returns an Account if the session key is valid and an error otherwise
func (s Service) GetAccountIfSessionIsValid(sessionKey string) (api.Account, error) {
	return s.store.FetchSessionAccount(sessionKey)
}

// UserDidLogout attempts to end the session and returns an error on failure
func (s Service) UserDidLogout(sessionKey string) error {
	return s.store.DeleteSession(sessionKey)
}
