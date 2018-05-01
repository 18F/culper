package api

import (
	"encoding/json"
)

// Collection represents a structure composed of items in a structured
// format.
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

// Save the Collection entity.
func (entity *Collection) Save(context DatabaseService, account int) (int, error) {
	// Flush the collection contents prior to saving them.
	// This ensures previously persisted data is not left around.
	copy := &Collection{}
	*copy = *entity
	copy.Delete(context, account)

	entity.AccountID = account

	// If there is a branch payload but the branch if non-existent
	// create one so it may be assigned to.
	if entity.PayloadBranch.Type != "" && entity.Branch == nil {
		entity.Branch = &Branch{}
	}

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	// Custom errors
	if entity.PayloadBranch.Type != "" {
		branchID, err := entity.Branch.Save(context, account)
		if err != nil {
			return 0, err
		}
		entity.BranchID = branchID
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	// Iterate through each property in `Items` saving them as we go.
	for i, item := range entity.Items {
		if _, err := item.Save(context, account, entity.ID, i+1); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete the Collection entity.
func (entity *Collection) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	entity.collectionItemIDs(context)
	for i, item := range entity.Items {
		if _, err := item.Delete(context, account, entity.ID, i+1); err != nil {
			return entity.ID, err
		}
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.PayloadBranch.Type != "" {
		if _, err := entity.Branch.Delete(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the Collection entity.
func (entity *Collection) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.BranchID != 0 {
		if _, err := entity.Branch.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	entity.collectionItemIDs(context)
	for i, item := range entity.Items {
		if _, err := item.Get(context, account, entity.ID, i+1); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Collection) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Collection) SetID(id int) {
	entity.ID = id
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
func (ci *CollectionItem) Save(context DatabaseService, account, collectionID, index int) (int, error) {
	ci.ID = collectionID

	if err := context.CheckTable(&CollectionItem{}); err != nil {
		return ci.ID, err
	}

	err := ci.Each(func(name, entityType string, entity Entity, err error) error {
		// If a named payload was not able to be decoded then skip the saving
		// bit.
		if entityType == "" {
			return nil
		}

		item := &CollectionItem{
			ID:    collectionID,
			Index: index,
			Name:  name,
			Type:  entityType,
		}

		id, err := entity.Save(context, account)
		if err != nil {
			return err
		}
		item.ItemID = id

		return context.Save(item)
	})

	return ci.ID, err
}

// Delete the collection item
func (ci *CollectionItem) Delete(context DatabaseService, account, collectionID, index int) (int, error) {
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
		err := context.Raw("DELETE FROM collection_items WHERE id = ?", ci.ID)
		if err != nil {
			return ci.ID, err
		}
	}

	return ci.ID, nil
}

// Get the collection item
func (ci *CollectionItem) Get(context DatabaseService, account, collectionID, index int) (int, error) {
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
		entity, _ = transform[item.Type]()
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

func (ci *CollectionItem) getItemPropertyNames(context DatabaseService) {
	propertyNames := []string{}
	context.Array(&CollectionItem{}, "array_agg(name)", &propertyNames, "id = ?", ci.ID)
	ci.Item = make(map[string]json.RawMessage)
	for _, propertyName := range propertyNames {
		ci.Item[propertyName] = []byte{}
	}
}

func (entity *CollectionItem) Find(context DatabaseService) error {
	return nil
}
