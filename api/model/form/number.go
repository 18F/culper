package form

import "encoding/json"

// Number is a basic input.
type Number struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Number) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Number) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Number) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Number) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Number) Get() error {
	return nil
}
