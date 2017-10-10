package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

type SubstanceDrugUsage struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int
	AccountID   int64
	UsedDrugsID int
	ListID      int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugUsage) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugUsage) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.UsedDrugs.Valid(); !ok {
		stack.Append("DrugUsage", err)
	}

	if entity.UsedDrugs.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("DrugUsage", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugUsage) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	usedDrugsID, err := entity.UsedDrugs.Save(context, account)
	if err != nil {
		return usedDrugsID, err
	}
	entity.UsedDrugsID = usedDrugsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceDrugUsage{}, &orm.CreateTableOptions{
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
func (entity *SubstanceDrugUsage) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugUsage{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugUsage) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugUsage{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.UsedDrugsID != 0 {
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceDrugPurchase struct {
	PayloadInvolved Payload `json:"Involved" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	Involved *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int
	AccountID  int64
	InvolvedID int
	ListID     int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugPurchase) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	involved, err := entity.PayloadInvolved.Entity()
	if err != nil {
		return err
	}
	entity.Involved = involved.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugPurchase) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Involved.Valid(); !ok {
		stack.Append("DrugPurchase", err)
	}

	if entity.Involved.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("DrugPurchase", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugPurchase) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	involvedID, err := entity.Involved.Save(context, account)
	if err != nil {
		return involvedID, err
	}
	entity.InvolvedID = involvedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceDrugPurchase{}, &orm.CreateTableOptions{
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
func (entity *SubstanceDrugPurchase) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugPurchase{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Involved.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPurchase) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugPurchase{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.InvolvedID != 0 {
		if _, err := entity.Involved.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceDrugClearance struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int
	AccountID   int64
	UsedDrugsID int
	ListID      int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugClearance) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugClearance) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.UsedDrugs.Valid(); !ok {
		stack.Append("DrugClearance", err)
	}

	if entity.UsedDrugs.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("DrugClearance", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugClearance) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	usedDrugsID, err := entity.UsedDrugs.Save(context, account)
	if err != nil {
		return usedDrugsID, err
	}
	entity.UsedDrugsID = usedDrugsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceDrugClearance{}, &orm.CreateTableOptions{
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
func (entity *SubstanceDrugClearance) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugClearance{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugClearance) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugClearance{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.UsedDrugsID != 0 {
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceDrugPublicSafety struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int
	AccountID   int64
	UsedDrugsID int
	ListID      int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugPublicSafety) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugPublicSafety) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.UsedDrugs.Valid(); !ok {
		stack.Append("PublicSafety", err)
	}

	if entity.UsedDrugs.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("PublicSafety", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugPublicSafety) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	usedDrugsID, err := entity.UsedDrugs.Save(context, account)
	if err != nil {
		return usedDrugsID, err
	}
	entity.UsedDrugsID = usedDrugsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceDrugPublicSafety{}, &orm.CreateTableOptions{
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
func (entity *SubstanceDrugPublicSafety) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugPublicSafety{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPublicSafety) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugPublicSafety{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.UsedDrugsID != 0 {
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceDrugMisuse struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int
	AccountID   int64
	UsedDrugsID int
	ListID      int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugMisuse) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	usedDrugs, err := entity.PayloadUsedDrugs.Entity()
	if err != nil {
		return err
	}
	entity.UsedDrugs = usedDrugs.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugMisuse) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.UsedDrugs.Valid(); !ok {
		stack.Append("DrugMisuse", err)
	}

	if entity.UsedDrugs.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("DrugMisuse", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugMisuse) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	usedDrugsID, err := entity.UsedDrugs.Save(context, account)
	if err != nil {
		return usedDrugsID, err
	}
	entity.UsedDrugsID = usedDrugsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceDrugMisuse{}, &orm.CreateTableOptions{
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
func (entity *SubstanceDrugMisuse) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugMisuse{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugMisuse) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugMisuse{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.UsedDrugsID != 0 {
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceDrugOrdered struct {
	PayloadInvolved Payload `json:"Involved" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	Involved *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int
	AccountID  int64
	InvolvedID int
	ListID     int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugOrdered) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	involved, err := entity.PayloadInvolved.Entity()
	if err != nil {
		return err
	}
	entity.Involved = involved.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugOrdered) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Involved.Valid(); !ok {
		stack.Append("DrugOrdered", err)
	}

	if entity.Involved.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("DrugOrdered", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugOrdered) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	involvedID, err := entity.Involved.Save(context, account)
	if err != nil {
		return involvedID, err
	}
	entity.InvolvedID = involvedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceDrugOrdered{}, &orm.CreateTableOptions{
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
func (entity *SubstanceDrugOrdered) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugOrdered{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Involved.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugOrdered) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugOrdered{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.InvolvedID != 0 {
		if _, err := entity.Involved.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceDrugVoluntary struct {
	PayloadInvolved Payload `json:"Involved" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	Involved *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int
	AccountID  int64
	InvolvedID int
	ListID     int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceDrugVoluntary) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	involved, err := entity.PayloadInvolved.Entity()
	if err != nil {
		return err
	}
	entity.Involved = involved.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceDrugVoluntary) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Involved.Valid(); !ok {
		stack.Append("DrugVoluntary", err)
	}

	if entity.Involved.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("DrugVoluntary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceDrugVoluntary) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	involvedID, err := entity.Involved.Save(context, account)
	if err != nil {
		return involvedID, err
	}
	entity.InvolvedID = involvedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceDrugVoluntary{}, &orm.CreateTableOptions{
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
func (entity *SubstanceDrugVoluntary) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugVoluntary{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Involved.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugVoluntary) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceDrugVoluntary{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.InvolvedID != 0 {
		if _, err := entity.Involved.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceAlcoholNegative struct {
	PayloadHasImpacts Payload `json:"HasImpacts" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasImpacts *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int
	AccountID    int64
	HasImpactsID int
	ListID       int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholNegative) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasImpacts, err := entity.PayloadHasImpacts.Entity()
	if err != nil {
		return err
	}
	entity.HasImpacts = hasImpacts.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholNegative) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasImpacts.Valid(); !ok {
		stack.Append("AlcoholNegative", err)
	}

	if entity.HasImpacts.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("AlcoholNegative", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholNegative) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasImpactsID, err := entity.HasImpacts.Save(context, account)
	if err != nil {
		return hasImpactsID, err
	}
	entity.HasImpactsID = hasImpactsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceAlcoholNegative{}, &orm.CreateTableOptions{
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
func (entity *SubstanceAlcoholNegative) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholNegative{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasImpacts.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholNegative) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholNegative{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasImpactsID != 0 {
		if _, err := entity.HasImpacts.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceAlcoholOrdered struct {
	PayloadHasBeenOrdered Payload `json:"HasBeenOrdered" sql:"-"`
	PayloadList           Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBeenOrdered *Branch     `json:"-"`
	List           *Collection `json:"-"`

	// Persister specific fields
	ID               int
	AccountID        int64
	HasBeenOrderedID int
	ListID           int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholOrdered) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasBeenOrdered, err := entity.PayloadHasBeenOrdered.Entity()
	if err != nil {
		return err
	}
	entity.HasBeenOrdered = hasBeenOrdered.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholOrdered) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasBeenOrdered.Valid(); !ok {
		stack.Append("AlcoholOrdered", err)
	}

	if entity.HasBeenOrdered.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("AlcoholOrdered", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholOrdered) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasBeenOrderedID, err := entity.HasBeenOrdered.Save(context, account)
	if err != nil {
		return hasBeenOrderedID, err
	}
	entity.HasBeenOrderedID = hasBeenOrderedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceAlcoholOrdered{}, &orm.CreateTableOptions{
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
func (entity *SubstanceAlcoholOrdered) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholOrdered{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasBeenOrdered.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholOrdered) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholOrdered{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasBeenOrderedID != 0 {
		if _, err := entity.HasBeenOrdered.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceAlcoholVoluntary struct {
	PayloadSoughtTreatment Payload `json:"SoughtTreatment" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	SoughtTreatment *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int
	AccountID         int64
	SoughtTreatmentID int
	ListID            int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholVoluntary) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	soughtTreatment, err := entity.PayloadSoughtTreatment.Entity()
	if err != nil {
		return err
	}
	entity.SoughtTreatment = soughtTreatment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholVoluntary) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.SoughtTreatment.Valid(); !ok {
		stack.Append("AlcoholVoluntary", err)
	}

	if entity.SoughtTreatment.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("AlcoholVoluntary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholVoluntary) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	soughtTreatmentID, err := entity.SoughtTreatment.Save(context, account)
	if err != nil {
		return soughtTreatmentID, err
	}
	entity.SoughtTreatmentID = soughtTreatmentID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceAlcoholVoluntary{}, &orm.CreateTableOptions{
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
func (entity *SubstanceAlcoholVoluntary) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholVoluntary{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.SoughtTreatment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholVoluntary) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholVoluntary{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.SoughtTreatmentID != 0 {
		if _, err := entity.SoughtTreatment.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type SubstanceAlcoholAdditional struct {
	PayloadReceivedTreatment Payload `json:"ReceivedTreatment" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	ReceivedTreatment *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int
	AccountID           int64
	ReceivedTreatmentID int
	ListID              int
}

// Unmarshal bytes in to the entity properties.
func (entity *SubstanceAlcoholAdditional) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	receivedTreatment, err := entity.PayloadReceivedTreatment.Entity()
	if err != nil {
		return err
	}
	entity.ReceivedTreatment = receivedTreatment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *SubstanceAlcoholAdditional) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.ReceivedTreatment.Valid(); !ok {
		stack.Append("AlcoholAdditional", err)
	}

	if entity.ReceivedTreatment.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("AlcoholAdditional", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *SubstanceAlcoholAdditional) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	receivedTreatmentID, err := entity.ReceivedTreatment.Save(context, account)
	if err != nil {
		return receivedTreatmentID, err
	}
	entity.ReceivedTreatmentID = receivedTreatmentID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&SubstanceAlcoholAdditional{}, &orm.CreateTableOptions{
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
func (entity *SubstanceAlcoholAdditional) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholAdditional{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.ReceivedTreatment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholAdditional) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&SubstanceAlcoholAdditional{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.ReceivedTreatmentID != 0 {
		if _, err := entity.ReceivedTreatment.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
