package form

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/go-pg/pg"
)

// CollectionItem is an item of named payloads.
type CollectionItem struct {
	Item map[string]json.RawMessage `json:"Item" sql:"-"`

	ID     int    `json:"-" sql:",pk"`
	Index  int    `json:"-" sql:",pk"`
	Name   string `json:"-" sql:",pk"`
	Type   string `json:"-"`
	ItemID int    `json:"-"`
}

// Valid iterates through each named property of an item validating
// each payload.
func (ci *CollectionItem) Valid() (bool, error) {
	err := ci.Each(func(name, entityType string, entity Entity, err error) error {
		if err != nil {
			return err
		}

		_, err = entity.Valid()
		return err
	})

	return err != nil, err
}

// Save the collection item
func (ci *CollectionItem) Save(context *db.DatabaseContext, account, collectionID, index int) (int, error) {
	ci.ID = collectionID

	log.Println("1.4.1")
	if err := context.CheckTable(&CollectionItem{}); err != nil {
		return ci.ID, err
	}

	log.Println("1.4.2")
	err := ci.Each(func(name, entityType string, entity Entity, err error) error {
		log.Println("1.4.2.1")
		if err != nil {
			return err
		}

		item := &CollectionItem{
			ID:    collectionID,
			Index: index,
			Name:  name,
			Type:  entityType,
		}

		log.Println("1.4.2.2")
		id, err := entity.Save(context, account)
		if err != nil {
			return err
		}
		item.ItemID = id

		log.Println("1.4.2.3")
		return context.Save(item)
	})

	log.Println("1.4.3")
	return ci.ID, err
}

// Delete the collection item
func (ci *CollectionItem) Delete(context *db.DatabaseContext, account, collectionID, index int) (int, error) {
	ci.ID = collectionID

	if err := context.CheckTable(&CollectionItem{}); err != nil {
		return ci.ID, err
	}

	ci.getItemPropertyNames(context)
	err := ci.Each(func(name, entityType string, entity Entity, err error) error {
		if err != nil {
			return err
		}

		item := &CollectionItem{
			ID:    collectionID,
			Index: index,
			Name:  name,
			Type:  entityType,
		}

		if err := context.CheckTable(entity); err != nil {
			return err
		}

		id, err := entity.Delete(context, account)
		if err != nil {
			return err
		}
		item.ItemID = id

		return context.Delete(item)
	})

	if err != nil {
		return ci.ID, err
	}

	if ci.ID != 0 {
		err := context.Raw(fmt.Sprintf("DELETE FROM collection_items WHERE id = %d", ci.ID))
		if err != nil {
			return ci.ID, err
		}
	}

	return ci.ID, nil
}

// Get the collection item
func (ci *CollectionItem) Get(context *db.DatabaseContext, account, collectionID, index int) (int, error) {
	ci.ID = collectionID

	if err := context.CheckTable(&CollectionItem{}); err != nil {
		return ci.ID, err
	}

	ci.getItemPropertyNames(context)
	err := ci.Each(func(name, entityType string, entity Entity, err error) error {
		item := &CollectionItem{
			ID:    collectionID,
			Index: index,
			Name:  name,
			Type:  entityType,
		}

		if err := context.Select(item); err != nil {
			return err
		}
		entity = transform[item.Type]()
		entity.SetID(item.ItemID)

		if err := context.CheckTable(entity); err != nil {
			return err
		}

		if _, err = entity.Get(context, account); err != nil {
			return err
		}

		raw, _ := json.MarshalIndent(entity.Marshal(), "", "  ")
		ci.Item[name] = raw
		return nil
	})

	return ci.ID, err
}

// GetID returns the entity identifier.
func (ci *CollectionItem) GetID() int {
	return ci.ID
}

// SetID sets the entity identifier.
func (ci *CollectionItem) SetID(id int) {
	ci.ID = id
}

// Each loops through each entity in the collection item performing a given action
func (ci CollectionItem) Each(action func(string, string, Entity, error) error) error {
	var err error

	for k, v := range ci.Item {
		entityType, entity, err := getItemEntity(v)
		if err = action(k, entityType, entity, err); err != nil {
			break
		}
	}

	return err
}

// getItemEntity marshals a raw JSON format to a entity
func getItemEntity(raw json.RawMessage) (string, Entity, error) {
	// Decode JSON to a payload
	payload := &Payload{}
	err := json.Unmarshal(raw, payload)
	if err != nil {
		return "", nil, err
	}

	// Find the appropriate entity for the payload
	entity, err := payload.Entity()
	return payload.Type, entity, err
}

func (ci *CollectionItem) getItemPropertyNames(context *db.DatabaseContext) {
	propertyNames := []string{}
	context.Database.
		Model(&CollectionItem{}).
		ColumnExpr("array_agg(name)").
		Where(fmt.Sprintf("id = %d", ci.ID)).
		Select(pg.Array(&propertyNames))
	ci.Item = make(map[string]json.RawMessage)
	for _, propertyName := range propertyNames {
		ci.Item[propertyName] = []byte{}
	}
}
