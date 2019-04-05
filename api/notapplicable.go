package api

import "encoding/json"

// NotApplicable is a basic input.
type NotApplicable struct {
	ID         int  `json:"-"`
	Applicable bool `json:"applicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *NotApplicable) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *NotApplicable) Marshal() Payload {
	return MarshalPayloadEntity("notapplicable", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *NotApplicable) Valid() (bool, error) {
	return true, nil
}

// Save the entity to data storage.
func (entity *NotApplicable) Save(context DatabaseService, account int) (int, error) {
	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the entity from data storage.
func (entity *NotApplicable) Delete(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the entity from data storage.
func (entity *NotApplicable) Get(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *NotApplicable) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *NotApplicable) SetID(id int) {
	entity.ID = id
}

// Find is not used for not applicable values. Please use the `Get` method.
func (entity *NotApplicable) Find(context DatabaseService) error {
	return nil
}
