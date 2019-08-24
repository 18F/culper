package api

import (
	"encoding/json"
)

// Textarea is a basic input.
type Textarea struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Textarea) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Textarea) Marshal() Payload {
	return MarshalPayloadEntity("textarea", entity)
}
