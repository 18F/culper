package form

import (
	"fmt"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/go-pg/pg"
)

// CivilUnion is an item of named payloads.
type CivilUnion struct {
	Items PayloadProperties `json:"," sql:"-"`

	ID        int    `json:"-" sql:",pk"`
	AccountID int    `json:"-" sql:",pk"`
	Name      string `json:"-" sql:",pk"`
	Table     string `json:"-"`
	ItemID    int    `json:"-"`
}

// Valid iterates through each named property of an item validating
// each payload.
func (cu *CivilUnion) Valid() (bool, error) {
	var stack model.ErrorStack

	for k, v := range cu.Items {
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

// Save the CivilUnion entity.
func (cu *CivilUnion) Save(context *db.DatabaseContext, account int) (int, error) {
	cu.AccountID = account

	if err := context.CheckTable(cu); err != nil {
		return cu.ID, err
	}

	cu.Each(func(name, entityType string, entity Entity, err error) error {
		item := &CivilUnion{
			ID:        cu.ID,
			AccountID: account,
			Name:      name,
			Table:     entityType,
		}

		_ = context.Select(item)
		exists := item.ItemID != 0

		if exists {
			entity.SetID(item.ItemID)
			if err := context.Update(entity); err != nil {
				return err
			}
		} else {
			if err := context.Insert(entity); err != nil {
				return err
			}
		}
		item.ItemID = entity.GetID()

		if exists {
			if err := context.Update(item); err != nil {
				return err
			}
		} else {
			if err := context.Insert(item); err != nil {
				return err
			}
		}

		return nil
	})

	return cu.ID, nil
}

// Delete the CivilUnion entity.
func (cu *CivilUnion) Delete(context *db.DatabaseContext, account int) (int, error) {
	cu.AccountID = account

	if err := context.CheckTable(cu); err != nil {
		return cu.ID, err
	}

	err := cu.Each(func(name, entityType string, entity Entity, err error) error {
		// If there is no property name skip it.
		if name == "" {
			return nil
		}

		item := &CivilUnion{
			ID:        cu.ID,
			AccountID: account,
			Name:      name,
			Table:     entityType,
		}

		// Make sure an entity is there and that it has the proper ID set.
		if item.Table == "" {
			if entity == nil {
				return nil
			}
			entity.Get(context, account)
		} else {
			entity = transform[item.Table]()
		}
		entity.SetID(item.ItemID)

		_, err = entity.Delete(context, account)
		if err != nil {
			return err
		}

		return context.Delete(item)
	})

	if err != nil {
		return cu.ID, err
	}

	return cu.ID, nil
}

// Get the CivilUnion entity.
func (cu *CivilUnion) Get(context *db.DatabaseContext, account int) (int, error) {
	cu.AccountID = account

	if err := context.CheckTable(cu); err != nil {
		return cu.ID, err
	}

	cu.getItemPropertyNames(context)
	err := cu.Each(func(name, entityType string, entity Entity, err error) error {
		item := &CivilUnion{
			ID:        cu.ID,
			AccountID: account,
			Name:      name,
			Table:     entityType,
		}

		if err := context.Select(item); err != nil {
			return err
		}
		entity = transform[item.Table]()
		entity.SetID(item.ItemID)

		if _, err = entity.Get(context, account); err != nil {
			return err
		}

		cu.Items[name] = entity.Marshal()
		return nil
	})

	return cu.ID, err
}

// GetID returns the entity identifier.
func (cu *CivilUnion) GetID() int {
	return cu.ID
}

// SetID sets the entity identifier.
func (cu *CivilUnion) SetID(id int) {
	cu.ID = id
}

// Each loops through each entity in the collection item performing a given action
func (cu CivilUnion) Each(action func(string, string, Entity, error) error) error {
	var err error

	for k, v := range cu.Items {
		entity, err := v.Entity()
		if err = action(k, v.Type, entity, err); err != nil {
			break
		}
	}

	return err
}

func (cu *CivilUnion) getItemPropertyNames(context *db.DatabaseContext) {
	propertyNames := []string{}
	context.Database.
		Model(&CivilUnion{}).
		ColumnExpr("array_agg(name)").
		Where(fmt.Sprintf("id = %d", cu.ID)).
		Select(pg.Array(&propertyNames))
	cu.Items = make(map[string]Payload)
	for _, propertyName := range propertyNames {
		cu.Items[propertyName] = Payload{}
	}
}
