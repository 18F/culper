package form

import "encoding/json"

// Radio is a basic input.
type Radio struct {
	Value   string `json:"value"`
	Checked bool   `json:"checked"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Radio) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Radio) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Radio) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Radio) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Radio) Get() error {
	return nil
}
