package api

import (
	"encoding/json"
	"strings"
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

// Valid checks the value(s) against an battery of tests.
func (entity *Name) Valid() (bool, error) {
	var stack ErrorStack

	first := strings.TrimSpace(entity.First)
	if first == "" {
		stack.Append("First", ErrFieldRequired{"First name is required"})
	} else if entity.FirstInitialOnly && len(first) > 1 {
		stack.Append("First", ErrFieldInvalid{"First name should be an initial only"})
	}

	middle := strings.TrimSpace(entity.Middle)
	if entity.NoMiddleName && middle != "" {
		stack.Append("Middle", ErrFieldInvalid{"Middle name has a value when it should not"})
	} else if middle == "" {
		stack.Append("Middle", ErrFieldRequired{"Middle name is required"})
	} else if entity.MiddleInitialOnly && len(middle) > 1 {
		stack.Append("Middle", ErrFieldInvalid{"Middle name should be an initial only"})
	}

	last := strings.TrimSpace(entity.Last)
	if last == "" {
		stack.Append("Last", ErrFieldRequired{"Last name is required"})
	}

	suffix := strings.TrimSpace(entity.Suffix)
	if suffix != "" {
		if suffix == "Other" && strings.TrimSpace(entity.SuffixOther) == "" {
			stack.Append("Suffix", ErrFieldRequired{"Suffix is required"})
		}
	}

	return !stack.HasErrors(), stack
}
