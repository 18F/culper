package api

import (
	"net/http"
	"time"
)

type TokenService interface {
	CheckToken(request *http.Request, validTokenFunc func(string, string) (bool, error)) (string, error)
	ExtractToken(request *http.Request) string
	CurrentAudience(request *http.Request) string
	NewToken(id int, audience string) (string, time.Time, error)
	// TokenClaims(token *jwt.Token) *jwt.StandardClaims
	// ParseWithClaims(tokenString string) (*jwt.Token, error)
	// KeyFunc(token *jwt.Token) (interface{}, error)
	Timeout() time.Duration
	Secret() []byte
	ConfigureEnvironment(size int) error
	TargetAudiences() []string
}
