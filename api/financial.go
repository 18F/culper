package api

import (
	"encoding/json"
)

// FinancialBankruptcy represents the payload for the financial bankruptcy section.
type FinancialBankruptcy struct {
	PayloadHasBankruptcy Payload `json:"HasBankruptcy" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBankruptcy *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasBankruptcyID int `json:"-" pg:", fk:HasBankruptcy"`
	ListID          int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *FinancialBankruptcy) Marshal() Payload {
	if entity.HasBankruptcy != nil {
		entity.PayloadHasBankruptcy = entity.HasBankruptcy.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("financial.bankruptcy", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialBankruptcy) Valid() (bool, error) {
	var stack ErrorStack

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

// ClearNos clears the "no" answers on application rejection
func (entity *FinancialBankruptcy) ClearNos() error {
	entity.HasBankruptcy.ClearNo()

	clearErr := entity.List.ClearBranchItemsNo("HasDischargeExplanation")
	if clearErr != nil {
		return clearErr
	}

	entity.List.ClearBranchNo()
	return nil
}

// FinancialGambling represents the payload for the financial gambling section.
type FinancialGambling struct {
	PayloadHasGamblingDebt Payload `json:"HasGamblingDebt" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasGamblingDebt *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasGamblingDebtID int `json:"-" pg:", fk:HasGamblingDebt"`
	ListID            int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *FinancialGambling) Marshal() Payload {
	if entity.HasGamblingDebt != nil {
		entity.PayloadHasGamblingDebt = entity.HasGamblingDebt.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("financial.gambling", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialGambling) Valid() (bool, error) {
	var stack ErrorStack

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

// ClearNos clears the "no" answers on application rejection
func (entity *FinancialGambling) ClearNos() error {
	entity.HasGamblingDebt.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialTaxes represents the payload for the financial taxes section.
type FinancialTaxes struct {
	PayloadHasTaxes Payload `json:"HasTaxes" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasTaxes *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	HasTaxesID int `json:"-" pg:", fk:HasTaxes"`
	ListID     int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *FinancialTaxes) Marshal() Payload {
	if entity.HasTaxes != nil {
		entity.PayloadHasTaxes = entity.HasTaxes.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("financial.taxes", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialTaxes) Valid() (bool, error) {
	var stack ErrorStack

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

// ClearNos clears the "no" answers on application rejection
func (entity *FinancialTaxes) ClearNos() error {
	entity.HasTaxes.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialCard represents the payload for the financial card section.
type FinancialCard struct {
	PayloadHasCardAbuse Payload `json:"HasCardAbuse" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCardAbuse *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasCardAbuseID int `json:"-" pg:", fk:HasCardAbuse"`
	ListID         int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *FinancialCard) Marshal() Payload {
	if entity.HasCardAbuse != nil {
		entity.PayloadHasCardAbuse = entity.HasCardAbuse.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("financial.card", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialCard) Valid() (bool, error) {
	var stack ErrorStack

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

// ClearNos clears the "no" answers on application rejection
func (entity *FinancialCard) ClearNos() error {
	entity.HasCardAbuse.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialCredit represents the payload for the financial credit section.
type FinancialCredit struct {
	PayloadHasCreditCounseling Payload `json:"HasCreditCounseling" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCreditCounseling *Branch     `json:"-"`
	List                *Collection `json:"-"`

	// Persister specific fields
	ID                    int `json:"-"`
	HasCreditCounselingID int `json:"-" pg:", fk:HasCreditCounseling"`
	ListID                int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *FinancialCredit) Marshal() Payload {
	if entity.HasCreditCounseling != nil {
		entity.PayloadHasCreditCounseling = entity.HasCreditCounseling.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("financial.credit", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialCredit) Valid() (bool, error) {
	var stack ErrorStack

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

// ClearNos clears the "no" answers on application rejection
func (entity *FinancialCredit) ClearNos() error {
	entity.HasCreditCounseling.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialDelinquent represents the payload for the financial delinquent section.
type FinancialDelinquent struct {
	PayloadHasDelinquent Payload `json:"HasDelinquent" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDelinquent *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasDelinquentID int `json:"-" pg:", fk:HasDelinquent"`
	ListID          int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *FinancialDelinquent) Marshal() Payload {
	if entity.HasDelinquent != nil {
		entity.PayloadHasDelinquent = entity.HasDelinquent.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("financial.delinquent", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialDelinquent) Valid() (bool, error) {
	var stack ErrorStack

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

// ClearNos clears the "no" answers on application rejection
func (entity *FinancialDelinquent) ClearNos() error {
	entity.HasDelinquent.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialNonpayment represents the payload for the financial nonpayment section.
type FinancialNonpayment struct {
	PayloadHasNonpayment Payload `json:"HasNonpayment" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasNonpayment *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasNonpaymentID int `json:"-" pg:", fk:HasNonpayment"`
	ListID          int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *FinancialNonpayment) Marshal() Payload {
	if entity.HasNonpayment != nil {
		entity.PayloadHasNonpayment = entity.HasNonpayment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("financial.nonpayment", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialNonpayment) Valid() (bool, error) {
	var stack ErrorStack

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

// ClearNos clears the "no" answers on application rejection
func (entity *FinancialNonpayment) ClearNos() error {
	entity.HasNonpayment.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}
