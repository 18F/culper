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

func (s SessionService) UserDidAuthenticate(accountID int) (string, error) {

	return "", nil

}

