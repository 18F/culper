package api

import (
	"errors"
	"fmt"
)

var (
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
	Locked    bool
}

// Save the Account entity.
func (entity *Account) Save(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the Account entity.
func (entity *Account) Delete(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the Account entity.
func (entity *Account) Get(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Account) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Account) SetID(id int) {
	entity.ID = id
}

// Find will search for account by `username` if no identifier is present or by ID if it is.
func (entity *Account) Find(context DatabaseService) error {
	if entity.ID == 0 {
		return context.Where(entity, "Account.username = ?", entity.Username)
	}
	return context.Select(entity)
}

// Lock will mark the account in a `locked` status.
func (entity *Account) Lock(context DatabaseService) error {
	entity.Locked = true
	_, err := entity.Save(context, entity.ID)
	return err
}

// Unlock will mark the account in an `unlocked` status.
func (entity *Account) Unlock(context DatabaseService) error {
	entity.Locked = false
	_, err := entity.Save(context, entity.ID)
	return err
}

// BasicAuthentication checks if the username and password are valid and returns the users account
func (entity *Account) BasicAuthentication(context DatabaseService, password string) error {
	var basicMembership BasicAuthMembership

	// Find if basic auth record exists for given account username
	err := context.ColumnsWhere(&basicMembership, []string{"basic_auth_membership.*", "Account"}, "Account.username = ?", entity.Username)
	if err != nil {
		fmt.Printf("Basic Authentication Error: [%v]\n", err)
		return ErrAccoundDoesNotExist
	}

	// Check if plaintext password matches hashed password
	if matches := basicMembership.PasswordMatch(password); !matches {
		return ErrPasswordDoesNotMatch
	}

	entity = basicMembership.Account
	return nil
}
