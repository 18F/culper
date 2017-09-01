package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// LegalCourt structure
type LegalCourt struct {
	PayloadHasCourtActions Payload `json:"HasCourtActions" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasCourtActions *Branch `json:"-"`
	List            *Branch `json:"-"`

	// Persister specific fields
	ID                int
	AccountID         int64
	HasCourtActionsID int
	ListID            int
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
	entity.List = list.(*Branch)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *LegalCourt) Valid() (bool, error) {
	if entity.HasCourtActions.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalCourt) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalCourt{}, &orm.CreateTableOptions{
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
func (entity *LegalCourt) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalCourt) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalPoliceOffenses structure
type LegalPoliceOffenses struct {
	PayloadHasOffenses Payload `json:"HasOffenses" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOffenses *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int
	AccountID     int64
	HasOffensesID int
	ListID        int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceOffenses) Valid() (bool, error) {
	if entity.HasOffenses.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceOffenses) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalPoliceOffenses{}, &orm.CreateTableOptions{
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
func (entity *LegalPoliceOffenses) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceOffenses) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalPoliceAdditionalOffenses structure
type LegalPoliceAdditionalOffenses struct {
	PayloadHasOtherOffenses Payload `json:"HasOtherOffenses" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOtherOffenses *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int
	AccountID          int64
	HasOtherOffensesID int
	ListID             int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceAdditionalOffenses) Valid() (bool, error) {
	if entity.HasOtherOffenses.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceAdditionalOffenses) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalPoliceAdditionalOffenses{}, &orm.CreateTableOptions{
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
func (entity *LegalPoliceAdditionalOffenses) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceAdditionalOffenses) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalPoliceDomesticViolence structure
type LegalPoliceDomesticViolence struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int
	AccountID int64
	ListID    int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalPoliceDomesticViolence) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalPoliceDomesticViolence) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&LegalPoliceDomesticViolence{}, &orm.CreateTableOptions{
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
func (entity *LegalPoliceDomesticViolence) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalPoliceDomesticViolence) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalInvestigationsDebarred structure
type LegalInvestigationsDebarred struct {
	PayloadHasDebarment Payload `json:"HasDebarment" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDebarment *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasDebarmentID int
	ListID         int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsDebarred) Valid() (bool, error) {
	if entity.HasDebarment.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsDebarred) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalInvestigationsDebarred{}, &orm.CreateTableOptions{
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
func (entity *LegalInvestigationsDebarred) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the (int, database).
func (entity *LegalInvestigationsDebarred) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalInvestigationsHistory structure
type LegalInvestigationsHistory struct {
	PayloadHasHistory Payload `json:"HasHistory" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasHistory *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int
	AccountID    int64
	HasHistoryID int
	ListID       int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsHistory) Valid() (bool, error) {
	if entity.HasHistory.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsHistory) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalInvestigationsHistory{}, &orm.CreateTableOptions{
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
func (entity *LegalInvestigationsHistory) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsHistory) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalInvestigationsRevoked structure
type LegalInvestigationsRevoked struct {
	PayloadHasRevocations Payload `json:"HasRevocations" sql:"-"`
	PayloadList           Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasRevocations *Branch     `json:"-"`
	List           *Collection `json:"-"`

	// Persister specific fields
	ID               int
	AccountID        int64
	HasRevocationsID int
	ListID           int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalInvestigationsRevoked) Valid() (bool, error) {
	if entity.HasRevocations.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalInvestigationsRevoked) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalInvestigationsRevoked{}, &orm.CreateTableOptions{
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
func (entity *LegalInvestigationsRevoked) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalInvestigationsRevoked) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalTechnologyManipulating structure
type LegalTechnologyManipulating struct {
	PayloadHasManipulating Payload `json:"HasManipulating" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasManipulating *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int
	AccountID         int64
	HasManipulatingID int
	ListID            int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyManipulating) Valid() (bool, error) {
	if entity.HasManipulating.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyManipulating) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalTechnologyManipulating{}, &orm.CreateTableOptions{
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
func (entity *LegalTechnologyManipulating) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyManipulating) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalTechnologyUnauthorized structure
type LegalTechnologyUnauthorized struct {
	PayloadHasUnauthorized Payload `json:"HasUnauthorized" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasUnauthorized *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int
	AccountID         int64
	HasUnauthorizedID int
	ListID            int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyUnauthorized) Valid() (bool, error) {
	if entity.HasUnauthorized.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyUnauthorized) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalTechnologyUnauthorized{}, &orm.CreateTableOptions{
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
func (entity *LegalTechnologyUnauthorized) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnauthorized) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalTechnologyUnlawful structure
type LegalTechnologyUnlawful struct {
	PayloadHasUnlawful Payload `json:"HasUnlawful" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasUnlawful *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int
	AccountID     int64
	HasUnlawfulID int
	ListID        int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalTechnologyUnlawful) Valid() (bool, error) {
	if entity.HasUnlawful.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalTechnologyUnlawful) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalTechnologyUnlawful{}, &orm.CreateTableOptions{
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
func (entity *LegalTechnologyUnlawful) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalTechnologyUnlawful) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsActivitiesToOverthrow structure
type LegalAssociationsActivitiesToOverthrow struct {
	PayloadHasActivities Payload `json:"HasActivities" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasActivities *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int
	AccountID       int64
	HasActivitiesID int
	ListID          int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsActivitiesToOverthrow) Valid() (bool, error) {
	if entity.HasActivities.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalAssociationsActivitiesToOverthrow{}, &orm.CreateTableOptions{
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
func (entity *LegalAssociationsActivitiesToOverthrow) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsActivitiesToOverthrow) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsAdvocating structure
type LegalAssociationsAdvocating struct {
	PayloadHasAdvocated Payload `json:"HasAdvocated" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasAdvocated *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasAdvocatedID int
	ListID         int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsAdvocating) Valid() (bool, error) {
	if entity.HasAdvocated.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsAdvocating) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalAssociationsAdvocating{}, &orm.CreateTableOptions{
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
func (entity *LegalAssociationsAdvocating) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsAdvocating) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsEngagedInTerrorism structure
type LegalAssociationsEngagedInTerrorism struct {
	PayloadHasEngaged Payload `json:"HasEngaged" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasEngaged *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int
	AccountID    int64
	HasEngagedID int
	ListID       int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsEngagedInTerrorism) Valid() (bool, error) {
	if entity.HasEngaged.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsEngagedInTerrorism) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalAssociationsEngagedInTerrorism{}, &orm.CreateTableOptions{
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
func (entity *LegalAssociationsEngagedInTerrorism) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsEngagedInTerrorism) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsMembershipOverthrow structure
type LegalAssociationsMembershipOverthrow struct {
	PayloadHasOverthrow Payload `json:"HasOverthrow" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOverthrow *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasOverthrowID int
	ListID         int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsMembershipOverthrow) Valid() (bool, error) {
	if entity.HasOverthrow.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsMembershipOverthrow) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalAssociationsMembershipOverthrow{}, &orm.CreateTableOptions{
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
func (entity *LegalAssociationsMembershipOverthrow) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipOverthrow) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsMembershipViolence structure
type LegalAssociationsMembershipViolence struct {
	PayloadHasViolence Payload `json:"HasViolence" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasViolence *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int
	AccountID     int64
	HasViolenceID int
	ListID        int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsMembershipViolence) Valid() (bool, error) {
	if entity.HasViolence.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsMembershipViolence) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalAssociationsMembershipViolence{}, &orm.CreateTableOptions{
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
func (entity *LegalAssociationsMembershipViolence) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsMembershipViolence) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsTerrorismAssociation structure
type LegalAssociationsTerrorismAssociation struct {
	PayloadHasTerrorism Payload `json:"HasTerrorism" sql:"-"`
	PayloadExplanation  Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	HasTerrorism *Branch   `json:"-"`
	Explanation  *Textarea `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasTerrorismID int
	ExplanationID  int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsTerrorismAssociation) Valid() (bool, error) {
	if entity.HasTerrorism.Value == "No" {
		return true, nil
	}

	return entity.Explanation.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsTerrorismAssociation) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalAssociationsTerrorismAssociation{}, &orm.CreateTableOptions{
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
func (entity *LegalAssociationsTerrorismAssociation) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerrorismAssociation) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// LegalAssociationsTerroristOrganization structure
type LegalAssociationsTerroristOrganization struct {
	PayloadHasTerrorist Payload `json:"HasTerrorist" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasTerrorist *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasTerroristID int
	ListID         int
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

// Valid checks the value(s) against an battery of tests.
func (entity *LegalAssociationsTerroristOrganization) Valid() (bool, error) {
	if entity.HasTerrorist.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *LegalAssociationsTerroristOrganization) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&LegalAssociationsTerroristOrganization{}, &orm.CreateTableOptions{
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
func (entity *LegalAssociationsTerroristOrganization) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *LegalAssociationsTerroristOrganization) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
