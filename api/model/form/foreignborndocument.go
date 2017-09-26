package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// ForeignBornDocument is a basic input.
type ForeignBornDocument struct {
	PayloadDocumentType                    Payload `json:"DocumentType" sql:"-"`
	PayloadOtherExplanation                Payload `json:"OtherExplanation" sql:"-"`
	PayloadDocumentNumber                  Payload `json:"DocumentNumber" sql:"-"`
	PayloadDocumentExpiration              Payload `json:"DocumentExpiration" sql:"-"`
	PayloadDocumentExpirationNotApplicable Payload `json:"DocumentExpirationNotApplicable" sql:"-"`

	// Validator specific fields
	DocumentType                    *Radio         `json:"-"`
	OtherExplanation                *Textarea      `json:"-"`
	DocumentNumber                  *Text          `json:"-"`
	DocumentExpiration              *DateControl   `json:"-"`
	DocumentExpirationNotApplicable *NotApplicable `json:"-"`

	// Persister specific fields
	ID                                int   `json:"-"`
	AccountID                         int64 `json:"-"`
	DocumentTypeID                    int   `json:"-"`
	OtherExplanationID                int   `json:"-"`
	DocumentNumberID                  int   `json:"-"`
	DocumentExpirationID              int   `json:"-"`
	DocumentExpirationNotApplicableID int   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBornDocument) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	documentType, err := entity.PayloadDocumentType.Entity()
	if err != nil {
		return err
	}
	entity.DocumentType = documentType.(*Radio)

	otherExplanation, err := entity.PayloadOtherExplanation.Entity()
	if err != nil {
		return err
	}
	entity.OtherExplanation = otherExplanation.(*Textarea)

	documentNumber, err := entity.PayloadDocumentNumber.Entity()
	if err != nil {
		return err
	}
	entity.DocumentNumber = documentNumber.(*Text)

	documentExpiration, err := entity.PayloadDocumentExpiration.Entity()
	if err != nil {
		return err
	}
	entity.DocumentExpiration = documentExpiration.(*DateControl)

	documentExpirationNotApplicable, err := entity.PayloadDocumentExpirationNotApplicable.Entity()
	if err != nil {
		return err
	}
	entity.DocumentExpirationNotApplicable = documentExpirationNotApplicable.(*NotApplicable)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBornDocument) Valid() (bool, error) {
	if entity.DocumentType.Value == "Other" {
		if ok, err := entity.OtherExplanation.Valid(); !ok {
			return false, err
		}
	}

	if entity.DocumentExpirationNotApplicable.Applicable {
		if ok, err := entity.DocumentNumber.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}

func (entity *ForeignBornDocument) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	err = context.CreateTable(&ForeignBornDocument{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	documentTypeID, err := entity.DocumentType.Save(context, account)
	if err != nil {
		return documentTypeID, err
	}
	entity.DocumentTypeID = documentTypeID

	otherExplanationID, err := entity.OtherExplanation.Save(context, account)
	if err != nil {
		return otherExplanationID, err
	}
	entity.OtherExplanationID = otherExplanationID

	documentNumberID, err := entity.DocumentNumber.Save(context, account)
	if err != nil {
		return documentNumberID, err
	}
	entity.DocumentNumberID = documentNumberID

	documentExpirationID, err := entity.DocumentExpiration.Save(context, account)
	if err != nil {
		return documentExpirationID, err
	}
	entity.DocumentExpirationID = documentExpirationID

	documentExpirationNotApplicableID, err := entity.DocumentExpirationNotApplicable.Save(context, account)
	if err != nil {
		return documentExpirationNotApplicableID, err
	}
	entity.DocumentExpirationNotApplicableID = documentExpirationNotApplicableID

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *ForeignBornDocument) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBornDocument{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.DocumentType.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.OtherExplanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.DocumentNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.DocumentExpiration.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.DocumentExpirationNotApplicable.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *ForeignBornDocument) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBornDocument{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.DocumentTypeID != 0 {
		if _, err := entity.DocumentType.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.OtherExplanationID != 0 {
		if _, err := entity.OtherExplanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentNumberID != 0 {
		if _, err := entity.DocumentNumber.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentExpirationID != 0 {
		if _, err := entity.DocumentExpiration.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DocumentExpirationNotApplicableID != 0 {
		if _, err := entity.DocumentExpirationNotApplicable.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
