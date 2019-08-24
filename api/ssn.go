package api

import (
	"encoding/json"
)

// SSN is a basic input.
type SSN struct {
	ID            int    `json:"-"`
	First         string `json:"first"`
	Middle        string `json:"middle"`
	Last          string `json:"last"`
	NotApplicable bool   `json:"notApplicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SSN) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *SSN) Marshal() Payload {
	return MarshalPayloadEntity("ssn", entity)
}
