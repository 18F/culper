package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// Textarea is a basic input.
type Textarea struct {
	ID    int
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Textarea) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Textarea) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(string(entity.Value)) == "" {
		stack.Append("Textarea", model.ErrFieldRequired{"Text is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Textarea) Save(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Textarea{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *Textarea) Delete(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Textarea{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *Textarea) Get(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Textarea{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	return entity.ID, err
}
