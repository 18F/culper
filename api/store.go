package api

import (
	"github.com/pkg/errors"
)

var (
	// ErrApplicationDoesNotExist is an error when a given application does not exist
	ErrApplicationDoesNotExist = errors.New("Application does not exist")

	// ErrAttachmentDoesNotExist is returned when the requested attchment does not exist.
	// Note: this could mean that you requested a valid ID but for a different user.
	ErrAttachmentDoesNotExist = errors.New("Attachment does not exist")
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

	// CreateAttachment creates an attachment in the database
	CreateAttachment(attachment *Attachment) error
	// LoadAttachment loads an attachment from the database
	LoadAttachment(accountID int, attachmentID int) (Attachment, error)
	// ListAttachmentMetadata returns a slice of attachments' metadata for a given account.
	ListAttachmentsMetadata(accountID int) ([]Attachment, error)
	//DeleteAttachment deletes an attachment for the given account
	DeleteAttachment(accountID int, attachmentID int) error
}
