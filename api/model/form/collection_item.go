package form

import (
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// CollectionItem is an item of named payloads.
type CollectionItem struct {
	Item PayloadProperties `sql:"-"`

	ID           int    `json:"-"`
	CollectionID int    `json:"-"`
	Name         string `json:"-"`
	Table        string `json:"-"`
	ItemID       int    `json:"-"`
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

func (item CollectionItem) Save(context *db.DatabaseContext, account int, collectionID int) (int, error) {
	item.CollectionID = collectionID

	if err := context.CheckTable(item); err != nil {
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

func (item CollectionItem) Delete(context *db.DatabaseContext, account int, collectionID int) (int, error) {
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

	if err := context.CheckTable(item); err != nil {
		return item.ID, err
	}

	if item.ID != 0 {
		if err := context.Delete(item); err != nil {
			return item.ID, err
		}
	}

	return item.ID, nil
}

func (item CollectionItem) Get(context *db.DatabaseContext, account int, collectionID int) (int, error) {
	item.CollectionID = collectionID

	if err := context.CheckTable(item); err != nil {
		return item.ID, err
	}

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
