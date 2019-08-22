package api

import (
	"encoding/json"
)

// Treatment is a basic structure.
type Treatment struct {
	PayloadName    Payload `json:"Name" sql:"-"`
	PayloadPhone   Payload `json:"Phone" sql:"-"`
	PayloadAddress Payload `json:"Address" sql:"-"`

	Name    *Text      `json:"-"`
	Phone   *Telephone `json:"-"`
	Address *Location  `json:"-"`
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

// Marshal to payload structure
func (entity *Treatment) Marshal() Payload {
	if entity.Name != nil {
		entity.PayloadName = entity.Name.Marshal()
	}
	if entity.Phone != nil {
		entity.PayloadPhone = entity.Phone.Marshal()
	}
	if entity.Address != nil {
		entity.PayloadAddress = entity.Address.Marshal()
	}
	return MarshalPayloadEntity("psychological.treatment", entity)
}
