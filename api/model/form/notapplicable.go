package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
)

// NotApplicable is a basic input.
type NotApplicable struct {
	ID         int  `json:"-"`
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

func (entity *NotApplicable) Save(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *NotApplicable) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *NotApplicable) Get(context *db.DatabaseContext, account int) (int, error) {
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
