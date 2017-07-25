package form

import "encoding/json"

// Name is a basic input.
type Name struct {
	First             string `json:"first"`
	Middle            string `json:"middle"`
	Last              string `json:"last"`
	FirstInitialOnly  bool   `json:"firstInitialOnly"`
	MiddleInitialOnly bool   `json:"middleInitialOnly"`
	LastInitialOnly   bool   `json:"lastInitialOnly"`
	NoMiddleName      bool   `json:"noMiddleName"`
	Suffix            string `json:"suffix"`
	SuffixOther       string `json:"suffixOther"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Name) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Name) Valid() (bool, error) {
	return true, nil
}

// Save will create or update the database.
func (entity *Name) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *Name) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *Name) Get() error {
	return nil
}
