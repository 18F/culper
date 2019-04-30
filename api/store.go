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
	CreateApplication(app Application) error
	UpdateApplication(app Application) error
	SaveSection(section Entity, accountID int) error
	LoadApplication(accountID int) (Application, error)
}
