package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// ClearanceLevel is a basic input.
type ClearanceLevel struct {
	ID          int
	Level       Payload
	Explanation Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ClearanceLevel) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ClearanceLevel) Valid() (bool, error) {
	level, err := entity.Level.Entity()
	if err != nil {
		return false, err
	}

	if level.(*Radio).Value == "Other" {
		if ok, err := entity.Explanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}

func (entity *ClearanceLevel) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *ClearanceLevel) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *ClearanceLevel) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
