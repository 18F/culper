package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

type RelationshipsMarital struct {
	PayloadStatus       Payload           `json:"Status" sql:"-"`
	PayloadCivilUnion   PayloadProperties `json:"CivilUnion" sql:"-"`
	PayloadDivorcedList Payload           `json:"DivorcedList" sql:"-"`

	// Validator specific fields
	Status     *Radio      `json:"-"`
	CivilUnion *CivilUnion `json:"-"`
	// CivilUnion   CivilUnion  `json:"CivilUnion" sql:"-"`
	DivorcedList *Collection `json:"-"`

	// Persister specific fields
	ID             int   `json:"-"`
	AccountID      int64 `json:"-"`
	StatusID       int   `json:"-"`
	CivilUnionID   int   `json:"-"`
	DivorcedListID int   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsMarital) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	status, err := entity.PayloadStatus.Entity()
	if err != nil {
		return err
	}
	entity.Status = status.(*Radio)

	entity.CivilUnion = &CivilUnion{Items: entity.PayloadCivilUnion}

	divorcedList, err := entity.PayloadDivorcedList.Entity()
	if err != nil {
		return err
	}
	entity.DivorcedList = divorcedList.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsMarital) Valid() (bool, error) {
	var stack model.ErrorStack

	sv := entity.Status.Value
	switch {
	case sv == "InCivilUnion" || sv == "Separated":
		// Check if the civil union information is valid
		for k, v := range entity.CivilUnion.Items {
			if k == "Divorced" {
				// Check if there was a divorce mentioned in the civil union
				divorced, err := v.Entity()
				if err != nil {
					return false, err
				}

				if ok, err := divorced.Valid(); !ok {
					stack.Append("CitizenshipMarital", err)
				}

				// If there was a divorce then validate the divorce
				// collection as well
				if divorced.(*Branch).Value == "Yes" {
					if ok, err := entity.DivorcedList.Valid(); !ok {
						stack.Append("CitizenshipMarital", err)
					}
				}

				continue
			}

			if ok, err := v.Valid(); !ok {
				stack.Append("CitizenshipMarital", err)
			}
		}

	case sv == "Annulled" || sv == "Divorced" || sv == "Widowed":
		if ok, err := entity.DivorcedList.Valid(); !ok {
			stack.Append("CitizenshipMarital", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *RelationshipsMarital) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	statusID, err := entity.Status.Save(context, account)
	if err != nil {
		return statusID, err
	}
	entity.StatusID = statusID

	_, err = entity.CivilUnion.Save(context, account)
	if err != nil {
		return 0, err
	}
	// entity.CivilUnionID = civilUnionID

	divorcedListID, err := entity.DivorcedList.Save(context, account)
	if err != nil {
		return divorcedListID, err
	}
	entity.DivorcedListID = divorcedListID

	err = context.CreateTable(&RelationshipsMarital{}, &orm.CreateTableOptions{
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
func (entity *RelationshipsMarital) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsMarital{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Status.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.CivilUnion.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.DivorcedList.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsMarital) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsMarital{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.StatusID != 0 {
		if _, err := entity.Status.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CivilUnionID != 0 {
		if _, err := entity.CivilUnion.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DivorcedListID != 0 {
		if _, err := entity.DivorcedList.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type RelationshipsCohabitants struct {
	PayloadHasCohabitant  Payload `json:"HasCohabitant" sql:"-"`
	PayloadCohabitantList Payload `json:"CohabitantList" sql:"-"`

	// Validator specific fields
	HasCohabitant  *Branch     `json:"-"`
	CohabitantList *Collection `json:"-"`

	// Persister specific fields
	ID               int   `json:"-"`
	AccountID        int64 `json:"-"`
	HasCohabitantID  int   `json:"-"`
	CohabitantListID int   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsCohabitants) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasCohabitant, err := entity.PayloadHasCohabitant.Entity()
	if err != nil {
		return err
	}
	entity.HasCohabitant = hasCohabitant.(*Branch)

	cohabitantList, err := entity.PayloadCohabitantList.Entity()
	if err != nil {
		return err
	}
	entity.CohabitantList = cohabitantList.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsCohabitants) Valid() (bool, error) {
	if entity.HasCohabitant.Value == "No" {
		return true, nil
	}

	return entity.CohabitantList.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsCohabitants) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasCohabitantID, err := entity.HasCohabitant.Save(context, account)
	if err != nil {
		return hasCohabitantID, err
	}
	entity.HasCohabitantID = hasCohabitantID

	cohabitantListID, err := entity.CohabitantList.Save(context, account)
	if err != nil {
		return cohabitantListID, err
	}
	entity.CohabitantListID = cohabitantListID

	err = context.CreateTable(&RelationshipsCohabitants{}, &orm.CreateTableOptions{
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
func (entity *RelationshipsCohabitants) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsCohabitants{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasCohabitant.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.CohabitantList.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsCohabitants) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsCohabitants{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasCohabitantID != 0 {
		if _, err := entity.HasCohabitant.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CohabitantListID != 0 {
		if _, err := entity.CohabitantList.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type RelationshipsPeople struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int   `json:"-"`
	AccountID int64 `json:"-"`
	ListID    int   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsPeople) Unmarshal(raw []byte) error {
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
func (entity *RelationshipsPeople) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsPeople) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&RelationshipsPeople{}, &orm.CreateTableOptions{
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
func (entity *RelationshipsPeople) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsPeople{}, options); err != nil {
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
func (entity *RelationshipsPeople) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsPeople{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type RelationshipsRelatives struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int   `json:"-"`
	AccountID int64 `json:"-"`
	ListID    int   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *RelationshipsRelatives) Unmarshal(raw []byte) error {
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
func (entity *RelationshipsRelatives) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsRelatives) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&RelationshipsRelatives{}, &orm.CreateTableOptions{
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
func (entity *RelationshipsRelatives) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsRelatives{}, options); err != nil {
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
func (entity *RelationshipsRelatives) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&RelationshipsRelatives{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
