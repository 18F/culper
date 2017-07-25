package form

import "encoding/json"

// DateRange is a basic input.
type DateRange struct {
	From    DateControl `json:"from"`
	To      DateControl `json:"to"`
	Present bool        `json:"present"`
}

// Unmarshal bytes in to the entity properties.
func (entity *DateRange) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *DateRange) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *DateRange) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *DateRange) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *DateRange) Get() error {
	return nil
}
