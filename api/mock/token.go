package mock

import (
	"net/http"
	"time"
)

type TokenService struct{}

func (service TokenService) CheckToken(request *http.Request) (string, int, error) {
	return "", 0, nil
}

func (service TokenService) ExtractToken(request *http.Request) string {
	return ""
}

func (service TokenService) CurrentAudience(request *http.Request) string {
	return ""
}

func (service TokenService) NewToken(id int, audience string) (string, time.Time, error) {
	return "", time.Now(), nil
}

func (service TokenService) Timeout() time.Duration {
	return time.Duration(15) * time.Minute
}

func (service TokenService) Secret() []byte {
	return []byte{}
}

func (service TokenService) ConfigureEnvironment(size int) error {
	return nil
}

func (service TokenService) TargetAudiences() []string {
	return []string{}
}
