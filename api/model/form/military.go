package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
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
	ID                   int `json:"-"`
	WasBornAfterID       int `json:"-"`
	HasRegisteredID      int `json:"-"`
	RegistrationNumberID int `json:"-"`
	ExplanationID        int `json:"-"`
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
func (entity *MilitarySelective) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

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

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitarySelective) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.WasBornAfter.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasRegistered.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.RegistrationNumber.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitarySelective) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

type MilitaryHistory struct {
	PayloadHasServed Payload `json:"HasServed" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasServed *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	HasServedID int `json:"-"`
	ListID      int `json:"-"`
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
func (entity *MilitaryHistory) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

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

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryHistory) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasServed.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryHistory) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

type MilitaryDisciplinary struct {
	PayloadHasDisciplinary Payload `json:"HasDisciplinary" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDisciplinary *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasDisciplinaryID int `json:"-"`
	ListID            int `json:"-"`
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
func (entity *MilitaryDisciplinary) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

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

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryDisciplinary) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasDisciplinary.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryDisciplinary) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

type MilitaryForeign struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-"`
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
func (entity *MilitaryForeign) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryForeign) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *MilitaryForeign) Get(context *db.DatabaseContext, account int) (int, error) {
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
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}
