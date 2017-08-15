package form

import "encoding/json"

// ClearanceLevel is a basic input.
type ClearanceLevel struct {
	Level       Payload
	Explanation Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ClearanceLevel) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ClearanceLevel) Valid() (bool, error) {
	level, err := entity.Level.Entity()
	if err != nil {
		return false, err
	}

	if level.(*Radio).Value == "Other" {
		if ok, err := entity.Explanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}
