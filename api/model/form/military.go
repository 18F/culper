package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

type MilitarySelective struct {
	PayloadWasBornAfter       Payload `json:"WasBornAfter" sql:"-"`
	PayloadHasRegistered      Payload `json:"HasRegistered" sql:"-"`
	PayloadRegistrationNumber Payload `json:"RegistrationNumber" sql:"-"`
	PayloadExplanation        Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	WasBornAfter       *Branch   `json:"-"`
	HasRegistered      *Branch   `json:"-"`
	RegistrationNumber *Text     `json:"-"`
	Explanation        *Textarea `json:"-"`

	// Persister specific fields
	ID                   int
	AccountID            int64
	WasBornAfterID       int
	HasRegisteredID      int
	RegistrationNumberID int
	ExplanationID        int
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitarySelective) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	wasBornAfter, err := entity.PayloadWasBornAfter.Entity()
	if err != nil {
		return err
	}
	entity.WasBornAfter = wasBornAfter.(*Branch)

	hasRegistered, err := entity.PayloadHasRegistered.Entity()
	if err != nil {
		return err
	}
	entity.HasRegistered = hasRegistered.(*Branch)

	registrationNumber, err := entity.PayloadRegistrationNumber.Entity()
	if err != nil {
		return err
	}
	entity.RegistrationNumber = registrationNumber.(*Text)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitarySelective) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.WasBornAfter.Valid(); !ok {
		stack.Append("MilitarySelective", err)
	}

	if entity.WasBornAfter.Value == "Yes" {
		if ok, err := entity.HasRegistered.Valid(); !ok {
			stack.Append("MilitarySelective", err)
		} else {
			if entity.HasRegistered.Value == "Yes" {
				if ok, err := entity.RegistrationNumber.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			} else if entity.HasRegistered.Value == "No" {
				if ok, err := entity.Explanation.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			}
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitarySelective) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	wasBornAfterID, err := entity.WasBornAfter.Save(context, account)
	if err != nil {
		return wasBornAfterID, err
	}
	entity.WasBornAfterID = wasBornAfterID

	hasRegisteredID, err := entity.HasRegistered.Save(context, account)
	if err != nil {
		return hasRegisteredID, err
	}
	entity.HasRegisteredID = hasRegisteredID

	registrationNumberID, err := entity.RegistrationNumber.Save(context, account)
	if err != nil {
		return registrationNumberID, err
	}
	entity.RegistrationNumberID = registrationNumberID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	err = context.CreateTable(&MilitarySelective{}, &orm.CreateTableOptions{
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
func (entity *MilitarySelective) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitarySelective{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.WasBornAfter.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasRegistered.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.RegistrationNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *MilitarySelective) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitarySelective{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.WasBornAfterID != 0 {
		if _, err := entity.WasBornAfter.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasRegisteredID != 0 {
		if _, err := entity.HasRegistered.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.RegistrationNumberID != 0 {
		if _, err := entity.RegistrationNumber.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExplanationID != 0 {
		if _, err := entity.Explanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type MilitaryHistory struct {
	PayloadHasServed Payload `json:"HasServed" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasServed *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int
	AccountID   int64
	HasServedID int
	ListID      int
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryHistory) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasServed, err := entity.PayloadHasServed.Entity()
	if err != nil {
		return err
	}
	entity.HasServed = hasServed.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryHistory) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasServed.Valid(); !ok {
		stack.Append("MilitaryHistory", err)
	}

	if entity.HasServed.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("MilitaryHistory", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryHistory) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasServedID, err := entity.HasServed.Save(context, account)
	if err != nil {
		return hasServedID, err
	}
	entity.HasServedID = hasServedID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&MilitaryHistory{}, &orm.CreateTableOptions{
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
func (entity *MilitaryHistory) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitaryHistory{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasServed.Delete(context, account); err != nil {
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
func (entity *MilitaryHistory) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitaryHistory{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasServedID != 0 {
		if _, err := entity.HasServed.Get(context, account); err != nil {
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

type MilitaryDisciplinary struct {
	PayloadHasDisciplinary Payload `json:"HasDisciplinary" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDisciplinary *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int
	AccountID         int64
	HasDisciplinaryID int
	ListID            int
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryDisciplinary) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDisciplinary, err := entity.PayloadHasDisciplinary.Entity()
	if err != nil {
		return err
	}
	entity.HasDisciplinary = hasDisciplinary.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryDisciplinary) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasDisciplinary.Valid(); !ok {
		stack.Append("MilitaryDisciplinary", err)
	}

	if entity.HasDisciplinary.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("MilitaryDisciplinary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryDisciplinary) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	hasDisciplinaryID, err := entity.HasDisciplinary.Save(context, account)
	if err != nil {
		return hasDisciplinaryID, err
	}
	entity.HasDisciplinaryID = hasDisciplinaryID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&MilitaryDisciplinary{}, &orm.CreateTableOptions{
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
func (entity *MilitaryDisciplinary) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitaryDisciplinary{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasDisciplinary.Delete(context, account); err != nil {
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
func (entity *MilitaryDisciplinary) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitaryDisciplinary{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasDisciplinaryID != 0 {
		if _, err := entity.HasDisciplinary.Get(context, account); err != nil {
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

type MilitaryForeign struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID        int
	AccountID int64
	ListID    int
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryForeign) Unmarshal(raw []byte) error {
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
func (entity *MilitaryForeign) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.List.Valid(); !ok {
		stack.Append("MilitaryForeign", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *MilitaryForeign) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	err = context.CreateTable(&MilitaryForeign{}, &orm.CreateTableOptions{
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
func (entity *MilitaryForeign) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitaryForeign{}, options); err != nil {
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
func (entity *MilitaryForeign) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&MilitaryForeign{}, options); err != nil {
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
