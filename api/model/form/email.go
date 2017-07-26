package form

import (
	"encoding/json"
	"net/mail"
	"strings"
)

// Email is a basic input.
type Email struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Email) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
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

// Save will create or update the database.
func (entity *Email) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Email) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Email) Get() error {
	return nil
}
