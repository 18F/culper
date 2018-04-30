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

// Save will create or update the database.
func (entity *FinancialBankruptcy) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialBankruptcy) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasBankruptcy.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialBankruptcy) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasBankruptcyID != 0 {
		entity.HasBankruptcy = &Branch{ID: entity.HasBankruptcyID}
		if _, err := entity.HasBankruptcy.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialBankruptcy) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialBankruptcy) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *FinancialBankruptcy) Find(context DatabaseService) error {
	context.Find(&FinancialBankruptcy{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialBankruptcy)
		if entity.HasBankruptcy == nil {
			entity.HasBankruptcy = &Branch{}
		}
		entity.HasBankruptcyID = previous.HasBankruptcyID
		entity.HasBankruptcy.ID = previous.HasBankruptcyID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
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

// Save will create or update the database.
func (entity *FinancialGambling) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialGambling) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasGamblingDebt.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialGambling) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasGamblingDebtID != 0 {
		entity.HasGamblingDebt = &Branch{ID: entity.HasGamblingDebtID}
		if _, err := entity.HasGamblingDebt.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialGambling) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialGambling) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *FinancialGambling) Find(context DatabaseService) error {
	context.Find(&FinancialGambling{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialGambling)
		if entity.HasGamblingDebt == nil {
			entity.HasGamblingDebt = &Branch{}
		}
		entity.HasGamblingDebtID = previous.HasGamblingDebtID
		entity.HasGamblingDebt.ID = previous.HasGamblingDebtID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
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

// Save will create or update the database.
func (entity *FinancialTaxes) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialTaxes) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasTaxes.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialTaxes) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasTaxesID != 0 {
		entity.HasTaxes = &Branch{ID: entity.HasTaxesID}
		if _, err := entity.HasTaxes.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialTaxes) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialTaxes) SetID(id int) {
	entity.ID = id
}

// Find is not used for attachments. Please use the `Get` method.
func (entity *FinancialTaxes) Find(context DatabaseService) error {
	context.Find(&FinancialTaxes{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialTaxes)
		if entity.HasTaxes == nil {
			entity.HasTaxes = &Branch{}
		}
		entity.HasTaxesID = previous.HasTaxesID
		entity.HasTaxes.ID = previous.HasTaxesID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
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

// Save will create or update the database.
func (entity *FinancialCard) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialCard) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasCardAbuse.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialCard) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasCardAbuseID != 0 {
		entity.HasCardAbuse = &Branch{ID: entity.HasCardAbuseID}
		if _, err := entity.HasCardAbuse.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialCard) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialCard) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *FinancialCard) Find(context DatabaseService) error {
	context.Find(&FinancialCard{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialCard)
		if entity.HasCardAbuse == nil {
			entity.HasCardAbuse = &Branch{}
		}
		entity.HasCardAbuseID = previous.HasCardAbuseID
		entity.HasCardAbuse.ID = previous.HasCardAbuseID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
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

// Save will create or update the database.
func (entity *FinancialCredit) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialCredit) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasCreditCounseling.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialCredit) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasCreditCounselingID != 0 {
		entity.HasCreditCounseling = &Branch{ID: entity.HasCreditCounselingID}
		if _, err := entity.HasCreditCounseling.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialCredit) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialCredit) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *FinancialCredit) Find(context DatabaseService) error {
	context.Find(&FinancialCredit{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialCredit)
		if entity.HasCreditCounseling == nil {
			entity.HasCreditCounseling = &Branch{}
		}
		entity.HasCreditCounselingID = previous.HasCreditCounselingID
		entity.HasCreditCounseling.ID = previous.HasCreditCounselingID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
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

// Save will create or update the database.
func (entity *FinancialDelinquent) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialDelinquent) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasDelinquent.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialDelinquent) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasDelinquentID != 0 {
		entity.HasDelinquent = &Branch{ID: entity.HasDelinquentID}
		if _, err := entity.HasDelinquent.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialDelinquent) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialDelinquent) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *FinancialDelinquent) Find(context DatabaseService) error {
	context.Find(&FinancialDelinquent{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialDelinquent)
		if entity.HasDelinquent == nil {
			entity.HasDelinquent = &Branch{}
		}
		entity.HasDelinquentID = previous.HasDelinquentID
		entity.HasDelinquent.ID = previous.HasDelinquentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
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

// Save will create or update the database.
func (entity *FinancialNonpayment) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialNonpayment) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasNonpayment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialNonpayment) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasNonpaymentID != 0 {
		entity.HasNonpayment = &Branch{ID: entity.HasNonpaymentID}
		if _, err := entity.HasNonpayment.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialNonpayment) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialNonpayment) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *FinancialNonpayment) Find(context DatabaseService) error {
	context.Find(&FinancialNonpayment{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialNonpayment)
		if entity.HasNonpayment == nil {
			entity.HasNonpayment = &Branch{}
		}
		entity.HasNonpaymentID = previous.HasNonpaymentID
		entity.HasNonpayment.ID = previous.HasNonpaymentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}

// FinancialComments represents the payload for the financial comments section.
type FinancialComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *FinancialComments) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Text)

	return err
}

// Marshal to payload structure
func (entity *FinancialComments) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("financial.comments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialComments) Valid() (bool, error) {
	return entity.Comments.Valid()
}

// Save will create or update the database.
func (entity *FinancialComments) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	commentsID, err := entity.Comments.Save(context, account)
	if err != nil {
		return commentsID, err
	}
	entity.CommentsID = commentsID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *FinancialComments) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *FinancialComments) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		entity.Comments = &Text{ID: entity.CommentsID}
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *FinancialComments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *FinancialComments) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *FinancialComments) Find(context DatabaseService) error {
	context.Find(&FinancialComments{ID: entity.ID}, func(result interface{}) {
		previous := result.(*FinancialComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.Comments.ID = previous.CommentsID
	})
	return nil
}
