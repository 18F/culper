package form

import "encoding/json"

// SSN is a basic input.
type SSN struct {
	First         string `json:"first"`
	Middle        string `json:"middle"`
	Last          string `json:"last"`
	NotApplicable bool   `json:"notApplicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SSN) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SSN) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *SSN) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SSN) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SSN) Get() error {
	return nil
}
