package api

import (
	"encoding/json"
	"strings"
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

// Valid checks the value(s) against an battery of tests.
func (entity *Text) Valid() (bool, error) {
	var stack ErrorStack

	if strings.TrimSpace(string(entity.Value)) == "" {
		stack.Append("Text", ErrFieldRequired{"Text is required"})
	}

	return !stack.HasErrors(), stack
}
