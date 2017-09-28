package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

type Treatment struct {
	PayloadName    Payload `json:"Name" sql:"-"`
	PayloadPhone   Payload `json:"Phone" sql:"-"`
	PayloadAddress Payload `json:"Address" sql:"-"`

	// Validator specific fields
	Name    *Text      `json:"-"`
	Phone   *Telephone `json:"-"`
	Address *Location  `json:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	NameID    int `json:"-" pg:", fk:Name"`
	PhoneID   int `json:"-" pg:", fk:Phone"`
	AddressID int `json:"-" pg:", fk:Address"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Treatment) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Text)

	phone, err := entity.PayloadPhone.Entity()
	if err != nil {
		return err
	}
	entity.Phone = phone.(*Telephone)

	address, err := entity.PayloadAddress.Entity()
	if err != nil {
		return err
	}
	entity.Address = address.(*Location)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *Treatment) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Name.Valid(); !ok {
		stack.Append("Treatment", err)
	}

	if ok, err := entity.Phone.Valid(); !ok {
		stack.Append("Treatment", err)
	}

	if ok, err := entity.Address.Valid(); !ok {
		stack.Append("Treatment", err)
	}

	return !stack.HasErrors(), stack
}

func (entity *Treatment) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Treatment{ID: account}, func(result interface{}) {
		previous := result.(*Treatment)
		entity.NameID = previous.NameID
		entity.Name.ID = previous.NameID
		entity.PhoneID = previous.PhoneID
		entity.Phone.ID = previous.PhoneID
		entity.AddressID = previous.AddressID
		entity.Address.ID = previous.AddressID
	})

	nameID, err := entity.Name.Save(context, account)
	if err != nil {
		return nameID, err
	}
	entity.NameID = nameID

	phoneID, err := entity.Phone.Save(context, account)
	if err != nil {
		return phoneID, err
	}
	entity.PhoneID = phoneID

	addressID, err := entity.Address.Save(context, account)
	if err != nil {
		return addressID, err
	}
	entity.AddressID = addressID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Treatment) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Treatment{ID: account}, func(result interface{}) {
		previous := result.(*Treatment)
		entity.NameID = previous.NameID
		entity.Name.ID = previous.NameID
		entity.PhoneID = previous.PhoneID
		entity.Phone.ID = previous.PhoneID
		entity.AddressID = previous.AddressID
		entity.Address.ID = previous.AddressID
	})

	if _, err := entity.Name.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Phone.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Address.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *Treatment) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.NameID != 0 {
		entity.Name = &Text{ID: entity.NameID}
		if _, err := entity.Name.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.PhoneID != 0 {
		entity.Phone = &Telephone{ID: entity.PhoneID}
		if _, err := entity.Phone.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.AddressID != 0 {
		entity.Address = &Location{ID: entity.AddressID}
		if _, err := entity.Address.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}
