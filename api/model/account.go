package model

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/18F/e-QIP-prototype/api/db"
	jwt "github.com/dgrijalva/jwt-go"
)

var (
	JwtSecret            = []byte("more secrets!")
	Issuer               = "eqip"
	BasicAuthAudience    = "Basic"
	TwoFactorAudience    = "2FA"
	SingleSignOnAudience = "SSO"
	Expiration           = time.Hour * 1

	// ErrPasswordDoesNotMatch is an error when a user inputs an invalid password
	ErrPasswordDoesNotMatch = errors.New("Password does not match")

	// ErrAccoundDoesNotExist is an error when a users account does not exist
	ErrAccoundDoesNotExist = errors.New("Account does not exist")

	// ErrDatastoreConnection is an error when a database connection cannot be made
	ErrDatastoreConnection = errors.New("Unable to connect to datastore")
)

// Account represents a user account
type Account struct {
	ID        int
	Username  string
	Firstname string
	Lastname  string
	Token     string
	TokenUsed bool
	Email     string
	db        *db.DatabaseContext
}

// WithContext sets a db connection for a particular model
func (a *Account) WithContext(ctx *db.DatabaseContext) {
	a.db = ctx
}

// BasicAuthentication checks if the username and password are valid and returns the users account
func (a *Account) BasicAuthentication(password string) error {
	var basicMembership BasicAuthMembership

	// Find if basic auth record exists for given account username
	err := a.db.Database.Model(&basicMembership).
		Column("basic_auth_membership.*", "Account").
		Where("Account.username = ?", a.Username).
		Select()

	if err != nil {
		fmt.Printf("Basic Authentication Error: [%v]\n", err)
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
func (a *Account) NewJwtToken(audience string) (string, time.Time, error) {
	expiresAt := time.Now().Add(Expiration)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Id:        strconv.FormatInt(int64(a.ID), 10),
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

// ValidJwtToken parses a token and determines if the token is valid
func (a *Account) ValidJwtToken(rawToken, audience string) (bool, error) {
	token, err := jwt.ParseWithClaims(rawToken, &jwt.StandardClaims{}, keyFunc)
	if err != nil {
		// Invalid token
		return false, err
	}

	if token.Valid {
		claims := token.Claims.(*jwt.StandardClaims)
		a.ID, err = strconv.Atoi(claims.Id)
		if err != nil {
			return false, err
		}

		if claims.Audience != audience {
			return false, errors.New("Invalid audience")
		}
	}

	// Everything is good
	return token.Valid, nil
}

// Get account from the database
func (a *Account) Get() error {
	if a.db.Database == nil {
		return errors.New("No database context found")
	}

	if a.ID == 0 {
		return a.db.Database.
			Model(a).
			Where("Account.username = ?", a.Username).
			Select()
	}

	return a.db.Database.Select(a)
}

// Save a database entity
func (a *Account) Save() error {
	if a.db.Database == nil {
		return errors.New("No database context found")
	}

	var err error
	if a.ID == 0 {
		err = a.db.Database.Insert(a)
	} else {
		err = a.db.Database.Update(a)
	}

	return err
}

func keyFunc(token *jwt.Token) (interface{}, error) {
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}
	return JwtSecret, nil
}
