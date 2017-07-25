package form

import "encoding/json"

// NotApplicable is a basic input.
type NotApplicable struct {
	Applicable bool `json:"applicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *NotApplicable) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *NotApplicable) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *NotApplicable) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *NotApplicable) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *NotApplicable) Get() error {
	return nil
}
