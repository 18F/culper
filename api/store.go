package api

import (
	"database/sql"
	"time"

	"github.com/pkg/errors"
)

var (
	// ErrApplicationDoesNotExist is an error when a given application does not exist
	ErrApplicationDoesNotExist = errors.New("Application does not exist")

	// ErrApplicationAlreadyExists is an error when a given application does not exist
	ErrApplicationAlreadyExists = errors.New("Application already exists")

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
	// DeleteApplication deletes all the form data for a given account
	DeleteApplication(accountID int) error

	// CreateAttachment creates an attachment in the database
	CreateAttachment(attachment *Attachment) error
	// LoadAttachment loads an attachment from the database
	LoadAttachment(accountID int, attachmentID int) (Attachment, error)
	// ListAttachmentMetadata returns a slice of attachments' metadata for a given account.
	ListAttachmentsMetadata(accountID int) ([]Attachment, error)
	// DeleteAttachment deletes an attachment for the given account
	DeleteAttachment(accountID int, attachmentID int) error

	// CreateSession creates a new session record in the db
	CreateSession(accountID int, sessionKey string, sessionIndex sql.NullString, expirationDuration time.Duration) error
	// FetchPossiblyExpiredSession returns a session row by account ID regardless of wether it is expired
	// This is potentially dangerous, it is only intended to be used during the new login flow, never to check
	// on a valid session for authentication purposes.
	FetchPossiblyExpiredSession(accountID int) (Session, error)
	// DeleteSession removes a session record from the db
	DeleteSession(sessionKey string) error
	// ExtendAndFetchSessionAccount fetches an account and session data from the db
	ExtendAndFetchSessionAccount(sessionKey string, expirationDuration time.Duration) (Account, Session, error)

	// Close closes the db connection
	Close() error
}
