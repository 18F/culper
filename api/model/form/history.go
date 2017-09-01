package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

type HistoryResidence struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int
	AccountID int64
	ListID    int
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryResidence) Unmarshal(raw []byte) error {
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
func (entity *HistoryResidence) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryResidence) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&HistoryResidence{}, &orm.CreateTableOptions{
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
func (entity *HistoryResidence) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryResidence) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type HistoryEmployment struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int
	AccountID int64
	ListID    int
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryEmployment) Unmarshal(raw []byte) error {
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
func (entity *HistoryEmployment) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryEmployment) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&HistoryEmployment{}, &orm.CreateTableOptions{
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
func (entity *HistoryEmployment) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryEmployment) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type HistoryEducation struct {
	PayloadHasAttended Payload `json:"HasAttended" sql:"-"`
	PayloadHasDegree10 Payload `json:"HasDegree10" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasAttended *Branch     `json:"-"`
	HasDegree10 *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int
	AccountID     int64
	HasAttendedID int
	HasDegree10ID int
	ListID        int
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryEducation) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasAttended, err := entity.PayloadHasAttended.Entity()
	if err != nil {
		return err
	}
	entity.HasAttended = hasAttended.(*Branch)

	hasDegree10, err := entity.PayloadHasDegree10.Entity()
	if err != nil {
		return err
	}
	entity.HasDegree10 = hasDegree10.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryEducation) Valid() (bool, error) {
	if entity.HasAttended.Value == "Yes" || entity.HasDegree10.Value == "Yes" {
		return entity.List.Valid()
	}

	return true, nil
}

// Save will create or update the database.
func (entity *HistoryEducation) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasAttendedID, err := entity.HasAttended.Save(context, account)
	if err != nil {
		return hasAttendedID, err
	}
	entity.HasAttendedID = hasAttendedID

	hasDegree10ID, err := entity.HasDegree10.Save(context, account)
	if err != nil {
		return hasDegree10ID, err
	}
	entity.HasDegree10ID = hasDegree10ID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&HistoryEducation{}, &orm.CreateTableOptions{
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
func (entity *HistoryEducation) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryEducation) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

type HistoryFederal struct {
	PayloadHasFederalService Payload `json:"HasFederalService" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasFederalService *Branch `json:"-"`
	List              *Branch `json:"-"`

	// Persister specific fields
	ID                  int
	AccountID           int64
	HasFederalServiceID int
	ListID              int
}

// Unmarshal bytes in to the entity properties.
func (entity *HistoryFederal) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasFederalService, err := entity.PayloadHasFederalService.Entity()
	if err != nil {
		return err
	}
	entity.HasFederalService = hasFederalService.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Branch)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryFederal) Valid() (bool, error) {
	if entity.HasFederalService.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryFederal) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasFederalServiceID, err := entity.HasFederalService.Save(context, account)
	if err != nil {
		return hasFederalServiceID, err
	}
	entity.HasFederalServiceID = hasFederalServiceID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&HistoryFederal{}, &orm.CreateTableOptions{
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
func (entity *HistoryFederal) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryFederal) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
