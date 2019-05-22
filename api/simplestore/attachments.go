package simplestore

import (
	"database/sql"

	_ "github.com/go-pg/pg" // pg is required for the sqlx package to work
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// CreateAttachment saves an attachment in the db
func (s SimpleStore) CreateAttachment(attachment *api.Attachment) error {
	metadata, body, serializeErr := s.serializer.SerializeAttachment(*attachment)
	if serializeErr != nil {
		return errors.Wrap(serializeErr, "Failed to serialize Attachment")
	}

	createQuery := "INSERT INTO attachments (account_id, metadata, body) VALUES ($1, $2, $3) RETURNING id"

	newID := -1

	createErr := s.db.Get(&newID, createQuery, attachment.AccountID, metadata, body)
	if createErr != nil {
		return errors.Wrap(createErr, "Failed to create Application")
	}

	attachment.ID = newID

	return nil
}

type attachmentRow struct {
	ID       int    `db:"id"`
	Metadata []byte `db:"metadata"`
	Body     []byte `db:"body"`
}

// LoadAttachment loads an attachment from the database
func (s SimpleStore) LoadAttachment(accountID int, attachmentID int) (api.Attachment, error) {

	selectQuery := `SELECT metadata, body FROM attachments
				WHERE account_id = $1 AND id = $2`

	row := attachmentRow{}
	selectErr := s.db.Get(&row, selectQuery, accountID, attachmentID)
	if selectErr != nil {
		if selectErr == sql.ErrNoRows {
			return api.Attachment{}, api.ErrAttachmentDoesNotExist
		}
		return api.Attachment{}, errors.Wrap(selectErr, "Couldn't find Attachment")
	}

	attachment, serializeErr := s.serializer.DeserializeAttachment(accountID, attachmentID, row.Metadata, row.Body)
	if serializeErr != nil {
		return api.Attachment{}, errors.Wrap(serializeErr, "Couldn't unmarshal the loaded Attachment")
	}

	return attachment, nil
}

// ListAttachmentsMetadata loads an attachment from the database
// NOTE, it does not fetch the body of the attachments, just the metadata
func (s SimpleStore) ListAttachmentsMetadata(accountID int) ([]api.Attachment, error) {

	selectQuery := `SELECT id, metadata FROM attachments WHERE account_id = $1`

	rows, selectErr := s.db.Queryx(selectQuery, accountID)
	if selectErr != nil {
		return []api.Attachment{}, errors.Wrap(selectErr, "Couldn't list Attachments")
	}

	attachments := []api.Attachment{}

	row := attachmentRow{}
	for rows.Next() {
		scanErr := rows.StructScan(&row)
		if scanErr != nil {
			return []api.Attachment{}, errors.Wrap(scanErr, "Failed to unpack an Attachment while listing.")
		}

		attachment, serializeErr := s.serializer.DeserializeAttachment(accountID, row.ID, row.Metadata, row.Body)
		if serializeErr != nil {
			return []api.Attachment{}, errors.Wrap(serializeErr, "Couldn't unmarshal the loaded Attachment")
		}

		attachments = append(attachments, attachment)

	}

	return attachments, nil
}

// DeleteAttachment deletes an attachment from the database
func (s SimpleStore) DeleteAttachment(accountID int, attachmentID int) error {

	deleteQuery := "DELETE FROM attachments WHERE account_id = $1 AND id = $2"

	result, delErr := s.db.Exec(deleteQuery, accountID, attachmentID)
	if delErr != nil {
		return errors.Wrap(delErr, "Failed to delete Attachment")
	}

	rows, affectedErr := result.RowsAffected()
	if affectedErr != nil {
		return errors.Wrap(affectedErr, "Bizzarely unable to read affected rows")
	}

	if rows != 1 {
		return api.ErrAttachmentDoesNotExist
	}

	return nil
}
