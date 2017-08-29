package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// NotApplicable is a basic input.
type NotApplicable struct {
	ID         int
	Applicable bool `json:"applicable"`
}

// Unmarshal bytes in to the entity properties.
func (entity *NotApplicable) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *NotApplicable) Valid() (bool, error) {
	return true, nil
}

func (entity *NotApplicable) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *NotApplicable) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *NotApplicable) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
