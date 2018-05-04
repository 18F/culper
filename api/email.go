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

// Save the email to data storage.
func (entity *Email) Save(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the email from data storage.
func (entity *Email) Delete(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the email from data storage.
func (entity *Email) Get(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Email) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Email) SetID(id int) {
	entity.ID = id
}

// Find is not used for emails. Please use the `Get` method.
func (entity *Email) Find(context DatabaseService) error {
	return nil
}
