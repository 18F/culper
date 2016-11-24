package basicauth

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var (
	secret = []byte("more secrets!")
)

// Authenticate ensures a users credentials are valid
func Authenticate(username, pw string) (string, error) {

	// TODO can be changed to jwt.MapClaims for custom types
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Id:        username,
		Issuer:    "eqip",
		Audience:  "Basic",
		ExpiresAt: time.Now().Add(time.Minute * 20).Unix(),
	})
	return token.SignedString(secret)
}
