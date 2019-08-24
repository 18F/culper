package api

import (
	"encoding/json"
)

// Text is a basic input.
type Text struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Text) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Text) Marshal() Payload {
	return MarshalPayloadEntity("text", entity)
}
