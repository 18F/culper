package form

import "encoding/json"

type HistoryResidence struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryResidence) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryResidence) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryResidence) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *HistoryResidence) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryResidence) Get() error {
	return nil
}

type HistoryEmployment struct {
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryEmployment) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryEmployment) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryEmployment) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *HistoryEmployment) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryEmployment) Get() error {
	return nil
}

type HistoryEducation struct {
	HasAttended Payload
	HasDegree10 Payload
	List        Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryEducation) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryEducation) Valid() (bool, error) {
	attended, err := entity.HasAttended.Entity()
	if err != nil {
		return false, err
	}

	degree, err := entity.HasDegree10.Entity()
	if err != nil {
		return false, err
	}

	if attended.(*Branch).Value == "Yes" || degree.(*Branch).Value == "Yes" {
		return entity.List.Valid()
	}

	return true, nil
}

// Save will create or update the database.
func (entity *HistoryEducation) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *HistoryEducation) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryEducation) Get() error {
	return nil
}

type HistoryFederal struct {
	HasFederalService Payload
	List              Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryFederal) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryFederal) Valid() (bool, error) {
	b, err := entity.HasFederalService.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryFederal) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *HistoryFederal) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryFederal) Get() error {
	return nil
}
