package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// ReasonLeft is a basic input.
type ReasonLeft struct {
	ID                int
	Comments          Payload
	Reasons           Payload
	ReasonDescription Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ReasonLeft) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ReasonLeft) Valid() (bool, error) {
	if ok, err := entity.ReasonDescription.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Reasons.Valid(); !ok {
		return false, err
	}

	return true, nil
}

func (entity *ReasonLeft) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *ReasonLeft) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *ReasonLeft) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
