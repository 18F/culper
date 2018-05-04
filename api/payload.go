package api

import (
	"encoding/json"
	"errors"
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

	entity, _ := transform[payload.Type]()
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

// Valid return whether the entity validates.
func (payload Payload) Valid() (bool, error) {
	entity, err := payload.Entity()
	if err != nil {
		return false, err
	}

	return entity.Valid()
}

// PayloadProperties is a structure of JSON where it is an object
// of named properties which each value being that of a Payload.
type PayloadProperties map[string]Payload

// Save the entity to data storage.
func (entity *PayloadProperties) Save(context DatabaseService, account int) (int, error) {
	return 0, nil
}

// Delete the entity from data storage.
func (entity *PayloadProperties) Delete(context DatabaseService, account int) (int, error) {
	return 0, nil
}

// Get the entity from data storage.
func (entity *PayloadProperties) Get(context DatabaseService, account int) (int, error) {
	return 0, nil
}
