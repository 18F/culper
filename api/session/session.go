package session

import (
	"crypto/sha512"
	"database/sql"
	"encoding/hex"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/gorilla/securecookie"
	"github.com/pkg/errors"
)

// Service represents a StorageService internally
type Service struct {
	timeout time.Duration
	store   api.StorageService
	log     api.LogService
}

// NewSessionService returns a SessionService
func NewSessionService(timeout time.Duration, store api.StorageService, log api.LogService) *Service {
	return &Service{
		timeout,
		store,
		log,
	}
}

// generateSessionKey generates a cryptographically random session key
func generateSessionKey() (string, error) {
	secureBytes := securecookie.GenerateRandomKey(32)
	if secureBytes == nil {
		return "", errors.New("Failed to generate random data for a key")
	}

	secureString := hex.EncodeToString(secureBytes)

	return secureString, nil

}

func hashSessionKey(sessionKey string) string {
	hashed := sha512.Sum512([]byte(sessionKey))
	hexEncoded := hex.EncodeToString(hashed[:])
	return hexEncoded[:12]
}

// UserDidAuthenticate returns a session key and an error if applicable
func (s Service) UserDidAuthenticate(accountID int, sessionIndex sql.NullString) (string, error) {
	sessionKey, keyErr := generateSessionKey()
	if keyErr != nil {
		return "", keyErr
	}

	createErr := s.store.CreateOrUpdateSession(accountID, sessionKey, sessionIndex, s.timeout)
	if createErr != nil {
		return "", createErr
	}
	hashedSessionKey := hashSessionKey(sessionKey)
	s.log.AddField("session_hash", hashedSessionKey)
	s.log.Info(api.SessionCreated, api.LogFields{})

	return sessionKey, createErr
}

// GetAccountIfSessionIsValid returns an Account if the session key is valid and an error otherwise
func (s Service) GetAccountIfSessionIsValid(sessionKey string) (api.Account, api.Session, error) {
	account, session, fetchErr := s.store.ExtendAndFetchSessionAccount(sessionKey, s.timeout)
	if fetchErr != nil {
		if fetchErr == api.ErrSessionExpired {
			s.log.Info(api.SessionExpired, api.LogFields{})
		} else if fetchErr == api.ErrValidSessionNotFound {
			s.log.Info(api.SessionDoesNotExist, api.LogFields{})
		}

		return api.Account{}, api.Session{}, fetchErr
	}

	return account, session, nil
}

// UserDidLogout attempts to end the session and returns an error on failure
func (s Service) UserDidLogout(sessionKey string) error {
	delErr := s.store.DeleteSession(sessionKey)
	if delErr != nil {
		return delErr
	}

	s.log.Info(api.SessionDestroyed, api.LogFields{})

	return nil
}
