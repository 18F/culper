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

// PayloadProperties is a structure of JSON where it is an object
// of named properties which each value being that of a Payload.
type PayloadProperties map[string]Payload

// Unmarshal basic payload structure.
func (payload *Payload) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, payload)
}

// Entity returns the appropriate entity as an interface
// based on its type.
func (payload Payload) Entity() (model.Entity, error) {
	if payload.Type == "" {
		return nil, errors.New("Empty payload")
	}

	entity := transform[payload.Type]()
	if entity == nil {
		return nil, errors.New("Could not determine a suitable type")
	}

	err := entity.Unmarshal(payload.Props)
	return entity, err
}
