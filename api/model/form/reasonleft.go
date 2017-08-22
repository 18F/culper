package form

import "encoding/json"

// ReasonLeft is a basic input.
type ReasonLeft struct {
	Comments          Payload
	Reasons           Payload
	ReasonDescription Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ReasonLeft) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ReasonLeft) Valid() (bool, error) {
	if ok, err := entity.ReasonDescription.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Reasons.Valid(); !ok {
		return false, err
	}

	return true, nil
}
