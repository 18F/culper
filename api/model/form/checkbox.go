package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
)

// Checkbox is a basic input.
type Checkbox struct {
	ID      int    `json:"-"`
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

func (entity *Checkbox) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *Checkbox) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Checkbox) Get(context *db.DatabaseContext, account int) (int, error) {
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
