package mock

import (
	"net/http"
	"time"
)

// TokenService is a mock implementation of JWT service handling.
type TokenService struct{}

// CheckToken tests if the token is valid and is of the correct audience.
func (service TokenService) CheckToken(request *http.Request) (string, int, error) {
	return "", 0, nil
}

// ExtractToken returns the token from an HTTP request header.
func (service TokenService) ExtractToken(request *http.Request) string {
	return ""
}

// CurrentAudience is the currently valid audience from the token.
func (service TokenService) CurrentAudience(request *http.Request) string {
	return ""
}

// NewToken generates a new Jwt signed token using a users account information
func (service TokenService) NewToken(id int, audience string) (string, time.Time, error) {
	return "", time.Now(), nil
}

// Timeout returns the duration in time for how long a session is considered valid.
// Per policy this defaults to 15 minutes.
func (service TokenService) Timeout() time.Duration {
	return time.Duration(15) * time.Minute
}

// Secret returns the secret to use with JWT tokens.
func (service TokenService) Secret() []byte {
	return []byte{}
}

// ConfigureEnvironment ensure the secret is set prior to use.
func (service TokenService) ConfigureEnvironment(size int) error {
	return nil
}

// TargetAudiences which are accepted based on the configured environment.
func (service TokenService) TargetAudiences() []string {
	return []string{}
}
