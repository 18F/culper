package jwt

import (
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
	JwtSecret        = []byte(os.Getenv("JWT_SECRET"))
	AuthBearerRegexp = regexp.MustCompile("Bearer\\s(.*)")
	Expiration       = time.Hour * 1
)

func CheckToken(r *http.Request, validTokenFunc func(string, string) (bool, error), audiences ...string) (string, error) {
	// log := logmsg.NewLogger(r)
	// log.Info(logmsg.ValidatingJWT)

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
		// log.WithError(err).Warn(logmsg.InvalidJWT)
		return jwtToken, err
	}

	return jwtToken, nil
}

func ExtractToken(r *http.Request) string {
	// log := logmsg.NewLogger(r)
	// log.Info(logmsg.ValidatingJWT)

	authHeader := r.Header.Get("Authorization")
	matches := AuthBearerRegexp.FindStringSubmatch(authHeader)
	if len(matches) == 0 {
		// log.Warn(logmsg.NoAuthorizationToken)
		return ""
	}

	return matches[1]
}

func CurrentAudience(r *http.Request) string {
	// log := logmsg.NewLogger(r)
	rawToken := ExtractToken(r)
	token, err := ParseWithClaims(rawToken)
	if err != nil {
		// log.WithError(err).Debug("Failed to parse JWT with standard claims")
		return ""
	}

	if token.Valid {
		claims := token.Claims.(*jwt.StandardClaims)
		// log.WithField("audience", claims.Audience).Debug("Current audience found")
		return claims.Audience
	}

	// log.WithError(err).Debug("JWT is invalid")
	return ""
}

// NewJwtToken generates a new Jwt signed token using a users account information
func NewToken(id int, audience string) (string, time.Time, error) {
	expiresAt := time.Now().Add(Expiration)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
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

func TokenClaims(token *jwt.Token) *jwt.StandardClaims {
	return token.Claims.(*jwt.StandardClaims)
}

func ParseWithClaims(tokenString string) (*jwt.Token, error) {
	return jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, KeyFunc)
}

func KeyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return JwtSecret, nil
}
