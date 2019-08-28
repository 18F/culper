package api

import (
	"encoding/json"
)

// Signature is a basic input.
type Signature struct {
	PayloadName Payload `json:"Name" sql:"-"`
	PayloadDate Payload `json:"Date" sql:"-"`

	Name *Text        `json:"-" sql:"-"`
	Date *DateControl `json:"-" sql:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Signature) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Text)

	date, err := entity.PayloadDate.Entity()
	if err != nil {
		return err
	}
	entity.Date = date.(*DateControl)

	return err
}

// Marshal to payload structure
func (entity *Signature) Marshal() Payload {
	if entity.Name != nil {
		entity.PayloadName = entity.Name.Marshal()
	}
	if entity.Date != nil {
		entity.PayloadDate = entity.Date.Marshal()
	}
	return MarshalPayloadEntity("signature", entity)
}
