package api

import (
	"encoding/json"
	"strings"
)

// Branch is a basic yes/no input.
type Branch struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Branch) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Branch) Marshal() Payload {
	return MarshalPayloadEntity("branch", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Branch) Valid() (bool, error) {
	var stack ErrorStack

	trimmed := strings.TrimSpace(string(entity.Value))
	if trimmed == "" {
		stack.Append("Branch", ErrFieldRequired{"Branch value is required"})
	}

	if trimmed != "Yes" && trimmed != "No" {
		stack.Append("Branch", ErrFieldInvalid{"Invalid value for branch"})
	}

	return !stack.HasErrors(), stack
}

// Save the Branch entity.
func (entity *Branch) Save(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the Branch entity.
func (entity *Branch) Delete(context DatabaseService, account int) (int, error) {
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

// Get the Branch entity.
func (entity *Branch) Get(context DatabaseService, account int) (int, error) {
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
func (entity *Branch) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Branch) SetID(id int) {
	entity.ID = id
}

func (entity *Branch) Find(context DatabaseService) error {
	return nil
}
