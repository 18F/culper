package form

import "encoding/json"

// Textarea is a basic input.
type Textarea struct {
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Textarea) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Textarea) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Textarea) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Textarea) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Textarea) Get() error {
	return nil
}
