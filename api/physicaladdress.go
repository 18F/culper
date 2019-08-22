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
