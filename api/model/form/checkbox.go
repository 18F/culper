package form

import "encoding/json"

// Checkbox is a basic input.
type Checkbox struct {
	Value   string `json:"value"`
	Checked bool   `json:"checked"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Checkbox) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Checkbox) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Checkbox) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Checkbox) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Checkbox) Get() error {
	return nil
}
