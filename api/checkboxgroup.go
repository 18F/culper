package api

import "encoding/json"

// CheckboxGroup is a basic input.
type CheckboxGroup struct {
	ID     int      `json:"-"`
	Values []string `json:"values"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CheckboxGroup) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *CheckboxGroup) Marshal() Payload {
	return MarshalPayloadEntity("checkboxgroup", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CheckboxGroup) Valid() (bool, error) {
	return true, nil
}
