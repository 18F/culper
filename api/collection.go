package api

import (
	"encoding/json"
	"fmt"

	"github.com/pkg/errors"
)

// Collection represents a structure composed of zero or more items.
type Collection struct {
	PayloadBranch Payload `json:"branch" sql:"-"`

	Branch *Branch           `json:"-" sql:"-"`
	Items  []*CollectionItem `json:"items" sql:"-"`
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

// CollectionItem is an item of named payloads directly used in a `Collection`.
type CollectionItem struct {
	Item map[string]json.RawMessage `json:"Item" sql:"-"`

	ID     int    `json:"-" sql:",pk"`
	Index  int    `json:"-" sql:",pk"`
	Name   string `json:"-" sql:",pk"`
	Type   string `json:"-"`
	ItemID int    `json:"-"`
}

// MarshalJSON implements json.Marshaller
// This implementation of MarshalJSON ensures that the values in Item have actually
// been turned into their Go representation at some point instead of just storing whatever
// is sent in /save
// This fixes a bug introduced by simplestorage where json objets with no correspondence to
// their go represenations would end up stored in collections and break XML generation
func (ci CollectionItem) MarshalJSON() ([]byte, error) {
	itemMap := make(map[string]interface{})

	eachErr := ci.Each(func(name, entityType string, entity Entity, innerErr error) error {
		if innerErr != nil {
			return innerErr
		}

		payload := entity.Marshal()

		itemMap[name] = payload
		return nil
	})
	if eachErr != nil {
		return []byte{}, eachErr
	}

	ciMap := make(map[string]interface{})
	ciMap["Item"] = itemMap

	return json.Marshal(ciMap)

}

// UnmarshalJSON implements json.Unmarshaller
func (ci *CollectionItem) UnmarshalJSON(bytes []byte) error {
	var ciMap map[string]map[string]json.RawMessage

	jsonErr := json.Unmarshal(bytes, &ciMap)
	if jsonErr != nil {
		return jsonErr
	}

	ci.Item = ciMap["Item"]
	return nil
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
