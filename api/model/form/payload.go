package form

import (
	"encoding/json"
	"errors"

	"github.com/18F/e-QIP-prototype/api/model"
)

// Payload is a basic structure to encapsulate a generic structure.
type Payload struct {
	Type  string          `json:"type"`
	Props json.RawMessage `json:"props"`
}

// Unmarshal basic payload structure.
func (payload *Payload) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, payload)
}

// Entity returns the appropriate entity as an interface
// based on its type.
func (payload Payload) Entity() (model.Entity, error) {
	entity := transform[payload.Type]()
	if entity == nil {
		return nil, errors.New("Could not determine a suitable type")
	}

	err := entity.Unmarshal(payload.Props)
	return entity, err
}
