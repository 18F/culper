package api

import (
	"encoding/json"
)

// ClearanceLevel is a basic input.
type ClearanceLevel struct {
	PayloadLevel       Payload `json:"Level" sql:"-"`
	PayloadExplanation Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	Level       *Radio    `json:"-"`
	Explanation *Textarea `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	AccountID     int `json:"-"`
	LevelID       int `json:"-"`
	ExplanationID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ClearanceLevel) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	level, err := entity.PayloadLevel.Entity()
	if err != nil {
		return err
	}
	entity.Level = level.(*Radio)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *ClearanceLevel) Marshal() Payload {
	if entity.Level != nil {
		entity.PayloadLevel = entity.Level.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	return MarshalPayloadEntity("clearancelevel", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ClearanceLevel) Valid() (bool, error) {
	if ok, err := entity.Level.Valid(); !ok {
		return false, err
	}

	if entity.Level.Value == "Other" {
		if ok, err := entity.Explanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}
