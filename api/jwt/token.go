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
	// Issuer is the JWT issuer.
	Issuer = "eqip"
)

var (
	// JwtSecret is the secret used to generate tokens.
	JwtSecret = ""

	// JwtSigningMethod is the algorithm used for signing tokens.
	JwtSigningMethod = jwt.SigningMethodHS256

	// AuthBearerRegexp is a regular expression to extract the authorization token.
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
)

// TokenService is an implementation of JWT service handling.
type TokenService struct {
	Env api.Settings
}

// CheckToken tests if the token is valid and is of the correct audience.
func (service TokenService) CheckToken(request *http.Request) (string, int, error) {
	id := 0
	jwtToken := service.ExtractToken(request)
	if jwtToken == "" {
		return "", id, errors.New("No authorization token header found")
	}

	valid := false
	var err error
	for _, audience := range service.TargetAudiences() {
		if valid, id, err = service.validateToken(jwtToken, audience); valid {
			break
		}
	}

	if !valid {
		return jwtToken, id, err
	}

	return jwtToken, id, nil
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
	rawToken := service.ExtractToken(request)
	token, err := service.ParseWithClaims(rawToken)
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
	expiresAt := time.Now().Add(service.Timeout())
	token := jwt.NewWithClaims(JwtSigningMethod, jwt.StandardClaims{
		Id:        strconv.FormatInt(int64(id), 10),
		Issuer:    Issuer,
		Audience:  audience,
		ExpiresAt: expiresAt.Unix(),
	})

	signedToken, err := token.SignedString(service.Secret())
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
	return jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, service.KeyFunc)
}

// KeyFunc ensures the signing method of the token.
func (service TokenService) KeyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return service.Secret(), nil
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
	if JwtSecret == "" {
		service.ConfigureEnvironment(256)
	}
	return []byte(JwtSecret)
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

	secret := base64.StdEncoding.EncodeToString(b)
	JwtSecret = secret
	return os.Setenv(api.JWT_SECRET, secret)
}

// TargetAudiences which are accepted based on the configured environment.
func (service TokenService) TargetAudiences() []string {
	audiences := []string{}

	if service.Env.True(api.BASIC_ENABLED) {
		audiences = append(audiences, api.BasicAuthAudience)
	}

	if !service.Env.True(api.DISABLE_2FA) {
		audiences = append(audiences, api.TwoFactorAudience)
	}

	if service.Env.True(api.SAML_ENABLED) {
		audiences = append(audiences, api.SingleSignOnAudience)
	}

	return audiences
}

// validJwtToken parses a token and determines if the token is valid
func (service TokenService) validateToken(rawToken, audience string) (bool, int, error) {
	id := 0
	token, err := service.ParseWithClaims(rawToken)
	if err != nil {
		// Invalid token
		return false, id, err
	}

	if token.Valid {
		claims := service.TokenClaims(token)
		id, err = strconv.Atoi(claims.Id)
		if err != nil {
			return false, id, err
		}

		if claims.Audience != audience {
			return false, id, errors.New("Invalid audience")
		}
	}

	// Everything is good
	return token.Valid, id, nil
}
