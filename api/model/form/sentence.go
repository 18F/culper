package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

// Sentence is a basic input.
type Sentence struct {
	ID                   int
	Description          Payload
	ExceedsYear          Payload
	Incarcerated         Payload
	IncarcerationDates   Payload
	IncarcerationDatesNA Payload
	ProbationDates       Payload
	ProbationDatesNA     Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *Sentence) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Sentence) Valid() (bool, error) {
	if ok, err := entity.Description.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.ExceedsYear.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Incarcerated.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.IncarcerationDates.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.IncarcerationDatesNA.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.ProbationDates.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.ProbationDatesNA.Valid(); !ok {
		return false, err
	}

	return true, nil
}

func (entity *Sentence) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Sentence) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Sentence) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
