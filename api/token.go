package api

import (
	"net/http"
	"time"
)

// TokenService represents a service providing Javascript Web Tokens.
type TokenService interface {
	CheckToken(request *http.Request) (string, int, error)
	ExtractToken(request *http.Request) string
	CurrentAudience(request *http.Request) string
	SessionIndex(request *http.Request) string
	NewToken(id int, sessionIndex, audience string) (string, time.Time, error)
	Timeout() time.Duration
	Secret() []byte
	ConfigureEnvironment(size int) error
	TargetAudiences() []string
}
