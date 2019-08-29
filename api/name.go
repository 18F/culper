package api

import (
	"encoding/json"
)

// Name is a basic input.
type Name struct {
	ID                int    `json:"-"`
	First             string `json:"first"`
	FirstInitialOnly  bool   `json:"firstInitialOnly"`
	Middle            string `json:"middle"`
	MiddleInitialOnly bool   `json:"middleInitialOnly"`
	NoMiddleName      bool   `json:"noMiddleName"`
	Last              string `json:"last"`
	Suffix            string `json:"suffix"`
	SuffixOther       string `json:"suffixOther"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Name) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Name) Marshal() Payload {
	return MarshalPayloadEntity("name", entity)
}
