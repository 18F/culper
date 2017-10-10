package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
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
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&CheckboxGroup{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *CheckboxGroup) Delete(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&CheckboxGroup{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *CheckboxGroup) Get(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&CheckboxGroup{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	return entity.ID, err
}
