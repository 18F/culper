package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

// Country is a basic input.
type Country struct {
	Value []string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Country) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Country) Valid() (bool, error) {
	var stack model.ErrorStack

	if len(entity.Value) == 0 {
		stack.Append("Country", model.ErrFieldRequired{"Country is required"})
	}

	return !stack.HasErrors(), stack
}
