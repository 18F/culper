package model

import (
	"time"

	pg "gopkg.in/pg.v5"

	"golang.org/x/crypto/bcrypt"
)

type BasicAuthMembership struct {
	ID           int64
	AccountID    int64
	Account      *Account
	PasswordHash string
	Created      time.Time
	db           *pg.DB
}

// WithContext sets a db connection for a particular model
func (b *BasicAuthMembership) WithContext(ctx *pg.DB) {
	b.db = ctx
}

// PasswordMatch determines if a plain text password matches its equivalent password hash
func (b *BasicAuthMembership) PasswordMatch(password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(b.PasswordHash), []byte(password)) == nil
}

// HashPassword converts a plaintext password and generates a hash and updates the
// PasswordHash
func (b *BasicAuthMembership) HashPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	b.PasswordHash = string(hashedPassword)
	return nil
}
