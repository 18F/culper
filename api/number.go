package api

import (
	"encoding/json"
	"strconv"
	"strings"
)

// Number is a basic input.
type Number struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Number) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Number) Marshal() Payload {
	return MarshalPayloadEntity("number", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Number) Valid() (bool, error) {
	var stack ErrorStack

	if strings.TrimSpace(entity.Value) == "" {
		stack.Append("Number", ErrFieldRequired{"Number is required"})
	} else if _, err := strconv.Atoi(entity.Value); err != nil {
		stack.Append("Number", ErrFieldInvalid{"Invalid number"})
	}

	return !stack.HasErrors(), stack
}
