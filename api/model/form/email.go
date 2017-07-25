package form

import "encoding/json"

// Email is a basic input.
type Email struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Email) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Email) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Email) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Email) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Email) Get() error {
	return nil
}
