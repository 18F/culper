package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// PhysicalAddress is a basic input.
type PhysicalAddress struct {
	ID                  int
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

func (entity *PhysicalAddress) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *PhysicalAddress) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *PhysicalAddress) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
