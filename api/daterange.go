package api

import "encoding/json"

// DateRange is a basic input.
type DateRange struct {
	PayloadFrom Payload `json:"from" sql:"-"`
	PayloadTo   Payload `json:"to" sql:"-"`
	Present     bool    `json:"present"`

	From *DateControl `json:"-"`
	To   *DateControl `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *DateRange) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	from, err := entity.PayloadFrom.Entity()
	if err != nil {
		return err
	}
	entity.From = from.(*DateControl)

	to, err := entity.PayloadTo.Entity()
	if err != nil {
		return err
	}
	entity.To = to.(*DateControl)

	return err
}

// Marshal to payload structure
func (entity *DateRange) Marshal() Payload {
	if entity.From != nil {
		entity.PayloadFrom = entity.From.Marshal()
	}
	if entity.To != nil {
		entity.PayloadTo = entity.To.Marshal()
	}
	return MarshalPayloadEntity("daterange", entity)
}
