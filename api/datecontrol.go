package api

import (
	"encoding/json"
	"strconv"
	"strings"
	"time"
)

// DateControl is a basic input.
type DateControl struct {
	ID        int    `json:"-"`
	Month     string `json:"month"`
	Day       string `json:"day"`
	Year      string `json:"year"`
	Estimated bool   `json:"estimated"`
}

// Date is composed from the structure properties
func (entity *DateControl) Date() time.Time {
	m, err := strconv.Atoi(entity.Month)
	if err != nil {
		return time.Time{}
	}

	d, err := strconv.Atoi(entity.Day)
	if err != nil {
		return time.Time{}
	}

	y, err := strconv.Atoi(entity.Year)
	if err != nil {
		return time.Time{}
	}

	return time.Date(y, time.Month(m), d, 0, 0, 0, 0, time.UTC)
}

// Unmarshal bytes in to the entity properties.
func (entity *DateControl) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *DateControl) Marshal() Payload {
	return MarshalPayloadEntity("datecontrol", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *DateControl) Valid() (bool, error) {
	var stack ErrorStack

	if strings.TrimSpace(entity.Month) == "" {
		stack.Append("Month", ErrFieldRequired{"Month is required"})
	}

	if strings.TrimSpace(entity.Day) == "" {
		if entity.Estimated {
			entity.Day = "15"
		} else {
			stack.Append("Day", ErrFieldRequired{"Day is required"})
		}
	}

	if strings.TrimSpace(entity.Year) == "" {
		stack.Append("Year", ErrFieldRequired{"Year is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *DateControl) Save(context DatabaseService, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *DateControl) Delete(context DatabaseService, account int) (int, error) {
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

func (entity *DateControl) Get(context DatabaseService, account int) (int, error) {
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
func (entity *DateControl) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *DateControl) SetID(id int) {
	entity.ID = id
}

func (entity *DateControl) Find(context DatabaseService) error {
	return nil
}
