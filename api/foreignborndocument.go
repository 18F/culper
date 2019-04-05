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

// Save the ForeignBornDocument entity.
func (entity *ForeignBornDocument) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the ForeignBornDocument entity.
func (entity *ForeignBornDocument) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.DocumentType.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.OtherExplanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentExpiration.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DocumentExpirationNotApplicable.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get the ForeignBornDocument entity.
func (entity *ForeignBornDocument) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *ForeignBornDocument) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBornDocument) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBornDocument) Find(context DatabaseService) error {
	context.Find(&ForeignBornDocument{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*ForeignBornDocument)
		if entity.DocumentType == nil {
			entity.DocumentType = &Radio{}
		}
		entity.DocumentType.ID = previous.DocumentTypeID
		entity.DocumentTypeID = previous.DocumentTypeID
		if entity.OtherExplanation == nil {
			entity.OtherExplanation = &Textarea{}
		}
		entity.OtherExplanation.ID = previous.OtherExplanationID
		entity.OtherExplanationID = previous.OtherExplanationID
		if entity.DocumentNumber == nil {
			entity.DocumentNumber = &Text{}
		}
		entity.DocumentNumber.ID = previous.DocumentNumberID
		entity.DocumentNumberID = previous.DocumentNumberID
		if entity.DocumentExpiration == nil {
			entity.DocumentExpiration = &DateControl{}
		}
		entity.DocumentExpiration.ID = previous.DocumentExpirationID
		entity.DocumentExpirationID = previous.DocumentExpirationID
		if entity.DocumentExpirationNotApplicable == nil {
			entity.DocumentExpirationNotApplicable = &NotApplicable{}
		}
		entity.DocumentExpirationNotApplicable.ID = previous.DocumentExpirationNotApplicableID
		entity.DocumentExpirationNotApplicableID = previous.DocumentExpirationNotApplicableID
	})
	return nil
}
