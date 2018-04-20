package api

import (
	"encoding/json"
)

type Contacts struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	AccountID int `json:"-"`
	ListID    int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Contacts) Unmarshal(raw []byte) error {
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
func (entity *Contacts) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("contacts", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Contacts) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save the Contacts entity.
func (entity *Contacts) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

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

// Delete the Contacts entity.
func (entity *Contacts) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

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

// Get the Contacts entity.
func (entity *Contacts) Get(context DatabaseService, account int) (int, error) {
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

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Contacts) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Contacts) SetID(id int) {
	entity.ID = id
}

func (entity *Contacts) Find(context DatabaseService) error {
	context.Find(&Contacts{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*Contacts)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.List.ID = previous.ListID
		entity.ListID = previous.ListID
	})
	return nil
}
