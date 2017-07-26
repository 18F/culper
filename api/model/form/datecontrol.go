package form

import (
	"encoding/json"
	"strings"
	"time"
)

// DateControl is a basic input.
type DateControl struct {
	Month     string    `json:"month"`
	Day       string    `json:"day"`
	Year      string    `json:"year"`
	Estimated bool      `json:"estimated"`
	Date      time.Time `json:"date"`
}

// Unmarshal bytes in to the entity properties.
func (entity *DateControl) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
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

// Save will create or update the database.
func (entity *DateControl) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *DateControl) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *DateControl) Get() error {
	return nil
}
