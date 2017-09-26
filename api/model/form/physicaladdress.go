package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// PhysicalAddress is a basic input.
type PhysicalAddress struct {
	PayloadHasDifferentAddress Payload `json:"HasDifferentAddress" sql:"-"`
	PayloadAddress             Payload `json:"Address" sql:"-"`
	PayloadTelephone           Payload `json:"Telephone" sql:"-"`

	// Validator specific fields
	HasDifferentAddress *Branch    `json:"-"`
	Address             *Location  `json:"-"`
	Telephone           *Telephone `json:"-"`

	// Persister specific fields
	ID                    int   `json:"-"`
	AccountID             int64 `json:"-"`
	HasDifferentAddressID int   `json:"-"`
	AddressID             int   `json:"-"`
	TelephoneID           int   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *PhysicalAddress) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDifferentAddress, err := entity.PayloadHasDifferentAddress.Entity()
	if err != nil {
		return err
	}
	entity.HasDifferentAddress = hasDifferentAddress.(*Branch)

	address, err := entity.PayloadAddress.Entity()
	if err != nil {
		return err
	}
	entity.Address = address.(*Location)

	telephone, err := entity.PayloadTelephone.Entity()
	if err != nil {
		return err
	}
	entity.Telephone = telephone.(*Telephone)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *PhysicalAddress) Valid() (bool, error) {
	if entity.HasDifferentAddress.Value == "Yes" {
		if ok, err := entity.Address.Valid(); !ok {
			return false, err
		}

		if ok, err := entity.Telephone.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}

func (entity *PhysicalAddress) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	err = context.CreateTable(&PhysicalAddress{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	hasDifferentAddressID, err := entity.HasDifferentAddress.Save(context, account)
	if err != nil {
		return hasDifferentAddressID, err
	}
	entity.HasDifferentAddressID = hasDifferentAddressID

	addressID, err := entity.Address.Save(context, account)
	if err != nil {
		return addressID, err
	}
	entity.AddressID = addressID

	telephoneID, err := entity.Telephone.Save(context, account)
	if err != nil {
		return telephoneID, err
	}
	entity.TelephoneID = telephoneID

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *PhysicalAddress) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&PhysicalAddress{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasDifferentAddress.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Address.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Telephone.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *PhysicalAddress) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&PhysicalAddress{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasDifferentAddressID != 0 {
		if _, err := entity.HasDifferentAddress.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.AddressID != 0 {
		if _, err := entity.Address.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.TelephoneID != 0 {
		if _, err := entity.Telephone.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
