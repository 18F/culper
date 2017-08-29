package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
)

type SubstanceDrugUsage struct {
	ID        int
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
func (entity *SubstanceDrugUsage) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugUsage) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugUsage) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceDrugPurchase) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugPurchase) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPurchase) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceDrugClearance) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugClearance) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugClearance) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceDrugPublicSafety) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugPublicSafety) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPublicSafety) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceDrugMisuse) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugMisuse) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugMisuse) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceDrugOrdered) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugOrdered) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugOrdered) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceDrugVoluntary) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugVoluntary) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugVoluntary) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceAlcoholNegative) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholNegative) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholNegative) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceAlcoholOrdered) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholOrdered) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholOrdered) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceAlcoholVoluntary) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholVoluntary) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholVoluntary) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *SubstanceAlcoholAdditional) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholAdditional) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholAdditional) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
