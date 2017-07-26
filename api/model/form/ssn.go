package form

import (
	"encoding/json"
	"strings"
)

// SSN is a basic input.
type SSN struct {
	First         string `json:"first"`
	Middle        string `json:"middle"`
	Last          string `json:"last"`
	NotApplicable bool   `json:"notApplicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SSN) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SSN) Valid() (bool, error) {
	if entity.NotApplicable {
		return true, nil
	}

	var stack ErrorStack

	first := strings.TrimSpace(entity.First)
	if first == "" {
		stack.Append("SSN", ErrFieldRequired{"The first part is required"})
	} else if len(first) != 3 {
		stack.Append("SSN", ErrFieldInvalid{"The first part should be 3 characters long"})
	}

	middle := strings.TrimSpace(entity.Middle)
	if middle == "" {
		stack.Append("SSN", ErrFieldRequired{"The middle part is required"})
	} else if len(middle) != 2 {
		stack.Append("SSN", ErrFieldInvalid{"The middle part should be 2 characters long"})
	}

	last := strings.TrimSpace(entity.Last)
	if last == "" {
		stack.Append("SSN", ErrFieldRequired{"The last part is required"})
	} else if len(last) != 4 {
		stack.Append("SSN", ErrFieldInvalid{"The last part should be 4 characters long"})
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SSN) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SSN) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SSN) Get() error {
	return nil
}
