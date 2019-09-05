package api

import (
	"encoding/json"
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

// ClearNo resets a "no" answer to unset
func (entity *Branch) ClearNo() {
	if entity != nil {
		if entity.Value == "No" {
			entity.Value = ""
		}
	}
}
