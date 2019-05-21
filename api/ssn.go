package api

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
)

// SSN is a basic input.
type SSN struct {
	ID            int    `json:"-"`
	First         string `json:"first"`
	Middle        string `json:"middle"`
	Last          string `json:"last"`
	NotApplicable bool   `json:"notApplicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *SSN) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *SSN) Marshal() Payload {
	return MarshalPayloadEntity("ssn", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SSN) Valid() (bool, error) {
	if entity.NotApplicable {
		return true, nil
	}

	var stack ErrorStack

	first := strings.TrimSpace(entity.First)
	if first == "" {
		stack.Append("SSN", ErrFieldRequired{"The first part is required"})
	} else if len(first) != 3 {
		stack.Append("SSN", ErrFieldInvalid{"The first part should be 3 characters long"})
	}

	middle := strings.TrimSpace(entity.Middle)
	if middle == "" {
		stack.Append("SSN", ErrFieldRequired{"The middle part is required"})
	} else if len(middle) != 2 {
		stack.Append("SSN", ErrFieldInvalid{"The middle part should be 2 characters long"})
	}

	last := strings.TrimSpace(entity.Last)
	if last == "" {
		stack.Append("SSN", ErrFieldRequired{"The last part is required"})
	} else if len(last) != 4 {
		stack.Append("SSN", ErrFieldInvalid{"The last part should be 4 characters long"})
	}

	// Legacy system checks
	fullSSN := fmt.Sprintf("%s-%s-%s", entity.First, entity.Middle, entity.Last)
	legacyInvalid := []string{"999-99-9999", "123-45-6789"}
	for _, bad := range legacyInvalid {
		if bad == fullSSN {
			stack.Append("SSN", ErrFieldInvalid{"Invalid social security number"})
		}
	}

	// Checks using randomization
	if ifirst, err := strconv.Atoi(first); err == nil {
		boundaries := []struct {
			lower int
			upper int
		}{
			{lower: 0, upper: 0},
			{lower: 666, upper: 666},
			{lower: 900, upper: 999},
		}
		for _, boundary := range boundaries {
			if boundary.lower <= ifirst && boundary.upper >= ifirst {
				stack.Append("SSN", ErrFieldInvalid{"Invalid social security number"})
				break
			}
		}
	}

	return !stack.HasErrors(), stack
}
