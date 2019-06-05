package api

import (
	"encoding/json"
	"net/mail"
	"strings"
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

// Valid checks the value(s) against an battery of tests.
func (entity *Email) Valid() (bool, error) {
	var stack ErrorStack

	if strings.TrimSpace(entity.Value) == "" {
		stack.Append("Email", ErrFieldRequired{"Email is required"})
	} else if _, err := mail.ParseAddress(entity.Value); err != nil {
		stack.Append("Email", ErrFieldInvalid{"Email is not correctly formatted"})
	}

	return !stack.HasErrors(), stack
}
