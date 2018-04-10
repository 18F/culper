package api

import (
	"net/http"
	"time"
)

type TokenService interface {
	CheckToken(request *http.Request) (string, int, error)
	ExtractToken(request *http.Request) string
	CurrentAudience(request *http.Request) string
	NewToken(id int, audience string) (string, time.Time, error)
	Timeout() time.Duration
	Secret() []byte
	ConfigureEnvironment(size int) error
	TargetAudiences() []string
}
