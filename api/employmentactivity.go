package api

import (
	"encoding/json"
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
