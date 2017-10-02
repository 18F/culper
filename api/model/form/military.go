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
	WasBornAfterID       int `json:"-" pg:", fk:WasBornAfter"`
	HasRegisteredID      int `json:"-" pg:", fk:HasRegistered"`
	RegistrationNumberID int `json:"-" pg:", fk:RegistrationNumber"`
	ExplanationID        int `json:"-" pg:", fk:Explanation"`
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

// Marshal to payload structure
func (entity *MilitarySelective) Marshal() Payload {
	entity.PayloadWasBornAfter = entity.WasBornAfter.Marshal()
	entity.PayloadHasRegistered = entity.HasRegistered.Marshal()
	entity.PayloadRegistrationNumber = entity.RegistrationNumber.Marshal()
	entity.PayloadExplanation = entity.Explanation.Marshal()
	return MarshalPayloadEntity("military.selective", entity)
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

	context.Find(&MilitarySelective{ID: account}, func(result interface{}) {
		previous := result.(*MilitarySelective)
		entity.WasBornAfterID = previous.WasBornAfterID
		entity.WasBornAfter.ID = previous.WasBornAfterID
		entity.HasRegisteredID = previous.HasRegisteredID
		entity.HasRegistered.ID = previous.HasRegisteredID
		entity.RegistrationNumberID = previous.RegistrationNumberID
		entity.RegistrationNumber.ID = previous.RegistrationNumberID
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitarySelective) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&MilitarySelective{ID: account}, func(result interface{}) {
		previous := result.(*MilitarySelective)
		entity.WasBornAfterID = previous.WasBornAfterID
		entity.WasBornAfter.ID = previous.WasBornAfterID
		entity.HasRegisteredID = previous.HasRegisteredID
		entity.HasRegistered.ID = previous.HasRegisteredID
		entity.RegistrationNumberID = previous.RegistrationNumberID
		entity.RegistrationNumber.ID = previous.RegistrationNumberID
		entity.ExplanationID = previous.ExplanationID
		entity.Explanation.ID = previous.ExplanationID
	})

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
		entity.WasBornAfter = &Branch{ID: entity.WasBornAfterID}
		if _, err := entity.WasBornAfter.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasRegisteredID != 0 {
		entity.HasRegistered = &Branch{ID: entity.HasRegisteredID}
		if _, err := entity.HasRegistered.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.RegistrationNumberID != 0 {
		entity.RegistrationNumber = &Text{ID: entity.RegistrationNumberID}
		if _, err := entity.RegistrationNumber.Get(context, account); err != nil {
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
func (entity *MilitarySelective) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitarySelective) SetID(id int) {
	entity.ID = id
}

type MilitaryHistory struct {
	PayloadHasServed Payload `json:"HasServed" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasServed *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	HasServedID int `json:"-" pg:", fk:HasServed"`
	ListID      int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *MilitaryHistory) Marshal() Payload {
	entity.PayloadHasServed = entity.HasServed.Marshal()
	entity.PayloadList = entity.List.Marshal()
	return MarshalPayloadEntity("military.history", entity)
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

	context.Find(&MilitaryHistory{ID: account}, func(result interface{}) {
		previous := result.(*MilitaryHistory)
		entity.HasServedID = previous.HasServedID
		entity.HasServed.ID = previous.HasServedID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryHistory) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&MilitaryHistory{ID: account}, func(result interface{}) {
		previous := result.(*MilitaryHistory)
		entity.HasServedID = previous.HasServedID
		entity.HasServed.ID = previous.HasServedID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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
		entity.HasServed = &Branch{ID: entity.HasServedID}
		if _, err := entity.HasServed.Get(context, account); err != nil {
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
func (entity *MilitaryHistory) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitaryHistory) SetID(id int) {
	entity.ID = id
}

type MilitaryDisciplinary struct {
	PayloadHasDisciplinary Payload `json:"HasDisciplinary" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDisciplinary *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasDisciplinaryID int `json:"-" pg:", fk:HasDisciplinary"`
	ListID            int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *MilitaryDisciplinary) Marshal() Payload {
	entity.PayloadHasDisciplinary = entity.HasDisciplinary.Marshal()
	entity.PayloadList = entity.List.Marshal()
	return MarshalPayloadEntity("military.disciplinary", entity)
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

	context.Find(&MilitaryDisciplinary{ID: account}, func(result interface{}) {
		previous := result.(*MilitaryDisciplinary)
		entity.HasDisciplinaryID = previous.HasDisciplinaryID
		entity.HasDisciplinary.ID = previous.HasDisciplinaryID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *MilitaryDisciplinary) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&MilitaryDisciplinary{ID: account}, func(result interface{}) {
		previous := result.(*MilitaryDisciplinary)
		entity.HasDisciplinaryID = previous.HasDisciplinaryID
		entity.HasDisciplinary.ID = previous.HasDisciplinaryID
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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
		entity.HasDisciplinary = &Branch{ID: entity.HasDisciplinaryID}
		if _, err := entity.HasDisciplinary.Get(context, account); err != nil {
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
func (entity *MilitaryDisciplinary) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitaryDisciplinary) SetID(id int) {
	entity.ID = id
}

type MilitaryForeign struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *MilitaryForeign) Marshal() Payload {
	entity.PayloadList = entity.List.Marshal()
	return MarshalPayloadEntity("military.foreign", entity)
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

	context.Find(&MilitaryForeign{ID: account}, func(result interface{}) {
		previous := result.(*MilitaryForeign)
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
func (entity *MilitaryForeign) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&MilitaryForeign{ID: account}, func(result interface{}) {
		previous := result.(*MilitaryForeign)
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *MilitaryForeign) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *MilitaryForeign) SetID(id int) {
	entity.ID = id
}
