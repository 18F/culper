package api

import (
	"fmt"

	"github.com/pkg/errors"
)

var (
	// ErrPasswordDoesNotMatch is an error when a user inputs an invalid password
	ErrPasswordDoesNotMatch = errors.New("Password does not match")

	// ErrAccountDoesNotExist is an error when a users account does not exist
	ErrAccountDoesNotExist = errors.New("Account does not exist")

	// ErrDatastoreConnection is an error when a database connection cannot be made
	ErrDatastoreConnection = errors.New("Unable to connect to datastore")
)

// knownFormVersions is a map of FormType -> slice of known versions sorted with most recent first.
var knownFormVersions = map[string][]string{

	"SF86": []string{
		"2016-11",
	},

	"SF85": []string{
		"2017-12_draft7",
	},
}

// Account represents a user account
type Account struct {
	ID          int
	Username    string
	Firstname   string
	Lastname    string
	Token       string
	TokenUsed   bool
	Email       string
	Locked      bool
	FormType    string `db:"form_type"`
	FormVersion string `db:"form_version"`
}

// validate returns nil if the account is valid or an error describing what's wrong otherwise.
// This is intended to ensure data integrity by not saving invalid data to the database
func (entity Account) validate() error {

	// the required fields are Username, FormType, and FormVersion
	errorString := "Account is invalid. "
	isValid := true

	if entity.Username == "" {
		errorString += "Missing Username. "
		isValid = false
	}

	if !entity.FormTypeIsKnown() {
		errorString += fmt.Sprintf("%s + %s is not a known form version", entity.FormType, entity.FormVersion)
		isValid = false
	}

	if !isValid {
		return errors.New(errorString)
	}

	return nil

}

// Save the Account entity.
func (entity *Account) Save(context DatabaseService, account int) (int, error) {

	if err := entity.validate(); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the Account entity.
func (entity *Account) Delete(context DatabaseService, account int) (int, error) {

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the Account entity.
func (entity *Account) Get(context DatabaseService, account int) (int, error) {

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

// FormTypeIsKnown returns wether the form type and version are known to eApp
func (entity *Account) FormTypeIsKnown() bool {
	versions := knownFormVersions[entity.FormType]
	for _, version := range versions {
		if entity.FormVersion == version {
			return true
		}
	}
	return false
}

// BasicAuthentication checks if the username and password are valid and returns the users account
func (entity *Account) BasicAuthentication(context DatabaseService, password string) error {
	var basicMembership BasicAuthMembership

	// Find if basic auth record exists for given account username
	err := context.ColumnsWhere(&basicMembership, []string{"basic_auth_membership.*", "Account"}, "Account.username = ?", entity.Username)
	if err != nil {
		fmt.Printf("Basic Authentication Error: [%v]\n", err)
		return ErrAccountDoesNotExist
	}

	// Check if plaintext password matches hashed password
	if matches := basicMembership.PasswordMatch(password); !matches {
		return ErrPasswordDoesNotMatch
	}

	if basicMembership.Account != nil {
		entity.ID = basicMembership.Account.ID
		entity.Username = basicMembership.Account.Username
		entity.Firstname = basicMembership.Account.Firstname
		entity.Lastname = basicMembership.Account.Lastname
		entity.Token = basicMembership.Account.Token
		entity.TokenUsed = basicMembership.Account.TokenUsed
		entity.Email = basicMembership.Account.Email
		entity.Locked = basicMembership.Account.Locked
		entity.FormType = basicMembership.Account.FormType
		entity.FormVersion = basicMembership.Account.FormVersion
	}
	return nil
}
