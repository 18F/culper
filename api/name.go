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
	LastInitialOnly   bool   `json:"lastInitialOnly"`
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
	} else if entity.LastInitialOnly && len(last) > 1 {
		stack.Append("Last", ErrFieldInvalid{"Last name should be an initial only"})
	}

	suffix := strings.TrimSpace(entity.Suffix)
	if suffix != "" {
		if suffix == "Other" && strings.TrimSpace(entity.SuffixOther) == "" {
			stack.Append("Suffix", ErrFieldRequired{"Suffix is required"})
		}
	}

	return !stack.HasErrors(), stack
}

// Save the name to data storage.
func (entity *Name) Save(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the name from data storage.
func (entity *Name) Delete(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the name from data storage.
func (entity *Name) Get(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Name) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Name) SetID(id int) {
	entity.ID = id
}

// Find is not used for names. Please use the `Get` method.
func (entity *Name) Find(context DatabaseService) error {
	return nil
}
