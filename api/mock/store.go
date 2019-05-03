package mock

import (
	"github.com/18F/e-QIP-prototype/api"
)

// StorageService is a mock storage service
type StorageService struct{}

// CreateApplication creates an application in the db. Errors if already exists.
func (s *StorageService) CreateApplication(app api.Application) error {
	return nil
}

// UpdateApplication replaces an existing application with the passed in one.
func (s *StorageService) UpdateApplication(app api.Application) error {
	return nil
}

// SaveSection replaces a single section in the given application with the passed in section
func (s *StorageService) SaveSection(section api.Section, accountID int) error {
	return nil
}

// LoadApplication returns the given application from the db.
func (s *StorageService) LoadApplication(accountID int) (api.Application, error) {
	return api.Application{}, nil
}
