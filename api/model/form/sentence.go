package form

import "encoding/json"

// Sentence is a basic input.
type Sentence struct {
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
