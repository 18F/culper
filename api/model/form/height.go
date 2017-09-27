package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// Height is a basic input.
type Height struct {
	ID     int `json:"-"`
	Feet   int `json:"feet"`
	Inches int `json:"inches"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Height) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Height) Valid() (bool, error) {
	var stack model.ErrorStack

	if entity.Feet < 1 || entity.Feet > 9 {
		stack.Append("Feet", model.ErrFieldInvalid{"Feet must be between 1 and 9"})
	}

	if entity.Inches < 0 || entity.Inches > 11 {
		stack.Append("Inches", model.ErrFieldInvalid{"Inches must be between 0 an 11"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Height) Save(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Height) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Height) Get(context *db.DatabaseContext, account int) (int, error) {
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
