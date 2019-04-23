package api

import "encoding/json"

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
	ID                    int `json:"-"`
	AccountID             int `json:"-"`
	HasDifferentAddressID int `json:"-" pg:"fk:HasDifferentAddress"`
	AddressID             int `json:"-" pg:"fk:Address"`
	TelephoneID           int `json:"-" pg:"fk:Telephone"`
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

// Marshal to payload structure
func (entity *PhysicalAddress) Marshal() Payload {
	if entity.HasDifferentAddress != nil {
		entity.PayloadHasDifferentAddress = entity.HasDifferentAddress.Marshal()
	}
	if entity.Address != nil {
		entity.PayloadAddress = entity.Address.Marshal()
	}
	if entity.Telephone != nil {
		entity.PayloadTelephone = entity.Telephone.Marshal()
	}
	return MarshalPayloadEntity("physicaladdress", entity)
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

// Save the PhysicalAddress entity.
func (entity *PhysicalAddress) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the PhysicalAddress entity.
func (entity *PhysicalAddress) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasDifferentAddress.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Address.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Telephone.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get the PhysicalAddress entity.
func (entity *PhysicalAddress) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *PhysicalAddress) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *PhysicalAddress) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *PhysicalAddress) Find(context DatabaseService) error {
	context.Find(&PhysicalAddress{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*PhysicalAddress)
		if entity.HasDifferentAddress == nil {
			entity.HasDifferentAddress = &Branch{}
		}
		entity.HasDifferentAddress.ID = previous.HasDifferentAddressID
		entity.HasDifferentAddressID = previous.HasDifferentAddressID
		if entity.Address == nil {
			entity.Address = &Location{}
		}
		entity.Address.ID = previous.AddressID
		entity.AddressID = previous.AddressID
		if entity.Telephone == nil {
			entity.Telephone = &Telephone{}
		}
		entity.Telephone.ID = previous.TelephoneID
		entity.TelephoneID = previous.TelephoneID
	})
	return nil
}
