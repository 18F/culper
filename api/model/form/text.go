package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
)

// Text is a basic input.
type Text struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Text) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Text) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(string(entity.Value)) == "" {
		stack.Append("Text", model.ErrFieldRequired{"Text is required"})
	}

	return !stack.HasErrors(), stack
}
