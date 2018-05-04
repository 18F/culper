package api

import (
	"encoding/json"
	"strings"
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

// Valid checks the value(s) against an battery of tests.
func (entity *Textarea) Valid() (bool, error) {
	var stack ErrorStack

	if strings.TrimSpace(string(entity.Value)) == "" {
		stack.Append("Textarea", ErrFieldRequired{"Text is required"})
	}

	return !stack.HasErrors(), stack
}

// Save the textarea to data storage.
func (entity *Textarea) Save(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the textarea from data storage.
func (entity *Textarea) Delete(context DatabaseService, account int) (int, error) {
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

// Get the textarea from data storage.
func (entity *Textarea) Get(context DatabaseService, account int) (int, error) {
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
func (entity *Textarea) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Textarea) SetID(id int) {
	entity.ID = id
}

// Find is not used for attachments. Please use the `Get` method.
func (entity *Textarea) Find(context DatabaseService) error {
	return nil
}
