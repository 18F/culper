package form

import (
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// CivilUnion is an item of named payloads.
type CivilUnion struct {
	Items PayloadProperties `sql:"-"`

	ID        int    `json:"-"`
	AccountID int    `json:"-"`
	Name      string `json:"-"`
	Table     string `json:"-"`
	ItemID    int    `json:"-"`
}

// Valid iterates through each named property of an item validating
// each payload.
func (entity *CivilUnion) Valid() (bool, error) {
	var stack model.ErrorStack

	for k, v := range entity.Items {
		propertyEntity, err := v.Entity()
		if err != nil {
			stack.Append(k, model.ErrFieldInvalid{"Could not deserialize property value"})
		} else {
			if ok, err := propertyEntity.Valid(); !ok {
				stack.Append(k, err)
			}
		}
	}

	return !stack.HasErrors(), stack
}

func (entity *CivilUnion) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	for k, v := range entity.Items {
		newItem := &CivilUnion{
			AccountID: account,
			Name:      k,
		}

		propertyEntity, err := v.Entity()
		if err != nil {
			return entity.ID, err
		}

		id, err := propertyEntity.Save(context, account)
		if err != nil {
			return entity.ID, err
		}
		newItem.ItemID = id

		if newItem.ID == 0 {
			err = context.Insert(newItem)
		} else {
			err = context.Update(newItem)
		}

		if err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *CivilUnion) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	for k, v := range entity.Items {
		entity.Name = k

		propertyEntity, err := v.Entity()
		if err != nil {
			return entity.ID, err
		}

		id, err := propertyEntity.Delete(context, account)
		if err != nil {
			return entity.ID, err
		}
		entity.ItemID = id
	}

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

func (entity *CivilUnion) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err := context.Select(entity)
		if err != nil {
			return entity.ID, err
		}
	}

	for k, v := range entity.Items {
		entity.Name = k

		propertyEntity, err := v.Entity()
		if err != nil {
			return entity.ID, err
		}

		id, err := propertyEntity.Get(context, account)
		if err != nil {
			return entity.ID, err
		}
		entity.ItemID = id
	}

	return entity.ID, nil
}
