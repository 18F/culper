package api

import (
	"encoding/json"
)

// Email is a basic input.
type Email struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Email) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Email) Marshal() Payload {
	return MarshalPayloadEntity("email", entity)
}
