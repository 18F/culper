package session

import (
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestAuthExists(t *testing.T) {

	timeout := 5 * time.Second
	mockStore := mock.StorageService{}
	session := NewSessionService(timeout, &mockStore)

	session.UserDidAuthenticate(0)
}
