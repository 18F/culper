package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

type SubstanceDrugUsage struct {
	UsedDrugs Payload
	List      Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugUsage) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugUsage) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.UsedDrugs.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("DrugUsage", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("DrugUsage", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugUsage) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugUsage) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugUsage) Get(account int64) error {
	return nil
}

type SubstanceDrugPurchase struct {
	Involved Payload
	List     Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugPurchase) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugPurchase) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.Involved.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("DrugPurchase", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("DrugPurchase", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugPurchase) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugPurchase) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPurchase) Get(account int64) error {
	return nil
}

type SubstanceDrugClearance struct {
	UsedDrugs Payload
	List      Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugClearance) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugClearance) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.UsedDrugs.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("DrugClearance", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("DrugClearance", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugClearance) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugClearance) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugClearance) Get(account int64) error {
	return nil
}

type SubstanceDrugPublicSafety struct {
	UsedDrugs Payload
	List      Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugPublicSafety) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugPublicSafety) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.UsedDrugs.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("PublicSafety", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("PublicSafety", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugPublicSafety) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugPublicSafety) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPublicSafety) Get(account int64) error {
	return nil
}

type SubstanceDrugMisuse struct {
	UsedDrugs Payload
	List      Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugMisuse) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugMisuse) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.UsedDrugs.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("DrugMisuse", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("DrugMisuse", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugMisuse) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugMisuse) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugMisuse) Get(account int64) error {
	return nil
}

type SubstanceDrugOrdered struct {
	Involved Payload
	List     Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugOrdered) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugOrdered) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.Involved.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("DrugOrdered", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("DrugOrdered", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugOrdered) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugOrdered) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugOrdered) Get(account int64) error {
	return nil
}

type SubstanceDrugVoluntary struct {
	Involved Payload
	List     Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugVoluntary) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugVoluntary) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.Involved.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("DrugVoluntary", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("DrugVoluntary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugVoluntary) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugVoluntary) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugVoluntary) Get(account int64) error {
	return nil
}

type SubstanceAlcoholNegative struct {
	HasImpacts Payload
	List       Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholNegative) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholNegative) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasImpacts.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("AlcoholNegative", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("AlcoholNegative", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholNegative) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholNegative) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholNegative) Get(account int64) error {
	return nil
}

type SubstanceAlcoholOrdered struct {
	HasBeenOrdered Payload
	List           Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholOrdered) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholOrdered) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasBeenOrdered.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("AlcoholOrdered", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("AlcoholOrdered", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholOrdered) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholOrdered) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholOrdered) Get(account int64) error {
	return nil
}

type SubstanceAlcoholVoluntary struct {
	SoughtTreatment Payload
	List            Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholVoluntary) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholVoluntary) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.SoughtTreatment.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("AlcoholVoluntary", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("AlcoholVoluntary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholVoluntary) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholVoluntary) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholVoluntary) Get(account int64) error {
	return nil
}

type SubstanceAlcoholAdditional struct {
	ReceivedTreatment Payload
	List              Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholAdditional) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholAdditional) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.ReceivedTreatment.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("AlcoholAdditional", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("AlcoholAdditional", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholAdditional) Save(account int64) error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholAdditional) Delete(account int64) error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholAdditional) Get(account int64) error {
	return nil
}
