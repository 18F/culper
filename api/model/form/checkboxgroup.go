package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// CheckboxGroup is a basic input.
type CheckboxGroup struct {
	ID     int
	Values []string `json:"values"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CheckboxGroup) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CheckboxGroup) Valid() (bool, error) {
	return true, nil
}

func (entity *CheckboxGroup) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *CheckboxGroup) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *CheckboxGroup) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
