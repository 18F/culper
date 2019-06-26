package api

import (
	"encoding/json"
	"fmt"

	"github.com/pkg/errors"
)

// Collection represents a structure composed of zero or more items.
type Collection struct {
	PayloadBranch Payload `json:"branch" sql:"-"`

	// Validator specific fields
	Branch *Branch           `json:"-" sql:"-"`
	Items  []*CollectionItem `json:"items" sql:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	AccountID int `json:"-"`
	BranchID  int `json:"-" pg:",fk:Branch"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Collection) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}
	if entity.PayloadBranch.Type != "" {
		branch, err := entity.PayloadBranch.Entity()
		if err != nil {
			return err
		}
		entity.Branch = branch.(*Branch)
	}
	return err
}

// Marshal to payload structure
func (entity *Collection) Marshal() Payload {
	if entity.Branch != nil {
		entity.PayloadBranch = entity.Branch.Marshal()
	}
	return MarshalPayloadEntity("collection", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Collection) Valid() (bool, error) {
	var stack ErrorStack

	// Iterate through each property in `Items` validating them as we go.
	for _, item := range entity.Items {
		if ok, err := item.Valid(); !ok {
			stack.Append("Item", err)
		}
	}

	// Custom errors
	if entity.PayloadBranch.Type != "" {
		if ok, err := entity.Branch.Valid(); !ok {
			stack.Append("Item", err)
		} else {
			if entity.Branch.Value != "No" {
				stack.Append("Collection", ErrFieldInvalid{"Collection branch value is required"})
			}
		}
	}

	return !stack.HasErrors(), stack
}

// collectionItemIDs the Collection item identifiers.
func (entity *Collection) collectionItemIDs(context DatabaseService) {
	var count int
	context.CountExpr(&CollectionItem{}, "max(index) as max", &count, "id = ?", entity.ID)
	entity.Items = []*CollectionItem{}
	for i := 0; i < count; i++ {
		entity.Items = append(entity.Items, &CollectionItem{ID: entity.ID, Index: i + 1})
	}
}

// Find the previous entity stored if one is available.
func (entity *Collection) Find(context DatabaseService) error {
	context.Find(&Collection{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*Collection)
		if previous.BranchID != 0 {
			if entity.Branch == nil {
				entity.Branch = &Branch{}
			}
			entity.Branch.ID = previous.BranchID
			entity.BranchID = previous.BranchID
		}
	})
	return nil
}

// CollectionItem is an item of named payloads directly used in a `Collection`.
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

// GetItemValue returns the entity stored at the key in the collection item
func (ci CollectionItem) GetItemValue(key string) (Entity, error) {

	item, ok := ci.Item[key]
	if !ok {
		return nil, errors.New(fmt.Sprintf("Key %s does not exist in collection item %s", key, ci.Name))
	}

	_, entity, err := getItemEntity(item)
	if err != nil {
		return nil, err
	}

	return entity, nil
}

// SetItemValue sets a value for a key in the CollectionItem
func (ci *CollectionItem) SetItemValue(key string, value Entity) error {

	payload := value.Marshal()

	js, jsErr := json.Marshal(payload)
	if jsErr != nil {
		return errors.Wrap(jsErr, "failed to marhsal item value")
	}

	ci.Item[key] = js

	return nil

}

// ClearBranchItemsNo goes through every item in the collection, pulls out all the branches
// with the given name and clears the no
func (entity *Collection) ClearBranchItemsNo(firstKey string, additionalKeys ...string) error {
	allKeys := append([]string{firstKey}, additionalKeys...)

	if entity != nil {
		for _, item := range entity.Items {

			for _, key := range allKeys {

				value, itemErr := item.GetItemValue(key)
				if itemErr != nil {
					return errors.Wrap(itemErr, fmt.Sprintf("Failed to pull out a %s", key))
				}

				branch := value.(*Branch)
				if branch.Value == "No" {
					branch.Value = ""
					setErr := item.SetItemValue(key, branch)
					if setErr != nil {
						return errors.Wrap(setErr, fmt.Sprintf("Failed to set a %s", key))
					}
				}
			}
		}
	}
	return nil
}

// ClearNestedHasNo goes through all the items in the collection, pulls out
// the named nested collection and clears its Has' No
func (entity *Collection) ClearNestedHasNo(itemName string) error {

	// loop through all items.
	if entity != nil {
		for _, item := range entity.Items {
			collectionItem, repErr := item.GetItemValue(itemName)
			if repErr != nil {
				return repErr
			}

			nestedCollection := collectionItem.(*Collection)

			clearErr := nestedCollection.ClearBranchItemsNo("Has")
			if clearErr != nil {
				return clearErr
			}

			setErr := item.SetItemValue(itemName, nestedCollection)
			if setErr != nil {
				return setErr
			}
		}
	}
	return nil
}

// ClearBranchNo clears the no of the list's branch
// This is a convience wrapper that checks nil first.
func (entity *Collection) ClearBranchNo() {
	if entity != nil {
		entity.Branch.ClearNo()
	}
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

// getItemPropertyNames retrieves the number of items in the collection item and assigns
// property names so they may be filled.
func (ci *CollectionItem) getItemPropertyNames(context DatabaseService) {
	propertyNames := []string{}
	context.Array(&CollectionItem{}, "array_agg(name)", &propertyNames, "id = ?", ci.ID)
	ci.Item = make(map[string]json.RawMessage)
	for _, propertyName := range propertyNames {
		ci.Item[propertyName] = []byte{}
	}
}
