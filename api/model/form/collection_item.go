package form

import (
	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// CollectionItem is an item of named payloads.
type CollectionItem struct {
	Item PayloadProperties `sql:"-"`

	ID           int
	CollectionID int
	Name         string
	Table        string
	ItemID       int
}

// Valid iterates through each named property of an item validating
// each payload.
func (item CollectionItem) Valid() (bool, error) {
	var stack model.ErrorStack

	for k, v := range item.Item {
		entity, err := v.Entity()
		if err != nil {
			stack.Append(k, model.ErrFieldInvalid{"Could not deserialize property value"})
		} else {
			if ok, err := entity.Valid(); !ok {
				stack.Append(k, err)
			}
		}
	}

	return !stack.HasErrors(), stack
}

func (item CollectionItem) Save(context *pg.DB, account int64, collectionID int) (int, error) {
	item.CollectionID = collectionID

	for k, v := range item.Item {
		item.Name = k

		entity, err := v.Entity()
		if err != nil {
			return item.ID, err
		}

		id, err := entity.Save(context, account)
		if err != nil {
			return item.ID, err
		}
		item.ItemID = id
	}

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&CollectionItem{}, options); err != nil {
		return item.ID, err
	}

	if item.ID == 0 {
		err = context.Insert(item)
	} else {
		err = context.Update(item)
	}

	return item.ID, nil
}
