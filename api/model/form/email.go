package form

import (
	"encoding/json"
	"net/mail"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
)

// Email is a basic input.
type Email struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Email) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Email) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(entity.Value) == "" {
		stack.Append("Email", model.ErrFieldRequired{"Email is required"})
	} else if _, err := mail.ParseAddress(entity.Value); err != nil {
		stack.Append("Email", model.ErrFieldInvalid{"Email is not correctly formatted"})
	}

	return !stack.HasErrors(), stack
}
