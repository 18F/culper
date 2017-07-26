package form

import (
	"encoding/json"
	"strconv"
	"strings"
)

// Number is a basic input.
type Number struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Number) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Number) Valid() (bool, error) {
	var stack ErrorStack

	if strings.TrimSpace(entity.Value) == "" {
		stack.Append("Number", ErrFieldRequired{"Number is required"})
	} else if _, err := strconv.Atoi(entity.Value); err != nil {
		stack.Append("Number", ErrFieldInvalid{"Invalid number"})
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *Number) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Number) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Number) Get() error {
	return nil
}
