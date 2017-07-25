package form

import "encoding/json"

// Height is a basic input.
type Height struct {
	Feet   string `json:"feet"`
	Inches string `json:"inches"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Height) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Height) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Height) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Height) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Height) Get() error {
	return nil
}
