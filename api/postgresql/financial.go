package postgresql

import "encoding/json"

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
func (entity *FinancialBankruptcy) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialBankruptcy{ID: account}, func(result interface{}) {
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
func (entity *FinancialBankruptcy) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialBankruptcy{ID: account}, func(result interface{}) {
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
func (entity *FinancialBankruptcy) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *FinancialGambling) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialGambling{ID: account}, func(result interface{}) {
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
func (entity *FinancialGambling) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialGambling{ID: account}, func(result interface{}) {
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
func (entity *FinancialGambling) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *FinancialTaxes) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialTaxes{ID: account}, func(result interface{}) {
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
func (entity *FinancialTaxes) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialTaxes{ID: account}, func(result interface{}) {
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
func (entity *FinancialTaxes) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *FinancialCard) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialCard{ID: account}, func(result interface{}) {
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
func (entity *FinancialCard) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialCard{ID: account}, func(result interface{}) {
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
func (entity *FinancialCard) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *FinancialCredit) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialCredit{ID: account}, func(result interface{}) {
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
func (entity *FinancialCredit) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialCredit{ID: account}, func(result interface{}) {
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
func (entity *FinancialCredit) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *FinancialDelinquent) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialDelinquent{ID: account}, func(result interface{}) {
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
func (entity *FinancialDelinquent) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialDelinquent{ID: account}, func(result interface{}) {
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
func (entity *FinancialDelinquent) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *FinancialNonpayment) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialNonpayment{ID: account}, func(result interface{}) {
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
func (entity *FinancialNonpayment) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialNonpayment{ID: account}, func(result interface{}) {
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
func (entity *FinancialNonpayment) Get(context *db.DatabaseContext, account int) (int, error) {
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
	return MarshalPayloadEntity("identification.comments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *FinancialComments) Valid() (bool, error) {
	return entity.Comments.Valid()
}

// Save will create or update the database.
func (entity *FinancialComments) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialComments{ID: account}, func(result interface{}) {
		previous := result.(*FinancialComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.Comments.ID = previous.CommentsID
	})

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
func (entity *FinancialComments) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&FinancialComments{ID: account}, func(result interface{}) {
		previous := result.(*FinancialComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.CommentsID = previous.CommentsID
	})

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
func (entity *FinancialComments) Get(context *db.DatabaseContext, account int) (int, error) {
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
