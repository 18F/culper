package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
)

// LegalCourt structure
type LegalCourt struct {
	PayloadHasCourtActions Payload `json:"HasCourtActions" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCourtActions *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasCourtActionsID int `json:"-" pg:", fk:HasCourtActions"`
	ListID            int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalCourt) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasCourtActions, err := entity.PayloadHasCourtActions.Entity()
	if err != nil {
		return err
	}
	entity.HasCourtActions = hasCourtActions.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalCourt) Marshal() Payload {
	if entity.HasCourtActions != nil {
		entity.PayloadHasCourtActions = entity.HasCourtActions.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.court", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalCourt) Valid() (bool, error) {
	if entity.HasCourtActions.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalCourt) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalCourt{ID: account}, func(result interface{}) {
		previous := result.(*LegalCourt)
		if entity.HasCourtActions == nil {
			entity.HasCourtActions = &Branch{}
		}
		entity.HasCourtActionsID = previous.HasCourtActionsID
		entity.HasCourtActions.ID = previous.HasCourtActionsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasCourtActionsID, err := entity.HasCourtActions.Save(context, account)
	if err != nil {
		return hasCourtActionsID, err
	}
	entity.HasCourtActionsID = hasCourtActionsID

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
func (entity *LegalCourt) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalCourt{ID: account}, func(result interface{}) {
		previous := result.(*LegalCourt)
		if entity.HasCourtActions == nil {
			entity.HasCourtActions = &Branch{}
		}
		entity.HasCourtActionsID = previous.HasCourtActionsID
		entity.HasCourtActions.ID = previous.HasCourtActionsID
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

	if _, err := entity.HasCourtActions.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalCourt) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasCourtActionsID != 0 {
		entity.HasCourtActions = &Branch{ID: entity.HasCourtActionsID}
		if _, err := entity.HasCourtActions.Get(context, account); err != nil {
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
func (entity *LegalCourt) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalCourt) SetID(id int) {
	entity.ID = id
}

// LegalPoliceOffenses structure
type LegalPoliceOffenses struct {
	PayloadHasOffenses Payload `json:"HasOffenses" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOffenses *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasOffensesID int `json:"-" pg:", fk:HasOffenses"`
	ListID        int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceOffenses) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasOffenses, err := entity.PayloadHasOffenses.Entity()
	if err != nil {
		return err
	}
	entity.HasOffenses = hasOffenses.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalPoliceOffenses) Marshal() Payload {
	if entity.HasOffenses != nil {
		entity.PayloadHasOffenses = entity.HasOffenses.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.police.offenses", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceOffenses) Valid() (bool, error) {
	if entity.HasOffenses.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceOffenses) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalPoliceOffenses{ID: account}, func(result interface{}) {
		previous := result.(*LegalPoliceOffenses)
		if entity.HasOffenses == nil {
			entity.HasOffenses = &Branch{}
		}
		entity.HasOffensesID = previous.HasOffensesID
		entity.HasOffenses.ID = previous.HasOffensesID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasOffensesID, err := entity.HasOffenses.Save(context, account)
	if err != nil {
		return hasOffensesID, err
	}
	entity.HasOffensesID = hasOffensesID

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
func (entity *LegalPoliceOffenses) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalPoliceOffenses{ID: account}, func(result interface{}) {
		previous := result.(*LegalPoliceOffenses)
		if entity.HasOffenses == nil {
			entity.HasOffenses = &Branch{}
		}
		entity.HasOffensesID = previous.HasOffensesID
		entity.HasOffenses.ID = previous.HasOffensesID
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

	if _, err := entity.HasOffenses.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceOffenses) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasOffensesID != 0 {
		entity.HasOffenses = &Branch{ID: entity.HasOffensesID}
		if _, err := entity.HasOffenses.Get(context, account); err != nil {
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
func (entity *LegalPoliceOffenses) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalPoliceOffenses) SetID(id int) {
	entity.ID = id
}

// LegalPoliceAdditionalOffenses structure
type LegalPoliceAdditionalOffenses struct {
	PayloadHasOtherOffenses Payload `json:"HasOtherOffenses" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOtherOffenses *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasOtherOffensesID int `json:"-" pg:", fk:HasOtherOffenses"`
	ListID             int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceAdditionalOffenses) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasOtherOffenses, err := entity.PayloadHasOtherOffenses.Entity()
	if err != nil {
		return err
	}
	entity.HasOtherOffenses = hasOtherOffenses.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalPoliceAdditionalOffenses) Marshal() Payload {
	if entity.HasOtherOffenses != nil {
		entity.PayloadHasOtherOffenses = entity.HasOtherOffenses.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.police.additionaloffenses", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceAdditionalOffenses) Valid() (bool, error) {
	if entity.HasOtherOffenses.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceAdditionalOffenses) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalPoliceAdditionalOffenses{ID: account}, func(result interface{}) {
		previous := result.(*LegalPoliceAdditionalOffenses)
		if entity.HasOtherOffenses == nil {
			entity.HasOtherOffenses = &Branch{}
		}
		entity.HasOtherOffensesID = previous.HasOtherOffensesID
		entity.HasOtherOffenses.ID = previous.HasOtherOffensesID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasOtherOffensesID, err := entity.HasOtherOffenses.Save(context, account)
	if err != nil {
		return hasOtherOffensesID, err
	}
	entity.HasOtherOffensesID = hasOtherOffensesID

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
func (entity *LegalPoliceAdditionalOffenses) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalPoliceAdditionalOffenses{ID: account}, func(result interface{}) {
		previous := result.(*LegalPoliceAdditionalOffenses)
		if entity.HasOtherOffenses == nil {
			entity.HasOtherOffenses = &Branch{}
		}
		entity.HasOtherOffensesID = previous.HasOtherOffensesID
		entity.HasOtherOffenses.ID = previous.HasOtherOffensesID
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

	if _, err := entity.HasOtherOffenses.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceAdditionalOffenses) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasOtherOffensesID != 0 {
		entity.HasOtherOffenses = &Branch{ID: entity.HasOtherOffensesID}
		if _, err := entity.HasOtherOffenses.Get(context, account); err != nil {
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
func (entity *LegalPoliceAdditionalOffenses) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalPoliceAdditionalOffenses) SetID(id int) {
	entity.ID = id
}

// LegalPoliceDomesticViolence structure
type LegalPoliceDomesticViolence struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalPoliceDomesticViolence) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalPoliceDomesticViolence) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.police.domesticviolence", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceDomesticViolence) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceDomesticViolence) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalPoliceDomesticViolence{ID: account}, func(result interface{}) {
		previous := result.(*LegalPoliceDomesticViolence)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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
func (entity *LegalPoliceDomesticViolence) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalPoliceDomesticViolence{ID: account}, func(result interface{}) {
		previous := result.(*LegalPoliceDomesticViolence)
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

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceDomesticViolence) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
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
func (entity *LegalPoliceDomesticViolence) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalPoliceDomesticViolence) SetID(id int) {
	entity.ID = id
}

// LegalInvestigationsDebarred structure
type LegalInvestigationsDebarred struct {
	PayloadHasDebarment Payload `json:"HasDebarment" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDebarment *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasDebarmentID int `json:"-" pg:", fk:HasDebarment"`
	ListID         int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsDebarred) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDebarment, err := entity.PayloadHasDebarment.Entity()
	if err != nil {
		return err
	}
	entity.HasDebarment = hasDebarment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalInvestigationsDebarred) Marshal() Payload {
	if entity.HasDebarment != nil {
		entity.PayloadHasDebarment = entity.HasDebarment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.investigations.debarred", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsDebarred) Valid() (bool, error) {
	if entity.HasDebarment.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsDebarred) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalInvestigationsDebarred{ID: account}, func(result interface{}) {
		previous := result.(*LegalInvestigationsDebarred)
		if entity.HasDebarment == nil {
			entity.HasDebarment = &Branch{}
		}
		entity.HasDebarmentID = previous.HasDebarmentID
		entity.HasDebarment.ID = previous.HasDebarmentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasDebarmentID, err := entity.HasDebarment.Save(context, account)
	if err != nil {
		return hasDebarmentID, err
	}
	entity.HasDebarmentID = hasDebarmentID

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
func (entity *LegalInvestigationsDebarred) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalInvestigationsDebarred{ID: account}, func(result interface{}) {
		previous := result.(*LegalInvestigationsDebarred)
		if entity.HasDebarment == nil {
			entity.HasDebarment = &Branch{}
		}
		entity.HasDebarmentID = previous.HasDebarmentID
		entity.HasDebarment.ID = previous.HasDebarmentID
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

	if _, err := entity.HasDebarment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the (int, database).
func (entity *LegalInvestigationsDebarred) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasDebarmentID != 0 {
		entity.HasDebarment = &Branch{ID: entity.HasDebarmentID}
		if _, err := entity.HasDebarment.Get(context, account); err != nil {
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
func (entity *LegalInvestigationsDebarred) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalInvestigationsDebarred) SetID(id int) {
	entity.ID = id
}

// LegalInvestigationsHistory structure
type LegalInvestigationsHistory struct {
	PayloadHasHistory Payload `json:"HasHistory" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasHistory *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int `json:"-"`
	HasHistoryID int `json:"-" pg:", fk:HasHistory"`
	ListID       int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsHistory) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasHistory, err := entity.PayloadHasHistory.Entity()
	if err != nil {
		return err
	}
	entity.HasHistory = hasHistory.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalInvestigationsHistory) Marshal() Payload {
	if entity.HasHistory != nil {
		entity.PayloadHasHistory = entity.HasHistory.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.investigations.history", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsHistory) Valid() (bool, error) {
	if entity.HasHistory.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsHistory) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalInvestigationsHistory{ID: account}, func(result interface{}) {
		previous := result.(*LegalInvestigationsHistory)
		if entity.HasHistory == nil {
			entity.HasHistory = &Branch{}
		}
		entity.HasHistoryID = previous.HasHistoryID
		entity.HasHistory.ID = previous.HasHistoryID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasHistoryID, err := entity.HasHistory.Save(context, account)
	if err != nil {
		return hasHistoryID, err
	}
	entity.HasHistoryID = hasHistoryID

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
func (entity *LegalInvestigationsHistory) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalInvestigationsHistory{ID: account}, func(result interface{}) {
		previous := result.(*LegalInvestigationsHistory)
		if entity.HasHistory == nil {
			entity.HasHistory = &Branch{}
		}
		entity.HasHistoryID = previous.HasHistoryID
		entity.HasHistory.ID = previous.HasHistoryID
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

	if _, err := entity.HasHistory.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsHistory) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasHistoryID != 0 {
		entity.HasHistory = &Branch{ID: entity.HasHistoryID}
		if _, err := entity.HasHistory.Get(context, account); err != nil {
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
func (entity *LegalInvestigationsHistory) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalInvestigationsHistory) SetID(id int) {
	entity.ID = id
}

// LegalInvestigationsRevoked structure
type LegalInvestigationsRevoked struct {
	PayloadHasRevocations Payload `json:"HasRevocations" sql:"-"`
	PayloadList           Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasRevocations *Branch     `json:"-"`
	List           *Collection `json:"-"`

	// Persister specific fields
	ID               int `json:"-"`
	HasRevocationsID int `json:"-" pg:", fk:HasRevocations"`
	ListID           int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalInvestigationsRevoked) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasRevocations, err := entity.PayloadHasRevocations.Entity()
	if err != nil {
		return err
	}
	entity.HasRevocations = hasRevocations.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalInvestigationsRevoked) Marshal() Payload {
	if entity.HasRevocations != nil {
		entity.PayloadHasRevocations = entity.HasRevocations.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.investigations.revoked", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsRevoked) Valid() (bool, error) {
	if entity.HasRevocations.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsRevoked) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalInvestigationsRevoked{ID: account}, func(result interface{}) {
		previous := result.(*LegalInvestigationsRevoked)
		if entity.HasRevocations == nil {
			entity.HasRevocations = &Branch{}
		}
		entity.HasRevocationsID = previous.HasRevocationsID
		entity.HasRevocations.ID = previous.HasRevocationsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasRevocationsID, err := entity.HasRevocations.Save(context, account)
	if err != nil {
		return hasRevocationsID, err
	}
	entity.HasRevocationsID = hasRevocationsID

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
func (entity *LegalInvestigationsRevoked) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalInvestigationsRevoked{ID: account}, func(result interface{}) {
		previous := result.(*LegalInvestigationsRevoked)
		if entity.HasRevocations == nil {
			entity.HasRevocations = &Branch{}
		}
		entity.HasRevocationsID = previous.HasRevocationsID
		entity.HasRevocations.ID = previous.HasRevocationsID
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

	if _, err := entity.HasRevocations.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsRevoked) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasRevocationsID != 0 {
		entity.HasRevocations = &Branch{ID: entity.HasRevocationsID}
		if _, err := entity.HasRevocations.Get(context, account); err != nil {
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
func (entity *LegalInvestigationsRevoked) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalInvestigationsRevoked) SetID(id int) {
	entity.ID = id
}

// LegalTechnologyManipulating structure
type LegalTechnologyManipulating struct {
	PayloadHasManipulating Payload `json:"HasManipulating" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasManipulating *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasManipulatingID int `json:"-" pg:", fk:HasManipulating"`
	ListID            int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyManipulating) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasManipulating, err := entity.PayloadHasManipulating.Entity()
	if err != nil {
		return err
	}
	entity.HasManipulating = hasManipulating.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalTechnologyManipulating) Marshal() Payload {
	if entity.HasManipulating != nil {
		entity.PayloadHasManipulating = entity.HasManipulating.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.technology.manipulating", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyManipulating) Valid() (bool, error) {
	if entity.HasManipulating.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyManipulating) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalTechnologyManipulating{ID: account}, func(result interface{}) {
		previous := result.(*LegalTechnologyManipulating)
		if entity.HasManipulating == nil {
			entity.HasManipulating = &Branch{}
		}
		entity.HasManipulatingID = previous.HasManipulatingID
		entity.HasManipulating.ID = previous.HasManipulatingID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasManipulatingID, err := entity.HasManipulating.Save(context, account)
	if err != nil {
		return hasManipulatingID, err
	}
	entity.HasManipulatingID = hasManipulatingID

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
func (entity *LegalTechnologyManipulating) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalTechnologyManipulating{ID: account}, func(result interface{}) {
		previous := result.(*LegalTechnologyManipulating)
		if entity.HasManipulating == nil {
			entity.HasManipulating = &Branch{}
		}
		entity.HasManipulatingID = previous.HasManipulatingID
		entity.HasManipulating.ID = previous.HasManipulatingID
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

	if _, err := entity.HasManipulating.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyManipulating) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasManipulatingID != 0 {
		entity.HasManipulating = &Branch{ID: entity.HasManipulatingID}
		if _, err := entity.HasManipulating.Get(context, account); err != nil {
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
func (entity *LegalTechnologyManipulating) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalTechnologyManipulating) SetID(id int) {
	entity.ID = id
}

// LegalTechnologyUnauthorized structure
type LegalTechnologyUnauthorized struct {
	PayloadHasUnauthorized Payload `json:"HasUnauthorized" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasUnauthorized *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasUnauthorizedID int `json:"-" pg:", fk:HasUnauthorized"`
	ListID            int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyUnauthorized) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasUnauthorized, err := entity.PayloadHasUnauthorized.Entity()
	if err != nil {
		return err
	}
	entity.HasUnauthorized = hasUnauthorized.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalTechnologyUnauthorized) Marshal() Payload {
	if entity.HasUnauthorized != nil {
		entity.PayloadHasUnauthorized = entity.HasUnauthorized.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.technology.unauthorized", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyUnauthorized) Valid() (bool, error) {
	if entity.HasUnauthorized.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyUnauthorized) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalTechnologyUnauthorized{ID: account}, func(result interface{}) {
		previous := result.(*LegalTechnologyUnauthorized)
		if entity.HasUnauthorized == nil {
			entity.HasUnauthorized = &Branch{}
		}
		entity.HasUnauthorizedID = previous.HasUnauthorizedID
		entity.HasUnauthorized.ID = previous.HasUnauthorizedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasUnauthorizedID, err := entity.HasUnauthorized.Save(context, account)
	if err != nil {
		return hasUnauthorizedID, err
	}
	entity.HasUnauthorizedID = hasUnauthorizedID

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
func (entity *LegalTechnologyUnauthorized) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalTechnologyUnauthorized{ID: account}, func(result interface{}) {
		previous := result.(*LegalTechnologyUnauthorized)
		if entity.HasUnauthorized == nil {
			entity.HasUnauthorized = &Branch{}
		}
		entity.HasUnauthorizedID = previous.HasUnauthorizedID
		entity.HasUnauthorized.ID = previous.HasUnauthorizedID
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

	if _, err := entity.HasUnauthorized.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnauthorized) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasUnauthorizedID != 0 {
		entity.HasUnauthorized = &Branch{ID: entity.HasUnauthorizedID}
		if _, err := entity.HasUnauthorized.Get(context, account); err != nil {
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
func (entity *LegalTechnologyUnauthorized) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalTechnologyUnauthorized) SetID(id int) {
	entity.ID = id
}

// LegalTechnologyUnlawful structure
type LegalTechnologyUnlawful struct {
	PayloadHasUnlawful Payload `json:"HasUnlawful" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasUnlawful *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasUnlawfulID int `json:"-" pg:", fk:HasUnlawful"`
	ListID        int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalTechnologyUnlawful) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasUnlawful, err := entity.PayloadHasUnlawful.Entity()
	if err != nil {
		return err
	}
	entity.HasUnlawful = hasUnlawful.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalTechnologyUnlawful) Marshal() Payload {
	if entity.HasUnlawful != nil {
		entity.PayloadHasUnlawful = entity.HasUnlawful.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.technology.unlawful", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyUnlawful) Valid() (bool, error) {
	if entity.HasUnlawful.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyUnlawful) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalTechnologyUnlawful{ID: account}, func(result interface{}) {
		previous := result.(*LegalTechnologyUnlawful)
		if entity.HasUnlawful == nil {
			entity.HasUnlawful = &Branch{}
		}
		entity.HasUnlawfulID = previous.HasUnlawfulID
		entity.HasUnlawful.ID = previous.HasUnlawfulID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasUnlawfulID, err := entity.HasUnlawful.Save(context, account)
	if err != nil {
		return hasUnlawfulID, err
	}
	entity.HasUnlawfulID = hasUnlawfulID

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
func (entity *LegalTechnologyUnlawful) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalTechnologyUnlawful{ID: account}, func(result interface{}) {
		previous := result.(*LegalTechnologyUnlawful)
		if entity.HasUnlawful == nil {
			entity.HasUnlawful = &Branch{}
		}
		entity.HasUnlawfulID = previous.HasUnlawfulID
		entity.HasUnlawful.ID = previous.HasUnlawfulID
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

	if _, err := entity.HasUnlawful.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnlawful) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasUnlawfulID != 0 {
		entity.HasUnlawful = &Branch{ID: entity.HasUnlawfulID}
		if _, err := entity.HasUnlawful.Get(context, account); err != nil {
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
func (entity *LegalTechnologyUnlawful) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalTechnologyUnlawful) SetID(id int) {
	entity.ID = id
}

// LegalAssociationsActivitiesToOverthrow structure
type LegalAssociationsActivitiesToOverthrow struct {
	PayloadHasActivities Payload `json:"HasActivities" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasActivities *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasActivitiesID int `json:"-" pg:", fk:HasActivities"`
	ListID          int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsActivitiesToOverthrow) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasActivities, err := entity.PayloadHasActivities.Entity()
	if err != nil {
		return err
	}
	entity.HasActivities = hasActivities.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsActivitiesToOverthrow) Marshal() Payload {
	if entity.HasActivities != nil {
		entity.PayloadHasActivities = entity.HasActivities.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.activities-to-overthrow", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsActivitiesToOverthrow) Valid() (bool, error) {
	if entity.HasActivities.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsActivitiesToOverthrow{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsActivitiesToOverthrow)
		if entity.HasActivities == nil {
			entity.HasActivities = &Branch{}
		}
		entity.HasActivitiesID = previous.HasActivitiesID
		entity.HasActivities.ID = previous.HasActivitiesID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasActivitiesID, err := entity.HasActivities.Save(context, account)
	if err != nil {
		return hasActivitiesID, err
	}
	entity.HasActivitiesID = hasActivitiesID

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
func (entity *LegalAssociationsActivitiesToOverthrow) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsActivitiesToOverthrow{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsActivitiesToOverthrow)
		if entity.HasActivities == nil {
			entity.HasActivities = &Branch{}
		}
		entity.HasActivitiesID = previous.HasActivitiesID
		entity.HasActivities.ID = previous.HasActivitiesID
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

	if _, err := entity.HasActivities.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasActivitiesID != 0 {
		entity.HasActivities = &Branch{ID: entity.HasActivitiesID}
		if _, err := entity.HasActivities.Get(context, account); err != nil {
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
func (entity *LegalAssociationsActivitiesToOverthrow) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalAssociationsActivitiesToOverthrow) SetID(id int) {
	entity.ID = id
}

// LegalAssociationsAdvocating structure
type LegalAssociationsAdvocating struct {
	PayloadHasAdvocated Payload `json:"HasAdvocated" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasAdvocated *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasAdvocatedID int `json:"-" pg:", fk:HasAdvocated"`
	ListID         int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsAdvocating) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasAdvocated, err := entity.PayloadHasAdvocated.Entity()
	if err != nil {
		return err
	}
	entity.HasAdvocated = hasAdvocated.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsAdvocating) Marshal() Payload {
	if entity.HasAdvocated != nil {
		entity.PayloadHasAdvocated = entity.HasAdvocated.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.advocating", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsAdvocating) Valid() (bool, error) {
	if entity.HasAdvocated.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsAdvocating) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsAdvocating{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsAdvocating)
		if entity.HasAdvocated == nil {
			entity.HasAdvocated = &Branch{}
		}
		entity.HasAdvocatedID = previous.HasAdvocatedID
		entity.HasAdvocated.ID = previous.HasAdvocatedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasAdvocatedID, err := entity.HasAdvocated.Save(context, account)
	if err != nil {
		return hasAdvocatedID, err
	}
	entity.HasAdvocatedID = hasAdvocatedID

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
func (entity *LegalAssociationsAdvocating) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsAdvocating{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsAdvocating)
		if entity.HasAdvocated == nil {
			entity.HasAdvocated = &Branch{}
		}
		entity.HasAdvocatedID = previous.HasAdvocatedID
		entity.HasAdvocated.ID = previous.HasAdvocatedID
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

	if _, err := entity.HasAdvocated.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsAdvocating) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasAdvocatedID != 0 {
		entity.HasAdvocated = &Branch{ID: entity.HasAdvocatedID}
		if _, err := entity.HasAdvocated.Get(context, account); err != nil {
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
func (entity *LegalAssociationsAdvocating) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalAssociationsAdvocating) SetID(id int) {
	entity.ID = id
}

// LegalAssociationsEngagedInTerrorism structure
type LegalAssociationsEngagedInTerrorism struct {
	PayloadHasEngaged Payload `json:"HasEngaged" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasEngaged *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int `json:"-"`
	HasEngagedID int `json:"-" pg:", fk:HasEngaged"`
	ListID       int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsEngagedInTerrorism) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasEngaged, err := entity.PayloadHasEngaged.Entity()
	if err != nil {
		return err
	}
	entity.HasEngaged = hasEngaged.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsEngagedInTerrorism) Marshal() Payload {
	if entity.HasEngaged != nil {
		entity.PayloadHasEngaged = entity.HasEngaged.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.engaged-in-terrorism", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsEngagedInTerrorism) Valid() (bool, error) {
	if entity.HasEngaged.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsEngagedInTerrorism) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsEngagedInTerrorism{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsEngagedInTerrorism)
		if entity.HasEngaged == nil {
			entity.HasEngaged = &Branch{}
		}
		entity.HasEngagedID = previous.HasEngagedID
		entity.HasEngaged.ID = previous.HasEngagedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasEngagedID, err := entity.HasEngaged.Save(context, account)
	if err != nil {
		return hasEngagedID, err
	}
	entity.HasEngagedID = hasEngagedID

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
func (entity *LegalAssociationsEngagedInTerrorism) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsEngagedInTerrorism{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsEngagedInTerrorism)
		if entity.HasEngaged == nil {
			entity.HasEngaged = &Branch{}
		}
		entity.HasEngagedID = previous.HasEngagedID
		entity.HasEngaged.ID = previous.HasEngagedID
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

	if _, err := entity.HasEngaged.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsEngagedInTerrorism) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasEngagedID != 0 {
		entity.HasEngaged = &Branch{ID: entity.HasEngagedID}
		if _, err := entity.HasEngaged.Get(context, account); err != nil {
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
func (entity *LegalAssociationsEngagedInTerrorism) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalAssociationsEngagedInTerrorism) SetID(id int) {
	entity.ID = id
}

// LegalAssociationsMembershipOverthrow structure
type LegalAssociationsMembershipOverthrow struct {
	PayloadHasOverthrow Payload `json:"HasOverthrow" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOverthrow *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasOverthrowID int `json:"-" pg:", fk:HasOverthrow"`
	ListID         int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsMembershipOverthrow) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasOverthrow, err := entity.PayloadHasOverthrow.Entity()
	if err != nil {
		return err
	}
	entity.HasOverthrow = hasOverthrow.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsMembershipOverthrow) Marshal() Payload {
	if entity.HasOverthrow != nil {
		entity.PayloadHasOverthrow = entity.HasOverthrow.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.membership-overthrow", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsMembershipOverthrow) Valid() (bool, error) {
	if entity.HasOverthrow.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsMembershipOverthrow) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsMembershipOverthrow{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsMembershipOverthrow)
		if entity.HasOverthrow == nil {
			entity.HasOverthrow = &Branch{}
		}
		entity.HasOverthrowID = previous.HasOverthrowID
		entity.HasOverthrow.ID = previous.HasOverthrowID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasOverthrowID, err := entity.HasOverthrow.Save(context, account)
	if err != nil {
		return hasOverthrowID, err
	}
	entity.HasOverthrowID = hasOverthrowID

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
func (entity *LegalAssociationsMembershipOverthrow) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsMembershipOverthrow{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsMembershipOverthrow)
		if entity.HasOverthrow == nil {
			entity.HasOverthrow = &Branch{}
		}
		entity.HasOverthrowID = previous.HasOverthrowID
		entity.HasOverthrow.ID = previous.HasOverthrowID
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

	if _, err := entity.HasOverthrow.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipOverthrow) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasOverthrowID != 0 {
		entity.HasOverthrow = &Branch{ID: entity.HasOverthrowID}
		if _, err := entity.HasOverthrow.Get(context, account); err != nil {
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
func (entity *LegalAssociationsMembershipOverthrow) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalAssociationsMembershipOverthrow) SetID(id int) {
	entity.ID = id
}

// LegalAssociationsMembershipViolence structure
type LegalAssociationsMembershipViolence struct {
	PayloadHasViolence Payload `json:"HasViolence" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasViolence *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasViolenceID int `json:"-" pg:", fk:HasViolence"`
	ListID        int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsMembershipViolence) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasViolence, err := entity.PayloadHasViolence.Entity()
	if err != nil {
		return err
	}
	entity.HasViolence = hasViolence.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsMembershipViolence) Marshal() Payload {
	if entity.HasViolence != nil {
		entity.PayloadHasViolence = entity.HasViolence.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.membership-violence-or-force", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsMembershipViolence) Valid() (bool, error) {
	if entity.HasViolence.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsMembershipViolence) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsMembershipViolence{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsMembershipViolence)
		if entity.HasViolence == nil {
			entity.HasViolence = &Branch{}
		}
		entity.HasViolenceID = previous.HasViolenceID
		entity.HasViolence.ID = previous.HasViolenceID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasViolenceID, err := entity.HasViolence.Save(context, account)
	if err != nil {
		return hasViolenceID, err
	}
	entity.HasViolenceID = hasViolenceID

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
func (entity *LegalAssociationsMembershipViolence) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsMembershipViolence{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsMembershipViolence)
		if entity.HasViolence == nil {
			entity.HasViolence = &Branch{}
		}
		entity.HasViolenceID = previous.HasViolenceID
		entity.HasViolence.ID = previous.HasViolenceID
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

	if _, err := entity.HasViolence.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipViolence) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasViolenceID != 0 {
		entity.HasViolence = &Branch{ID: entity.HasViolenceID}
		if _, err := entity.HasViolence.Get(context, account); err != nil {
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
func (entity *LegalAssociationsMembershipViolence) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalAssociationsMembershipViolence) SetID(id int) {
	entity.ID = id
}

// LegalAssociationsTerrorismAssociation structure
type LegalAssociationsTerrorismAssociation struct {
	PayloadHasTerrorism Payload `json:"HasTerrorism" sql:"-"`
	PayloadExplanation  Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	HasTerrorism *Branch   `json:"-"`
	Explanation  *Textarea `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasTerrorismID int `json:"-" pg:", fk:HasTerrorism"`
	ExplanationID  int `json:"-" pg:", fk:Explanation"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsTerrorismAssociation) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasTerrorism, err := entity.PayloadHasTerrorism.Entity()
	if err != nil {
		return err
	}
	entity.HasTerrorism = hasTerrorism.(*Branch)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsTerrorismAssociation) Marshal() Payload {
	if entity.HasTerrorism != nil {
		entity.PayloadHasTerrorism = entity.HasTerrorism.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.terrorism-association", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsTerrorismAssociation) Valid() (bool, error) {
	if entity.HasTerrorism.Value == "No" {
		return true, nil
	}

	return entity.Explanation.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsTerrorismAssociation) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsTerrorismAssociation{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsTerrorismAssociation)
		if entity.HasTerrorism == nil {
			entity.HasTerrorism = &Branch{}
		}
		entity.HasTerrorismID = previous.HasTerrorismID
		entity.HasTerrorism.ID = previous.HasTerrorismID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
	})

	hasTerrorismID, err := entity.HasTerrorism.Save(context, account)
	if err != nil {
		return hasTerrorismID, err
	}
	entity.HasTerrorismID = hasTerrorismID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *LegalAssociationsTerrorismAssociation) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsTerrorismAssociation{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsTerrorismAssociation)
		if entity.HasTerrorism == nil {
			entity.HasTerrorism = &Branch{}
		}
		entity.HasTerrorismID = previous.HasTerrorismID
		entity.HasTerrorism.ID = previous.HasTerrorismID
		if entity.Explanation == nil {
			entity.Explanation = &Textarea{}
		}
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasTerrorism.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerrorismAssociation) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasTerrorismID != 0 {
		entity.HasTerrorism = &Branch{ID: entity.HasTerrorismID}
		if _, err := entity.HasTerrorism.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExplanationID != 0 {
		entity.Explanation = &Textarea{ID: entity.ExplanationID}
		if _, err := entity.Explanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *LegalAssociationsTerrorismAssociation) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalAssociationsTerrorismAssociation) SetID(id int) {
	entity.ID = id
}

// LegalAssociationsTerroristOrganization structure
type LegalAssociationsTerroristOrganization struct {
	PayloadHasTerrorist Payload `json:"HasTerrorist" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasTerrorist *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasTerroristID int `json:"-" pg:", fk:HasTerrorist"`
	ListID         int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalAssociationsTerroristOrganization) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasTerrorist, err := entity.PayloadHasTerrorist.Entity()
	if err != nil {
		return err
	}
	entity.HasTerrorist = hasTerrorist.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *LegalAssociationsTerroristOrganization) Marshal() Payload {
	if entity.HasTerrorist != nil {
		entity.PayloadHasTerrorist = entity.HasTerrorist.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("legal.associations.terrorist-organization", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsTerroristOrganization) Valid() (bool, error) {
	if entity.HasTerrorist.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsTerroristOrganization) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsTerroristOrganization{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsTerroristOrganization)
		if entity.HasTerrorist == nil {
			entity.HasTerrorist = &Branch{}
		}
		entity.HasTerroristID = previous.HasTerroristID
		entity.HasTerrorist.ID = previous.HasTerroristID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	hasTerroristID, err := entity.HasTerrorist.Save(context, account)
	if err != nil {
		return hasTerroristID, err
	}
	entity.HasTerroristID = hasTerroristID

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
func (entity *LegalAssociationsTerroristOrganization) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalAssociationsTerroristOrganization{ID: account}, func(result interface{}) {
		previous := result.(*LegalAssociationsTerroristOrganization)
		if entity.HasTerrorist == nil {
			entity.HasTerrorist = &Branch{}
		}
		entity.HasTerroristID = previous.HasTerroristID
		entity.HasTerrorist.ID = previous.HasTerroristID
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

	if _, err := entity.HasTerrorist.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerroristOrganization) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasTerroristID != 0 {
		entity.HasTerrorist = &Branch{ID: entity.HasTerroristID}
		if _, err := entity.HasTerrorist.Get(context, account); err != nil {
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
func (entity *LegalAssociationsTerroristOrganization) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalAssociationsTerroristOrganization) SetID(id int) {
	entity.ID = id
}

// LegalComments subsection of identification section.
type LegalComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *LegalComments) Unmarshal(raw []byte) error {
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
func (entity *LegalComments) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("identification.comments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalComments) Valid() (bool, error) {
	return entity.Comments.Valid()
}

// Save will create or update the database.
func (entity *LegalComments) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalComments{ID: account}, func(result interface{}) {
		previous := result.(*LegalComments)
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
func (entity *LegalComments) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&LegalComments{ID: account}, func(result interface{}) {
		previous := result.(*LegalComments)
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
func (entity *LegalComments) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *LegalComments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *LegalComments) SetID(id int) {
	entity.ID = id
}
