package api

import (
	"encoding/json"

	"github.com/pkg/errors"
)

// Payload is a basic structure to encapsulate a generic structure.
type Payload struct {
	Type  string          `json:"type"`
	Props json.RawMessage `json:"props,omitempty"`
}

// Unmarshal basic payload structure.
func (payload *Payload) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, payload)
}

// MarshalPayloadEntity basic payload structure with an entity.
func MarshalPayloadEntity(typeName string, entity Entity) Payload {
	props, _ := json.Marshal(entity)
	return Payload{
		Type:  typeName,
		Props: props,
	}
}

// Entity returns the appropriate entity as an interface
// based on its type.
func (payload Payload) Entity() (Entity, error) {
	if payload.Type == "" {
		return nil, errors.New("Empty payload")
	}

	entityfunc, ok := transform[payload.Type]
	if !ok {
		if payload.Type == "metadata" {
			return nil, errors.New("Cannot create entity from metadata section")
		}
		return nil, errors.New("Could not determine a suitable type")
	}

	entity, _ := entityfunc()
	if entity == nil {
		return nil, errors.New("Could not determine a suitable type")
	}

	// If there is a payload present we want to try and unmarshal it
	if payload.Props != nil {
		if err := entity.Unmarshal(payload.Props); err != nil {
			return entity, err
		}
	}

	return entity, nil
}

// SafeEntity returns the appropriate entity as an interface
// based on its type and is at the section level.
func (payload Payload) SafeEntity() (Entity, error) {
	if payload.Type == "" {
		return nil, errors.New("Empty payload")
	}

	entity, safe := transform[payload.Type]()
	if entity == nil || !safe {
		return nil, errors.New("Could not determine a suitable type")
	}

	// If there is a payload present we want to try and unmarshal it
	if payload.Props != nil {
		if err := entity.Unmarshal(payload.Props); err != nil {
			return entity, err
		}
	}

	return entity, nil
}

// UnmarshalEntity returns the appropriate entity as an interface
// based on its type.
func (payload Payload) UnmarshalEntity(raw []byte) (Entity, error) {
	// Deserialize the initial payload from a JSON structure
	if err := payload.Unmarshal(raw); err != nil {
		return nil, err
	}

	// Extract the entity interface of the payload and validate it
	return payload.Entity()
}
