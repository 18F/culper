package api

import "encoding/json"

// Height is a basic input.
type Height struct {
	ID     int `json:"-"`
	Feet   int `json:"feet"`
	Inches int `json:"inches"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Height) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Height) Marshal() Payload {
	return MarshalPayloadEntity("height", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Height) Valid() (bool, error) {
	var stack ErrorStack

	if entity.Feet < 1 || entity.Feet > 9 {
		stack.Append("Feet", ErrFieldInvalid{"Feet must be between 1 and 9"})
	}

	if entity.Inches < 0 || entity.Inches > 11 {
		stack.Append("Inches", ErrFieldInvalid{"Inches must be between 0 an 11"})
	}

	return !stack.HasErrors(), stack
}
