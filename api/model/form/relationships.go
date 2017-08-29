package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
)

type RelationshipsMarital struct {
	ID           int
	Status       Payload
	CivilUnion   PayloadProperties
	DivorcedList Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsMarital) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsMarital) Valid() (bool, error) {
	status, err := entity.Status.Entity()
	if err != nil {
		return false, err
	}

	var stack model.ErrorStack

	sv := status.(*Radio).Value
	switch {
	case sv == "InCivilUnion" || sv == "Separated":
		// Check if the civil union information is valid
		for k, v := range entity.CivilUnion {
			if k == "Divorced" {
				// Check if there was a divorce mentioned in the civil
				// union
				divorced, err := v.Entity()
				if err != nil {
					return false, err
				}

				if ok, err := divorced.Valid(); !ok {
					stack.Append("CitizenshipMarital", err)
				}

				// If there was a divorce then validate the divorce
				// collection as well
				if divorced.(*Branch).Value == "Yes" {
					if ok, err := entity.DivorcedList.Valid(); !ok {
						stack.Append("CitizenshipMarital", err)
					}
				}

				continue
			}

			if ok, err := v.Valid(); !ok {
				stack.Append("CitizenshipMarital", err)
			}
		}

	case sv == "Annulled" || sv == "Divorced" || sv == "Widowed":
		if ok, err := entity.DivorcedList.Valid(); !ok {
			stack.Append("CitizenshipMarital", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *RelationshipsMarital) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *RelationshipsMarital) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsMarital) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type RelationshipsCohabitants struct {
	HasCohabitant  Payload
	CohabitantList Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsCohabitants) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsCohabitants) Valid() (bool, error) {
	b, err := entity.HasCohabitant.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.CohabitantList.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsCohabitants) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *RelationshipsCohabitants) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsCohabitants) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type RelationshipsPeople struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsPeople) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsPeople) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsPeople) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *RelationshipsPeople) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsPeople) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type RelationshipsRelatives struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsRelatives) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsRelatives) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsRelatives) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *RelationshipsRelatives) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsRelatives) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
