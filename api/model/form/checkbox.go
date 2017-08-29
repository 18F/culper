package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// Checkbox is a basic input.
type Checkbox struct {
	ID      int
	Value   string `json:"value"`
	Checked bool   `json:"checked,omitempty"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Checkbox) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Checkbox) Valid() (bool, error) {
	return true, nil
}

func (entity *Checkbox) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Checkbox) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Checkbox) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
