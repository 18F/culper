package jwt

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strconv"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	jwt "github.com/dgrijalva/jwt-go"
)

const (
	Issuer               = "eqip"
)

var (
	JwtSecret        = Secret()
	JwtSigningMethod = jwt.SigningMethodHS256
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
	Expiration       = Timeout()
)

type TokenService struct {
	Env     *api.Settings
}

// CheckToken tests if the token is valid and is of the correct audience.
func (service *TokenService) CheckToken(request *http.Request, validTokenFunc func(string, string) (bool, error)) (string, error) {
	jwtToken := ExtractToken(request)
	if jwtToken == "" {
		return "", errors.New("No authorization token header found")
	}

	valid := false
	var err error
	for _, audience := range service.TargetAudiences() {
		if valid, err = validTokenFunc(jwtToken, audience); valid {
			break
		}
	}

	if !valid {
		return jwtToken, err
	}

	return jwtToken, nil
}

// ExtractToken returns the token from an HTTP request header.
func (service TokenService) ExtractToken(request *http.Request) string {
	authHeader := request.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		return ""
	}

	return matches[1]
}

// CurrentAudience is the currently valid audience from the token.
func (service TokenService) CurrentAudience(request *http.Request) string {
	rawToken := ExtractToken(request)
	token, err := ParseWithClaims(rawToken)
	if err != nil {
		return ""
	}

	if token.Valid {
		claims := token.Claims.(*jwt.StandardClaims)
		return claims.Audience
	}

	return ""
}

// NewToken generates a new Jwt signed token using a users account information
func (service TokenService) NewToken(id int, audience string) (string, time.Time, error) {
	expiresAt := time.Now().Add(Expiration)
	token := jwt.NewWithClaims(JwtSigningMethod, jwt.StandardClaims{
		Id:        strconv.FormatInt(int64(id), 10),
		Issuer:    Issuer,
		Audience:  audience,
		ExpiresAt: expiresAt.Unix(),
	})

	signedToken, err := token.SignedString(JwtSecret)
	if err != nil {
		return "", time.Time{}, err
	}

	return signedToken, expiresAt, nil
}

// TokenClaims return all standard token claims.
func (service TokenService) TokenClaims(token *jwt.Token) *jwt.StandardClaims {
	return token.Claims.(*jwt.StandardClaims)
}

// ParseWithClaims parses the token with standard claims..
func (service TokenService) ParseWithClaims(tokenString string) (*jwt.Token, error) {
	return jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, KeyFunc)
}

// KeyFunc ensures the signing method of the token.
func (service TokenService) KeyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return JwtSecret, nil
}

// Timeout returns the duration in time for how long a session is considered valid.
// Per policy this defaults to 15 minutes.
func (service TokenService) Timeout() time.Duration {
	timeout := 0
	if service.Env.Has(api.SESSION_TIMEOUT) {
		timeout = service.Env.Int(api.SESSION_TIMEOUT)
	}

	if timeout < 1 {
		timeout = 15
	}
	return time.Duration(timeout) * time.Minute
}

// Secret returns the secret to use with JWT tokens.
func (service TokenService) Secret() []byte {
	return []byte(service.Env.String(api.JWT_SECRET))
}

// ConfigureEnvironment ensure the secret is set prior to use.
func (service TokenService) ConfigureEnvironment(size int) error {
	if size == 256 {
		JwtSigningMethod = jwt.SigningMethodHS256
	} else if size == 512 {
		JwtSigningMethod = jwt.SigningMethodHS512
	}

	if service.Env.Has(api.JWT_SECRET) {
		return nil
	}

	// If no secret is present then generate one at random
	c := size / 8
	b := make([]byte, c)
	_, err := rand.Read(b)
	if err != nil {
		// Fail securely
		panic("Could not randomize JWT secret")
	}

	secret = base64.StdEncoding.EncodeToString(b)
	return os.Setenv(api.JWT_SECRET, secret)
}

// TargetAudiences which are accepted based on the configured environment.
func (service *TokenService) TargetAudiences() []string {
	audiences := []string{}

	if service.Env.True(api.BASIC_ENABLED) {
		audiences = append(audiences, api.BasicAuthAudience)
	}

	if !service.Env.True(api.2FA_DISABLED) {
		audiences = append(audiences, api.TwoFactorAudience)
	}

	if service.Env.True(SAML_ENABLED)
		audiences = append(audiences, api.SingleSignOnAudience)
	}

	return audiences
}
