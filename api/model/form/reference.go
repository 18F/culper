package form

import "encoding/json"

// Reference is a basic input.
type Reference struct {
	FullName           Payload
	LastContact        Payload
	Relationship       Payload
	RelationshipOther  Payload
	Phone              Payload
	Email              Payload
	EmailNotApplicable Payload
	Address            Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *Reference) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Reference) Valid() (bool, error) {
	if ok, err := entity.FullName.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.LastContact.Valid(); !ok {
		return false, err
	}

	r, err := entity.Relationship.Entity()
	if err != nil {
		return false, err
	}

	values := r.(*CheckboxGroup).Values
	l := len(values)
	for i := 0; i < l; i++ {
		v := values[i]
		if v == "Other" {
			if ok, err := entity.RelationshipOther.Valid(); !ok {
				return false, err
			}
		}
	}

	if ok, err := entity.Phone.Valid(); !ok {
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

	return true, nil
}
