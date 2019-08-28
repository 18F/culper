package api

import (
	"encoding/json"
)

// FinancialBankruptcy represents the payload for the financial bankruptcy section.
type FinancialBankruptcy struct {
	PayloadHasBankruptcy Payload `json:"HasBankruptcy" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	HasBankruptcy *Branch     `json:"-"`
	List          *Collection `json:"-"`
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

// ClearNoBranches clears the "no" answers on application rejection
func (entity *FinancialBankruptcy) ClearNoBranches() error {
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

	HasGamblingDebt *Branch     `json:"-"`
	List            *Collection `json:"-"`
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

// ClearNoBranches clears the "no" answers on application rejection
func (entity *FinancialGambling) ClearNoBranches() error {
	entity.HasGamblingDebt.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialTaxes represents the payload for the financial taxes section.
type FinancialTaxes struct {
	PayloadHasTaxes Payload `json:"HasTaxes" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	HasTaxes *Branch     `json:"-"`
	List     *Collection `json:"-"`
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

// ClearNoBranches clears the "no" answers on application rejection
func (entity *FinancialTaxes) ClearNoBranches() error {
	entity.HasTaxes.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialCard represents the payload for the financial card section.
type FinancialCard struct {
	PayloadHasCardAbuse Payload `json:"HasCardAbuse" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	HasCardAbuse *Branch     `json:"-"`
	List         *Collection `json:"-"`
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

// ClearNoBranches clears the "no" answers on application rejection
func (entity *FinancialCard) ClearNoBranches() error {
	entity.HasCardAbuse.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialCredit represents the payload for the financial credit section.
type FinancialCredit struct {
	PayloadHasCreditCounseling Payload `json:"HasCreditCounseling" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	HasCreditCounseling *Branch     `json:"-"`
	List                *Collection `json:"-"`
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

// ClearNoBranches clears the "no" answers on application rejection
func (entity *FinancialCredit) ClearNoBranches() error {
	entity.HasCreditCounseling.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialDelinquent represents the payload for the financial delinquent section.
type FinancialDelinquent struct {
	PayloadHasDelinquent Payload `json:"HasDelinquent" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	HasDelinquent *Branch     `json:"-"`
	List          *Collection `json:"-"`
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

// ClearNoBranches clears the "no" answers on application rejection
func (entity *FinancialDelinquent) ClearNoBranches() error {
	entity.HasDelinquent.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}

// FinancialNonpayment represents the payload for the financial nonpayment section.
type FinancialNonpayment struct {
	PayloadHasNonpayment Payload `json:"HasNonpayment" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	HasNonpayment *Branch     `json:"-"`
	List          *Collection `json:"-"`
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

// ClearNoBranches clears the "no" answers on application rejection
func (entity *FinancialNonpayment) ClearNoBranches() error {
	entity.HasNonpayment.ClearNo()
	entity.List.ClearBranchNo()
	return nil
}
