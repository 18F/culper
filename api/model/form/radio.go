package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// Radio is a basic input.
type Radio struct {
	ID      int
	Value   string `json:"value"`
	Checked bool   `json:"checked,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Radio) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Radio) Valid() (bool, error) {
	return true, nil
}

func (entity *Radio) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Radio) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Radio) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
