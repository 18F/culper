package api

import (
	"encoding/json"
	"strconv"
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
