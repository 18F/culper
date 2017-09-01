package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

type FinancialBankruptcy struct {
	PayloadHasBankruptcy Payload `json:"HasBankruptcy" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBankruptcy *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int
	AccountID       int64
	HasBankruptcyID int
	ListID          int
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialBankruptcy) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasBankruptcy, err := entity.PayloadHasBankruptcy.Entity()
	if err != nil {
		return err
	}
	entity.HasBankruptcy = hasBankruptcy.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialBankruptcy) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasBankruptcy.Valid(); !ok {
		stack.Append("Bankruptcy", err)
	}

	if entity.HasBankruptcy.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("Bankruptcy", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialBankruptcy) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasBankruptcyID, err := entity.HasBankruptcy.Save(context, account)
	if err != nil {
		return hasBankruptcyID, err
	}
	entity.HasBankruptcyID = hasBankruptcyID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&FinancialBankruptcy{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *FinancialBankruptcy) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialBankruptcy) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type FinancialGambling struct {
	PayloadHasGamblingDebt Payload `json:"HasGamblingDebt" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasGamblingDebt *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int
	AccountID         int64
	HasGamblingDebtID int
	ListID            int
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialGambling) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasGamblingDebt, err := entity.PayloadHasGamblingDebt.Entity()
	if err != nil {
		return err
	}
	entity.HasGamblingDebt = hasGamblingDebt.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialGambling) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasGamblingDebt.Valid(); !ok {
		stack.Append("Gambling", err)
	}

	if entity.HasGamblingDebt.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("Gambling", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialGambling) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasGamblingDebtID, err := entity.HasGamblingDebt.Save(context, account)
	if err != nil {
		return hasGamblingDebtID, err
	}
	entity.HasGamblingDebtID = hasGamblingDebtID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&FinancialGambling{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *FinancialGambling) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialGambling) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type FinancialTaxes struct {
	PayloadHasTaxes Payload `json:"HasTaxes" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasTaxes *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int
	AccountID  int64
	HasTaxesID int
	ListID     int
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialTaxes) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasTaxes, err := entity.PayloadHasTaxes.Entity()
	if err != nil {
		return err
	}
	entity.HasTaxes = hasTaxes.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialTaxes) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasTaxes.Valid(); !ok {
		stack.Append("Taxes", err)
	}

	if entity.HasTaxes.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("Taxes", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialTaxes) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasTaxesID, err := entity.HasTaxes.Save(context, account)
	if err != nil {
		return hasTaxesID, err
	}
	entity.HasTaxesID = hasTaxesID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&FinancialTaxes{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *FinancialTaxes) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialTaxes) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type FinancialCard struct {
	PayloadHasCardAbuse Payload `json:"HasCardAbuse" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCardAbuse *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasCardAbuseID int
	ListID         int
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialCard) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasCardAbuse, err := entity.PayloadHasCardAbuse.Entity()
	if err != nil {
		return err
	}
	entity.HasCardAbuse = hasCardAbuse.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialCard) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasCardAbuse.Valid(); !ok {
		stack.Append("CardAbuse", err)
	}

	if entity.HasCardAbuse.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("CardAbuse", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialCard) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasCardAbuseID, err := entity.HasCardAbuse.Save(context, account)
	if err != nil {
		return hasCardAbuseID, err
	}
	entity.HasCardAbuseID = hasCardAbuseID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&FinancialCard{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *FinancialCard) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialCard) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type FinancialCredit struct {
	PayloadHasCreditCounseling Payload `json:"HasCreditCounseling" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCreditCounseling *Branch     `json:"-"`
	List                *Collection `json:"-"`

	// Persister specific fields
	ID                    int
	AccountID             int64
	HasCreditCounselingID int
	ListID                int
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialCredit) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasCreditCounseling, err := entity.PayloadHasCreditCounseling.Entity()
	if err != nil {
		return err
	}
	entity.HasCreditCounseling = hasCreditCounseling.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialCredit) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasCreditCounseling.Valid(); !ok {
		stack.Append("CreditCounseling", err)
	}

	if entity.HasCreditCounseling.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("CreditCounseling", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialCredit) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasCreditCounselingID, err := entity.HasCreditCounseling.Save(context, account)
	if err != nil {
		return hasCreditCounselingID, err
	}
	entity.HasCreditCounselingID = hasCreditCounselingID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&FinancialCredit{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *FinancialCredit) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialCredit) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type FinancialDelinquent struct {
	PayloadHasDelinquent Payload `json:"HasDelinquent" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDelinquent *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int
	AccountID       int64
	HasDelinquentID int
	ListID          int
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialDelinquent) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDelinquent, err := entity.PayloadHasDelinquent.Entity()
	if err != nil {
		return err
	}
	entity.HasDelinquent = hasDelinquent.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialDelinquent) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasDelinquent.Valid(); !ok {
		stack.Append("Delinquent", err)
	}

	if entity.HasDelinquent.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("Delinquent", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialDelinquent) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasDelinquentID, err := entity.HasDelinquent.Save(context, account)
	if err != nil {
		return hasDelinquentID, err
	}
	entity.HasDelinquentID = hasDelinquentID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&FinancialDelinquent{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *FinancialDelinquent) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialDelinquent) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type FinancialNonpayment struct {
	PayloadHasNonpayment Payload `json:"HasNonpayment" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasNonpayment *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int
	AccountID       int64
	HasNonpaymentID int
	ListID          int
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialNonpayment) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasNonpayment, err := entity.PayloadHasNonpayment.Entity()
	if err != nil {
		return err
	}
	entity.HasNonpayment = hasNonpayment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialNonpayment) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasNonpayment.Valid(); !ok {
		stack.Append("Nonpayment", err)
	}

	if entity.HasNonpayment.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("Nonpayment", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *FinancialNonpayment) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasNonpaymentID, err := entity.HasNonpayment.Save(context, account)
	if err != nil {
		return hasNonpaymentID, err
	}
	entity.HasNonpaymentID = hasNonpaymentID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&FinancialNonpayment{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *FinancialNonpayment) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialNonpayment) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
