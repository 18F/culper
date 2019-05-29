package api

import "encoding/json"

// Radio is a basic input.
type Radio struct {
	ID      int    `json:"-"`
	Value   string `json:"value"`
	Checked bool   `json:"checked,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Radio) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Radio) Marshal() Payload {
	return MarshalPayloadEntity("radio", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Radio) Valid() (bool, error) {
	return true, nil
}
