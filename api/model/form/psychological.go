package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

type PsychologicalCompetence struct {
	IsIncompetent Payload
	List          Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalCompetence) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalCompetence) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.IsIncompetent.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("PsychologicalCompetence", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PsychologicalCompetence", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalCompetence) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *PsychologicalCompetence) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalCompetence) Get(account int64) error {
	return nil
}

type PsychologicalConsultations struct {
	Consulted Payload
	List      Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalConsultations) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalConsultations) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.Consulted.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("PsychologicalConsultations", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PsychologicalConsultations", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalConsultations) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *PsychologicalConsultations) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalConsultations) Get(account int64) error {
	return nil
}

type PsychologicalDiagnoses struct {
	Diagnosed     Payload
	DidNotConsult Payload
	DiagnosisList Payload
	InTreatment   Payload
	TreatmentList Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalDiagnoses) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalDiagnoses) Valid() (bool, error) {
	var stack model.ErrorStack

	diagnosed, err := entity.Diagnosed.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := diagnosed.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if diagnosed.(*Branch).Value == "Yes" {
		l, err := entity.DiagnosisList.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PsychologicalDiagnoses", err)
		}
	}

	consult, err := entity.DidNotConsult.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := consult.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	treatment, err := entity.InTreatment.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := treatment.Valid(); !ok {
		stack.Append("PsychologicalDiagnoses", err)
	}

	if treatment.(*Branch).Value == "Yes" {
		l, err := entity.TreatmentList.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PsychologicalDiagnoses", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalDiagnoses) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *PsychologicalDiagnoses) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalDiagnoses) Get(account int64) error {
	return nil
}

type PsychologicalHospitalizations struct {
	Hospitalized Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalHospitalizations) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalHospitalizations) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.Hospitalized.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("PsychologicalHospitalizations", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PsychologicalHospitalizations", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalHospitalizations) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *PsychologicalHospitalizations) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalHospitalizations) Get(account int64) error {
	return nil
}

type PsychologicalExisting struct {
	HasCondition            Payload
	ReceivedTreatment       Payload
	Explanation             Payload
	TreatmentList           Payload
	DidNotFollow            Payload
	DidNotFollowExplanation Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalExisting) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalExisting) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasCondition.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if b.(*Branch).Value == "No" {
		return !stack.HasErrors(), stack
	}

	treatment, err := entity.ReceivedTreatment.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := treatment.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	tv := treatment.(*Radio).Value
	if tv == "Yes" {
		l, err := entity.TreatmentList.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	} else if tv == "No" {
		te, err := entity.Explanation.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := te.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	}

	follow, err := entity.DidNotFollow.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := follow.Valid(); !ok {
		stack.Append("PsychologicalExisting", err)
	}

	if follow.(*Branch).Value == "Yes" {
		fe, err := entity.DidNotFollowExplanation.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := fe.Valid(); !ok {
			stack.Append("PsychologicalExisting", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *PsychologicalExisting) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *PsychologicalExisting) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *PsychologicalExisting) Get(account int64) error {
	return nil
}

type PsychologicalTreatment struct {
	Name    Payload
	Phone   Payload
	Address Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *PsychologicalTreatment) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *PsychologicalTreatment) Valid() (bool, error) {
	var stack model.ErrorStack

	name, err := entity.Name.Entity()
	if err != nil {
		return false, err
	}
	if ok, err := name.Valid(); !ok {
		stack.Append("PsychologicalTreatment", err)
	}

	phone, err := entity.Phone.Entity()
	if err != nil {
		return false, err
	}
	if ok, err := phone.Valid(); !ok {
		stack.Append("PsychologicalTreatment", err)
	}

	address, err := entity.Address.Entity()
	if err != nil {
		return false, err
	}
	if ok, err := address.Valid(); !ok {
		stack.Append("PsychologicalTreatment", err)
	}

	return !stack.HasErrors(), stack
}
