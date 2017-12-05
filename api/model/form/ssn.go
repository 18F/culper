package form

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
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

	var stack model.ErrorStack

	first := strings.TrimSpace(entity.First)
	if first == "" {
		stack.Append("SSN", model.ErrFieldRequired{"The first part is required"})
	} else if len(first) != 3 {
		stack.Append("SSN", model.ErrFieldInvalid{"The first part should be 3 characters long"})
	}

	middle := strings.TrimSpace(entity.Middle)
	if middle == "" {
		stack.Append("SSN", model.ErrFieldRequired{"The middle part is required"})
	} else if len(middle) != 2 {
		stack.Append("SSN", model.ErrFieldInvalid{"The middle part should be 2 characters long"})
	}

	last := strings.TrimSpace(entity.Last)
	if last == "" {
		stack.Append("SSN", model.ErrFieldRequired{"The last part is required"})
	} else if len(last) != 4 {
		stack.Append("SSN", model.ErrFieldInvalid{"The last part should be 4 characters long"})
	}

	// Legacy system checks
	fullSSN := fmt.Sprintf("%s-%s-%s", entity.First, entity.Middle, entity.Last)
	legacyInvalid := []string{"999-99-9999", "123-45-6789"}
	for _, bad := range legacyInvalid {
		if bad == fullSSN {
			stack.Append("SSN", model.ErrFieldInvalid{"Invalid social security number"})
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
				stack.Append("SSN", model.ErrFieldInvalid{"Invalid social security number"})
				break
			}
		}
	}

	return !stack.HasErrors(), stack
}

func (entity *SSN) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *SSN) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *SSN) Get(context *db.DatabaseContext, account int) (int, error) {
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

// ID returns the entity identifier.
func (entity *SSN) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SSN) SetID(id int) {
	entity.ID = id
}
