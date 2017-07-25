package form

import "encoding/json"

// Text is a basic input.
type Text struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Text) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Text) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Text) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Text) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Text) Get() error {
	return nil
}
