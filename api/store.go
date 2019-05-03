package api

import (
	"github.com/pkg/errors"
)

var (
	// ErrApplicationDoesNotExist is an error when a given application does not exist
	ErrApplicationDoesNotExist = errors.New("Account does not exist")
)

// StorageService stores eapp related data
type StorageService interface {
	// CreateApplication creates an application in the db. Errors if already exists.
	CreateApplication(app Application) error
	// UpdateApplication replaces an existing application with the passed in one.
	UpdateApplication(app Application) error
	// SaveSection replaces a single section in the given application with the passed in section
	SaveSection(section Section, accountID int) error
	// LoadApplication returns the given application from the db.
	LoadApplication(accountID int) (Application, error)
}
