package api

import (
	"encoding/json"
)

// Number is a basic input.
type Number struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Number) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Number) Marshal() Payload {
	return MarshalPayloadEntity("number", entity)
}
