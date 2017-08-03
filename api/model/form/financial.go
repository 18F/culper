package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

type FinancialBankruptcy struct {
	HasBankruptcy Payload
	List          Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialBankruptcy) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialBankruptcy) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasBankruptcy.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("Bankruptcy", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("Bankruptcy", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialBankruptcy) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *FinancialBankruptcy) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialBankruptcy) Get() error {
	return nil
}

type FinancialGambling struct {
	HasGamblingDebt Payload
	List            Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialGambling) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialGambling) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasGamblingDebt.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("Gambling", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("Gambling", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialGambling) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *FinancialGambling) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialGambling) Get() error {
	return nil
}

type FinancialTaxes struct {
	HasTaxes Payload
	List     Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialTaxes) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialTaxes) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasTaxes.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("Taxes", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("Taxes", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialTaxes) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *FinancialTaxes) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialTaxes) Get() error {
	return nil
}

type FinancialCard struct {
	HasCardAbuse Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialCard) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialCard) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasCardAbuse.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("CardAbuse", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("CardAbuse", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialCard) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *FinancialCard) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialCard) Get() error {
	return nil
}

type FinancialCredit struct {
	HasCreditCounseling Payload
	List                Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialCredit) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialCredit) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasCreditCounseling.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("CreditCounseling", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("CreditCounseling", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialCredit) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *FinancialCredit) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialCredit) Get() error {
	return nil
}

type FinancialDelinquent struct {
	HasDelinquent Payload
	List          Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialDelinquent) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialDelinquent) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasDelinquent.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("Delinquent", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("Delinquent", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialDelinquent) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *FinancialDelinquent) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialDelinquent) Get() error {
	return nil
}

type FinancialNonpayment struct {
	HasNonpayment Payload
	List          Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialNonpayment) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialNonpayment) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasNonpayment.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("Nonpayment", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("Nonpayment", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialNonpayment) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *FinancialNonpayment) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialNonpayment) Get() error {
	return nil
}
