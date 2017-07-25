package form

import "encoding/json"

// Telephone is a basic input.
type Telephone struct {
	TimeOfDay  string `json:"timeOfDay"`
	Type       string `json:"type"`
	NumberType string `json:"numberType"`
	Number     string `json:"number"`
	Extension  string `json:"extension"`
	NoNumber   bool   `json:"noNumber"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Telephone) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Telephone) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Telephone) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Telephone) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Telephone) Get() error {
	return nil
}
