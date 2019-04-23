package api

import "encoding/json"

// CheckboxGroup is a basic input.
type CheckboxGroup struct {
	ID     int      `json:"-"`
	Values []string `json:"values"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CheckboxGroup) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *CheckboxGroup) Marshal() Payload {
	return MarshalPayloadEntity("checkboxgroup", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CheckboxGroup) Valid() (bool, error) {
	return true, nil
}

// Save the checkbox group to data storage.
func (entity *CheckboxGroup) Save(context DatabaseService, account int) (int, error) {
	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the checkbox group to data storage.
func (entity *CheckboxGroup) Delete(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the checkbox group to data storage.
func (entity *CheckboxGroup) Get(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *CheckboxGroup) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *CheckboxGroup) SetID(id int) {
	entity.ID = id
}

// Find is not used for checkbox groups. Please use the `Get` method.
func (entity *CheckboxGroup) Find(context DatabaseService) error {
	return nil
}
