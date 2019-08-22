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
