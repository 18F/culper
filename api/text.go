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

// Save the text to data storage.
func (entity *Text) Save(context DatabaseService, account int) (int, error) {
	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the text from data storage.
func (entity *Text) Delete(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the text from data storage.
func (entity *Text) Get(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Text) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Text) SetID(id int) {
	entity.ID = id
}

// Find is not used for text. Please use the `Get` method.
func (entity *Text) Find(context DatabaseService) error {
	return nil
}
