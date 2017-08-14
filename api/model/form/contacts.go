package form

import "encoding/json"

type Contacts struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *Contacts) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Contacts) Valid() (bool, error) {
	return entity.List.Valid()
}
