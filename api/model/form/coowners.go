package form

import "encoding/json"

type CoOwners struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *CoOwners) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CoOwners) Valid() (bool, error) {
	return entity.List.Valid()
}
