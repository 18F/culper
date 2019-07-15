package session

import (
	"time"

	"github.com/18F/e-QIP-prototype/api"
)

type SessionService struct {
	timeout time.Duration
	store   api.StorageService
}

func NewSessionService(timeout time.Duration, store api.StorageService) *SessionService {
	return &SessionService{
		timeout,
		store,
	}
}

// return a session key and an error if applicable
func (s SessionService) UserDidAuthenticate(accountID int) (string, error) {
	// if account id doesn't match any records, create a new one
	sessionKey := "mock key"
	createErr := s.store.CreateOrUpdateSession(accountID, sessionKey, s.timeout)
	if createErr != nil {
		return "", createErr
	}
	return "", nil

}

func (s SessionService) GetAccountIfSessionIsValid(sessionKey string) (api.Account, error) {
	return api.Account{}, nil
}
