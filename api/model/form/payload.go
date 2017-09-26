package form

import (
	"encoding/json"
	"errors"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
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
	if payload.Type == "" {
		return nil, errors.New("Empty payload")
	}

	entity := transform[payload.Type]()
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

// // EntityPersister returns the appropriate entity as an interface
// // based on its type.
// func (payload Payload) EntityPersister() (model.EntityPersister, error) {
// 	if payload.Type == "" {
// 		return nil, errors.New("Empty payload")
// 	}

// 	entity := persister[payload.Type]()
// 	if entity == nil {
// 		return nil, errors.New("Could not determine a suitable type")
// 	}

// 	err := entity.Unmarshal(payload.Props)
// 	return entity, err
// }

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

func (entity *PayloadProperties) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *PayloadProperties) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *PayloadProperties) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
