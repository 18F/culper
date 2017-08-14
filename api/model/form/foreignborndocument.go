package form

import "encoding/json"

// ForeignBornDocument is a basic input.
type ForeignBornDocument struct {
	DocumentType                    Payload
	OtherExplanation                Payload
	DocumentNumber                  Payload
	DocumentExpiration              Payload
	DocumentExpirationNotApplicable Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBornDocument) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBornDocument) Valid() (bool, error) {
	dt, err := entity.DocumentType.Entity()
	if err != nil {
		return false, err
	}

	if dt.(*Radio).Value == "Other" {
		if ok, err := entity.OtherExplanation.Valid(); !ok {
			return false, err
		}
	}

	na, err := entity.DocumentExpirationNotApplicable.Entity()
	if err != nil {
		return false, err
	}

	if na.(*NotApplicable).Applicable {
		if ok, err := entity.DocumentNumber.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}
