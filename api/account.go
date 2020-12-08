package api

import (
	"database/sql"
	"fmt"

	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

var (
	// ErrPasswordDoesNotMatch is an error when a user inputs an invalid password
	ErrPasswordDoesNotMatch = errors.New("Password does not match")

	// ErrDatastoreConnection is an error when a database connection cannot be made
	ErrDatastoreConnection = errors.New("Unable to connect to datastore")
)

// knownFormVersions is a map of FormType -> slice of known versions sorted with most recent first.
var knownFormVersions = map[string][]string{

	"SF86": []string{
		"2017-07",
	},

	"SF85": []string{
		"2017-12-draft7",
	},

	"SF85P": []string{
		"2017-10-draft3",
	},
}

const (
	// StatusIncomplete indicates that the submission is INCOMPLETE
	StatusIncomplete = "INCOMPLETE"
	// StatusSubmitted indicates that the submission is SUBMITTED
	StatusSubmitted = "SUBMITTED"
	// StatusKickback indicates that the submission is KICKBACK
	StatusKickback = "KICKBACK"
)

// Account represents a user account
type Account struct {
	ID           int
	Username     string
	Email        sql.NullString
	Status       string
	FormType     string         `db:"form_type"`
	FormVersion  string         `db:"form_version"`
	ExternalID   string         `db:"external_id"`   // ExternalID is an identifier used by external systems to id applications
	PasswordHash sql.NullString `db:"password_hash"` // PasswordHash is only used for basic auth, never in production.
	// The only way for PasswordHash to be filled out is to call simplestore.FetchAccountWithPasswordHash
}

// Helper methods for sql.NullString

// NonNullString returns a valid sql.NullString
func NonNullString(value string) sql.NullString {
	return sql.NullString{Valid: true, String: value}
}

// NullString returns an invalid sql.NullString
func NullString() sql.NullString {
	return sql.NullString{}
}

// CheckIsValid returns nil if the account is valid or an error describing what's wrong otherwise.
// This is intended to ensure data integrity by not saving invalid data to the database
func (entity Account) CheckIsValid() error {

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

// CanSubmit returns wether the account is in a valid state for submission
func (entity *Account) CanSubmit() bool {
	if entity.Status == StatusSubmitted {
		return false
	}
	return true
}

// Submit will mark the account in a `SUBMITTED` status.
func (entity *Account) Submit() bool {
	if !entity.CanSubmit() {
		return false
	}

	entity.Status = StatusSubmitted
	return true
}

// Unsubmit will mark the account in a `INCOMPLETE` status. This will likely be for debugging purposes only.
func (entity *Account) Unsubmit() {
	entity.Status = StatusIncomplete
}

// CanKickback returns wether the account is in a valid state for kickback
func (entity *Account) CanKickback() bool {
	if entity.Status != StatusSubmitted {
		return false
	}
	return true
}

// Kickback will mark the account in a `KICKBACK` status.
func (entity *Account) Kickback() bool {
	if !entity.CanKickback() {
		return false
	}

	entity.Status = StatusKickback
	return true
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

// DefaultFormVersion returns the most recent form version for the
// given formType
func DefaultFormVersion(formType string) (string, error) {
	versions := knownFormVersions[formType]
	if versions == nil {
		return "", errors.New(fmt.Sprintf("No known form version for type: %s", formType))
	}

	return versions[0], nil
}

// HashPassword converts a plaintext password and generates a hash
func (entity *Account) HashPassword(password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	entity.PasswordHash = NonNullString(string(hashedPassword))
	return nil
}

// CheckPassword checks if the username and password are valid and returns the users account
func (entity *Account) CheckPassword(password string) error {
	if !entity.PasswordHash.Valid {
		return ErrAccountHasNoPassword
	}

	if bcrypt.CompareHashAndPassword([]byte(entity.PasswordHash.String), []byte(password)) != nil {
		return ErrPasswordDoesNotMatch
	}

	return nil
}
