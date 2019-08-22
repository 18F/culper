package api

import "encoding/json"

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
	ID                                int `json:"-"`
	AccountID                         int `json:"-"`
	DocumentTypeID                    int `json:"-"`
	OtherExplanationID                int `json:"-"`
	DocumentNumberID                  int `json:"-"`
	DocumentExpirationID              int `json:"-"`
	DocumentExpirationNotApplicableID int `json:"-"`
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

// Marshal to payload structure
func (entity *ForeignBornDocument) Marshal() Payload {
	if entity.DocumentType != nil {
		entity.PayloadDocumentType = entity.DocumentType.Marshal()
	}
	if entity.OtherExplanation != nil {
		entity.PayloadOtherExplanation = entity.OtherExplanation.Marshal()
	}
	if entity.DocumentNumber != nil {
		entity.PayloadDocumentNumber = entity.DocumentNumber.Marshal()
	}
	if entity.DocumentExpiration != nil {
		entity.PayloadDocumentExpiration = entity.DocumentExpiration.Marshal()
	}
	if entity.DocumentExpirationNotApplicable != nil {
		entity.PayloadDocumentExpirationNotApplicable = entity.DocumentExpirationNotApplicable.Marshal()
	}
	return MarshalPayloadEntity("foreignborndocument", entity)
}
