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

// ClearNo resets a "no" answer to unset
func (entity *Branch) ClearNo() {
	if entity != nil {
		if entity.Value == "No" {
			entity.Value = ""
		}
	}
}
