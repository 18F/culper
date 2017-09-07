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

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&CollectionItem{}, options); err != nil {
		return item.ID, err
	}

	for k, v := range item.Item {
		newItem := &CollectionItem{
			CollectionID: collectionID,
			Name:         k,
		}

		entity, err := v.Entity()
		if err != nil {
			return item.ID, err
		}

		id, err := entity.Save(context, account)
		if err != nil {
			return item.ID, err
		}
		newItem.ItemID = id

		if newItem.ID == 0 {
			err = context.Insert(newItem)
		} else {
			err = context.Update(newItem)
		}

		if err != nil {
			return item.ID, err
		}
	}

	return item.ID, nil
}

func (item CollectionItem) Delete(context *pg.DB, account int64, collectionID int) (int, error) {
	item.CollectionID = collectionID

	for k, v := range item.Item {
		item.Name = k

		entity, err := v.Entity()
		if err != nil {
			return item.ID, err
		}

		id, err := entity.Delete(context, account)
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

	if item.ID != 0 {
		err = context.Delete(item)
	}

	return item.ID, err
}

func (item CollectionItem) Get(context *pg.DB, account int64, collectionID int) (int, error) {
	item.CollectionID = collectionID

	if item.ID != 0 {
		err := context.Select(item)
		if err != nil {
			return item.ID, err
		}
	}

	for k, v := range item.Item {
		item.Name = k

		entity, err := v.Entity()
		if err != nil {
			return item.ID, err
		}

		id, err := entity.Get(context, account)
		if err != nil {
			return item.ID, err
		}
		item.ItemID = id
	}

	return item.ID, nil
}
