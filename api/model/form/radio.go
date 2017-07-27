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
