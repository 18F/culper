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

	jwt "github.com/dgrijalva/jwt-go"
)

const (
	Issuer               = "eqip"
	BasicAuthAudience    = "Basic"
	TwoFactorAudience    = "2FA"
	SingleSignOnAudience = "SSO"
)

var (
	JwtSecret        = Secret()
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
	Expiration       = Timeout()
)

// CheckToken tests if the token is valid and is of the correct audience.
func CheckToken(r *http.Request, validTokenFunc func(string, string) (bool, error), audiences ...string) (string, error) {
	jwtToken := ExtractToken(r)
	if jwtToken == "" {
		return "", errors.New("No authorization token header found")
	}

	valid := false
	var err error
	for _, audience := range audiences {
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
func ExtractToken(r *http.Request) string {
	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		return ""
	}

	return matches[1]
}

// CurrentAudience is the currently valid audience from the token.
func CurrentAudience(r *http.Request) string {
	rawToken := ExtractToken(r)
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
func NewToken(id int, audience string) (string, time.Time, error) {
	expiresAt := time.Now().Add(Expiration)
	token := jwt.NewWithClaims(jwt.SigningMethodHS512, jwt.StandardClaims{
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
func TokenClaims(token *jwt.Token) *jwt.StandardClaims {
	return token.Claims.(*jwt.StandardClaims)
}

// ParseWithClaims parses the token with standard claims..
func ParseWithClaims(tokenString string) (*jwt.Token, error) {
	return jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, KeyFunc)
}

// KeyFunc ensures the signing method of the token.
func KeyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return JwtSecret, nil
}

// Timeout returns the duration in time for how long a session is considered valid.
// Per policy this defaults to 15 minutes.
func Timeout() time.Duration {
	timeout, err := strconv.Atoi(os.Getenv("SESSION_TIMEOUT"))
	if err != nil || timeout < 1 {
		timeout = 15
	}
	return time.Duration(timeout) * time.Minute
}

// Secret returns the secret to use with JWT tokens.
func Secret() []byte {
	secret := os.Getenv("JWT_SECRET")

	if secret == "" {
		// If no secret is present then generate one at random
		c := 64
		b := make([]byte, c)
		_, err := rand.Read(b)
		if err != nil {
			// Fail securely
			panic("Could not randomize JWT secret")
		}

		secret = base64.StdEncoding.EncodeToString(b)
		os.Setenv("JWT_SECRET", secret)
	}

	return []byte(secret)
}
