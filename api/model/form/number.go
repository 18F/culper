package form

import (
	"encoding/json"
	"strconv"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
)

// Number is a basic input.
type Number struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Number) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Number) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(entity.Value) == "" {
		stack.Append("Number", model.ErrFieldRequired{"Number is required"})
	} else if _, err := strconv.Atoi(entity.Value); err != nil {
		stack.Append("Number", model.ErrFieldInvalid{"Invalid number"})
	}

	return !stack.HasErrors(), stack
}
