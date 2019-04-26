package api

import (
	"encoding/json"
)

// CoOwners payload.
type CoOwners struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	AccountID int `json:"-"`
	ListID    int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *CoOwners) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *CoOwners) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("coowners", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CoOwners) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save the CoOwners entity.
func (entity *CoOwners) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the CoOwners entity.
func (entity *CoOwners) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get the CoOwners entity.
func (entity *CoOwners) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *CoOwners) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *CoOwners) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *CoOwners) Find(context DatabaseService) error {
	context.Find(&CoOwners{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*CoOwners)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.List.ID = previous.ListID
		entity.ListID = previous.ListID
	})
	return nil
}
