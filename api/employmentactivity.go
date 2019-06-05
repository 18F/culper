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
