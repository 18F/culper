package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
)

// Branch is a basic yes/no input.
type Branch struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Branch) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Branch) Valid() (bool, error) {
	var stack model.ErrorStack

	trimmed := strings.TrimSpace(string(entity.Value))
	if trimmed == "" {
		stack.Append("Branch", model.ErrFieldRequired{"Branch value is required"})
	}

	if trimmed != "Yes" && trimmed != "No" {
		stack.Append("Branch", model.ErrFieldInvalid{"Invalid value for branch"})
	}

	return !stack.HasErrors(), stack
}
