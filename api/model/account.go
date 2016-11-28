package model

import (
	"errors"
	"fmt"
	"time"

	jwt "github.com/dgrijalva/jwt-go"

	pg "gopkg.in/pg.v5"
)

var (
	JwtSecret         = []byte("more secrets!")
	Issuer            = "eqip"
	BasicAuthAudience = "Basic"
	Expiration        = time.Minute * 20

	// Errors
	ErrPasswordDoesNotMatch = errors.New("Password does not match")
	ErrAccoundDoesNotExist  = errors.New("Account does not exist")
)

// Account represents a user account
type Account struct {
	ID        int64
	Username  string
	Firstname string
	Lastname  string
	db        *pg.DB
}

// WithContext sets a db connection for a particular model
func (a *Account) WithContext(ctx *pg.DB) {
	a.db = ctx
}

// BasicAuth checks if the username and password are valid and returns the users account
func (a *Account) BasicAuthentication(password string) error {
	var basicMembership BasicAuthMembership

	// Find if basic auth record exists for given account username
	err := a.db.Model(&basicMembership).
		Column("basic_auth_membership.*", "Account").
		Where("Account.username = ?", a.Username).
		Select()

	if err != nil {
		return ErrAccoundDoesNotExist
	}

	// Check if plaintext password matches hashed password
	if matches := basicMembership.PasswordMatch(password); !matches {
		return ErrPasswordDoesNotMatch
	}

	a = basicMembership.Account
	return nil
}

// NewJwtToken generates a new Jwt signed token using a users account information
func (a *Account) NewJwtToken() (string, time.Time, error) {
	expiresAt := time.Now().Add(Expiration)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Id:        string(a.ID),
		Issuer:    Issuer,
		Audience:  BasicAuthAudience,
		ExpiresAt: expiresAt.Unix(),
	})

	signedToken, err := token.SignedString(JwtSecret)
	if err != nil {
		return "", time.Time{}, err
	}

	return signedToken, expiresAt, nil
}

// ValidJwtToken parses a token and determines if the token is valid
func (a *Account) ValidJwtToken(rawToken string) (bool, error) {
	token, err := jwt.Parse(rawToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return JwtSecret, nil
	})

	// Invalid token
	if err != nil {
		return false, err
	}

	// Everything is good
	return token.Valid, err
}
