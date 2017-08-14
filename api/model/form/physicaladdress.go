package form

import "encoding/json"

// PhysicalAddress is a basic input.
type PhysicalAddress struct {
	HasDifferentAddress Payload
	Address             Payload
	Telephone           Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *PhysicalAddress) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PhysicalAddress) Valid() (bool, error) {
	b, err := entity.HasDifferentAddress.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "Yes" {
		if ok, err := entity.Address.Valid(); !ok {
			return false, err
		}

		if ok, err := entity.Telephone.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}
