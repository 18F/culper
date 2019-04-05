package api

import (
	"encoding/json"
	"strings"
)

// EmploymentActivity is a basic input.
type EmploymentActivity struct {
	ID               int    `json:"-"`
	Value            string `json:"value"`
	OtherExplanation string `json:"otherExplanation,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *EmploymentActivity) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *EmploymentActivity) Marshal() Payload {
	return MarshalPayloadEntity("employmentactivity", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *EmploymentActivity) Valid() (bool, error) {
	var stack ErrorStack

	v := strings.TrimSpace(string(entity.Value))
	if v == "" {
		stack.Append("EmploymentActivity", ErrFieldRequired{"Value is required"})
	}

	if v == "Other" {
		if strings.TrimSpace(string(entity.OtherExplanation)) == "" {
			stack.Append("EmploymentActivity", ErrFieldRequired{"Other explanation is required"})
		}
	}

	return !stack.HasErrors(), stack
}

// Save the employment activity to data storage.
func (entity *EmploymentActivity) Save(context DatabaseService, account int) (int, error) {
	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the employment activity from data storage.
func (entity *EmploymentActivity) Delete(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the employment activity from data storage.
func (entity *EmploymentActivity) Get(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *EmploymentActivity) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *EmploymentActivity) SetID(id int) {
	entity.ID = id
}

// Find is not used for employment activities. Please use the `Get` method.
func (entity *EmploymentActivity) Find(context DatabaseService) error {
	return nil
}
