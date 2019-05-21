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

//DeleteApplication deletes an attachment for the given account
func (s *StorageService) DeleteApplication(accountID int) error {
	return nil
}

// CreateAttachment creates an attachment in the database
func (s *StorageService) CreateAttachment(attachment *api.Attachment) error {
	return nil
}

// LoadAttachment loads an attachment from the database
func (s *StorageService) LoadAttachment(accountID int, attachmentID int) (api.Attachment, error) {
	return api.Attachment{}, nil
}

// ListAttachmentsMetadata returns a slice of attachments' metadata for a given account.
func (s *StorageService) ListAttachmentsMetadata(accountID int) ([]api.Attachment, error) {
	return []api.Attachment{}, nil
}

//DeleteAttachment deletes an attachment for the given account
func (s *StorageService) DeleteAttachment(accountID int, attachmentID int) error {
	return nil
}
