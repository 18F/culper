package api

import "encoding/json"

// Country is a basic input.
type Country struct {
	ID       int      `json:"-"`
	Value    []string `json:"value" pg:",array"`
	Comments string   `json:"comments,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Country) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Country) Marshal() Payload {
	return MarshalPayloadEntity("country", entity)
}
