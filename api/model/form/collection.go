package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

// CollectionItem is an item of named payloads.
type CollectionItem struct {
	Item PayloadProperties
}

// Valid iterates through each named property of an item validating
// each payload.
func (item CollectionItem) Valid() (bool, error) {
	var stack model.ErrorStack

	for k, v := range item.Item {
		entity, err := v.Entity()
		if err != nil {
			stack.Append(k, model.ErrFieldInvalid{"Could not deserialize property value"})
		} else {
			if ok, err := entity.Valid(); !ok {
				stack.Append(k, err)
			}
		}
	}

	return !stack.HasErrors(), stack
}

// Collection represents a structure composed of items in a structured
// format.
type Collection struct {
	Branch Payload          `json:"branch,omitempty"`
	Items  []CollectionItem `json:"items"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Collection) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Collection) Valid() (bool, error) {
	var stack model.ErrorStack

	// Iterate through each property in `Items` validating them as we go.
	for _, item := range entity.Items {
		if ok, err := item.Valid(); !ok {
			stack.Append("Item", err)
		}
	}

	// Custom errors
	eb, err := entity.Branch.Entity()
	if err == nil {
		if ok, err := eb.Valid(); !ok {
			stack.Append("Item", err)
		} else {
			if eb.(*Branch).Value != "No" {
				stack.Append("Collection", model.ErrFieldInvalid{"Collection branch value is required"})
			}
		}
	}

	return !stack.HasErrors(), stack
}
