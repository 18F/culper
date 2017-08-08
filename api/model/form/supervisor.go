package form

import "encoding/json"

// Supervisor is a basic input.
type Supervisor struct {
	SupervisorName     Payload
	Title              Payload
	Email              Payload
	EmailNotApplicable Payload
	Address            Payload
	Telephone          Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *Supervisor) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Supervisor) Valid() (bool, error) {
	if ok, err := entity.SupervisorName.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Title.Valid(); !ok {
		return false, err
	}

	na, err := entity.EmailNotApplicable.Entity()
	if err != nil {
		return false, err
	}

	if na.(*NotApplicable).Applicable {
		if ok, err := entity.Email.Valid(); !ok {
			return false, err
		}
	}

	if ok, err := entity.Address.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Telephone.Valid(); !ok {
		return false, err
	}

	return true, nil
}
