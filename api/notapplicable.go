package api

import "encoding/json"

// NotApplicable is a basic input.
type NotApplicable struct {
	ID         int  `json:"-"`
	Applicable bool `json:"applicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *NotApplicable) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *NotApplicable) Marshal() Payload {
	return MarshalPayloadEntity("notapplicable", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *NotApplicable) Valid() (bool, error) {
	return true, nil
}
