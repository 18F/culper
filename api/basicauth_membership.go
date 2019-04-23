package api

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

// BasicAuthMembership stores basic authentication information for the account.
type BasicAuthMembership struct {
	ID           int
	AccountID    int
	Account      *Account
	PasswordHash string
	Created      time.Time
}

// Save the basic membership.
func (entity *BasicAuthMembership) Save(context DatabaseService, account int) (int, error) {

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the basic membership.
func (entity *BasicAuthMembership) Delete(context DatabaseService, account int) (int, error) {

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the basic membership.
func (entity *BasicAuthMembership) Get(context DatabaseService, account int) (int, error) {

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *BasicAuthMembership) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *BasicAuthMembership) SetID(id int) {
	entity.ID = id
}

// Find the basic membership.
func (entity *BasicAuthMembership) Find(context DatabaseService) error {
	// if entity.ID == 0 {
	// 	return context.Where(entity, "Account.username = ?", entity.Username)
	// }
	return context.Select(entity)
}

// PasswordMatch determines if a plain text password matches its equivalent password hash.
func (entity *BasicAuthMembership) PasswordMatch(password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(entity.PasswordHash), []byte(password)) == nil
}

// HashPassword converts a plaintext password and generates a hash and updates the
// `PasswordHash` value.
func (entity *BasicAuthMembership) HashPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	entity.PasswordHash = string(hashedPassword)
	return nil
}
