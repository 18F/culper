package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// Country is a basic input.
type Country struct {
	ID    int
	Value []string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Country) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Country) Valid() (bool, error) {
	var stack model.ErrorStack

	if len(entity.Value) == 0 {
		stack.Append("Country", model.ErrFieldRequired{"Country is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Country) Save(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Country{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *Country) Delete(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Country{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *Country) Get(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Country{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	return entity.ID, err
}
