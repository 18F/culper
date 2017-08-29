package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
)

type MilitarySelective struct {
	WasBornAfter       Payload
	HasRegistered      Payload
	RegistrationNumber Payload
	Explanation        Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitarySelective) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitarySelective) Valid() (bool, error) {
	var stack model.ErrorStack

	bornAfter, err := entity.WasBornAfter.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := bornAfter.Valid(); !ok {
		stack.Append("MilitarySelective", err)
	}

	if bornAfter.(*Branch).Value == "Yes" {
		registered, err := entity.HasRegistered.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := registered.Valid(); !ok {
			stack.Append("MilitarySelective", err)
		} else {
			rv := registered.(*Branch).Value
			if rv == "Yes" {
				regnumber, err := entity.RegistrationNumber.Entity()
				if err != nil {
					return false, err
				}

				if ok, err := regnumber.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			} else if rv == "No" {
				explanation, err := entity.Explanation.Entity()
				if err != nil {
					return false, err
				}

				if ok, err := explanation.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			}
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitarySelective) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *MilitarySelective) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitarySelective) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type MilitaryHistory struct {
	HasServed Payload
	List      Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryHistory) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryHistory) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasServed.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("MilitaryHistory", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("MilitaryHistory", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryHistory) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryHistory) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryHistory) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type MilitaryDisciplinary struct {
	HasDisciplinary Payload
	List            Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryDisciplinary) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryDisciplinary) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasDisciplinary.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("MilitaryDisciplinary", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("MilitaryDisciplinary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryDisciplinary) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryDisciplinary) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryDisciplinary) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type MilitaryForeign struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryForeign) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryForeign) Valid() (bool, error) {
	var stack model.ErrorStack

	l, err := entity.List.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := l.Valid(); !ok {
		stack.Append("MilitaryForeign", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryForeign) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryForeign) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryForeign) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
