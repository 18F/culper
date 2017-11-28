package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

type SubstanceDrugUsage struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:UsedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceDrugUsage) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.usage", entity)
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
func (entity *SubstanceDrugUsage) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugUsage{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugUsage)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugUsage) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugUsage{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugUsage)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
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

	if _, err := entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugUsage) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.UsedDrugsID != 0 {
		entity.UsedDrugs = &Branch{ID: entity.UsedDrugsID}
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
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
func (entity *SubstanceDrugUsage) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceDrugUsage) SetID(id int) {
	entity.ID = id
}

type SubstanceDrugPurchase struct {
	PayloadInvolved Payload `json:"Involved" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	Involved *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	InvolvedID int `json:"-" pg:", fk:Involved"`
	ListID     int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceDrugPurchase) Marshal() Payload {
	if entity.Involved != nil {
		entity.PayloadInvolved = entity.Involved.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.purchase", entity)
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
func (entity *SubstanceDrugPurchase) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugPurchase{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugPurchase)
		if entity.Involved == nil {
			entity.Involved = &Branch{}
		}
		entity.InvolvedID = previous.InvolvedID
		entity.Involved.ID = previous.InvolvedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugPurchase) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugPurchase{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugPurchase)
		if entity.Involved == nil {
			entity.Involved = &Branch{}
		}
		entity.InvolvedID = previous.InvolvedID
		entity.Involved.ID = previous.InvolvedID
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

	if _, err := entity.Involved.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPurchase) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.InvolvedID != 0 {
		entity.Involved = &Branch{ID: entity.InvolvedID}
		if _, err := entity.Involved.Get(context, account); err != nil {
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
func (entity *SubstanceDrugPurchase) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceDrugPurchase) SetID(id int) {
	entity.ID = id
}

type SubstanceDrugClearance struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:UsedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceDrugClearance) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.clearance", entity)
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
func (entity *SubstanceDrugClearance) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugClearance{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugClearance)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugClearance) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugClearance{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugClearance)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
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

	if _, err := entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugClearance) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.UsedDrugsID != 0 {
		entity.UsedDrugs = &Branch{ID: entity.UsedDrugsID}
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
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
func (entity *SubstanceDrugClearance) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceDrugClearance) SetID(id int) {
	entity.ID = id
}

type SubstanceDrugPublicSafety struct {
	PayloadUsedDrugs Payload `json:"UsedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:UsedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceDrugPublicSafety) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.publicsafety", entity)
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
func (entity *SubstanceDrugPublicSafety) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugPublicSafety{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugPublicSafety)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugPublicSafety) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugPublicSafety{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugPublicSafety)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
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

	if _, err := entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugPublicSafety) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.UsedDrugsID != 0 {
		entity.UsedDrugs = &Branch{ID: entity.UsedDrugsID}
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
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
func (entity *SubstanceDrugPublicSafety) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceDrugPublicSafety) SetID(id int) {
	entity.ID = id
}

type SubstanceDrugMisuse struct {
	PayloadUsedDrugs Payload `json:"MisusedDrugs" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	UsedDrugs *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	UsedDrugsID int `json:"-" pg:", fk:MisusedDrugs"`
	ListID      int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceDrugMisuse) Marshal() Payload {
	if entity.UsedDrugs != nil {
		entity.PayloadUsedDrugs = entity.UsedDrugs.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.misuse", entity)
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
func (entity *SubstanceDrugMisuse) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugMisuse{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugMisuse)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugMisuse) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugMisuse{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugMisuse)
		if entity.UsedDrugs == nil {
			entity.UsedDrugs = &Branch{}
		}
		entity.UsedDrugsID = previous.UsedDrugsID
		entity.UsedDrugs.ID = previous.UsedDrugsID
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

	if _, err := entity.UsedDrugs.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugMisuse) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.UsedDrugsID != 0 {
		entity.UsedDrugs = &Branch{ID: entity.UsedDrugsID}
		if _, err := entity.UsedDrugs.Get(context, account); err != nil {
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
func (entity *SubstanceDrugMisuse) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceDrugMisuse) SetID(id int) {
	entity.ID = id
}

type SubstanceDrugOrdered struct {
	PayloadInvolved Payload `json:"TreatmentOrdered" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	Involved *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	InvolvedID int `json:"-" pg:", fk:TreatmentOrdered"`
	ListID     int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceDrugOrdered) Marshal() Payload {
	if entity.Involved != nil {
		entity.PayloadInvolved = entity.Involved.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.ordered", entity)
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
func (entity *SubstanceDrugOrdered) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugOrdered{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugOrdered)
		if entity.Involved == nil {
			entity.Involved = &Branch{}
		}
		entity.InvolvedID = previous.InvolvedID
		entity.Involved.ID = previous.InvolvedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugOrdered) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugOrdered{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugOrdered)
		if entity.Involved == nil {
			entity.Involved = &Branch{}
		}
		entity.InvolvedID = previous.InvolvedID
		entity.Involved.ID = previous.InvolvedID
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

	if _, err := entity.Involved.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugOrdered) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.InvolvedID != 0 {
		entity.Involved = &Branch{ID: entity.InvolvedID}
		if _, err := entity.Involved.Get(context, account); err != nil {
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
func (entity *SubstanceDrugOrdered) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceDrugOrdered) SetID(id int) {
	entity.ID = id
}

type SubstanceDrugVoluntary struct {
	PayloadInvolved Payload `json:"TreatmentVoluntary" sql:"-"`
	PayloadList     Payload `json:"List" sql:"-"`

	// Validator specific fields
	Involved *Branch     `json:"-"`
	List     *Collection `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	InvolvedID int `json:"-" pg:", fk:TreatmentVoluntary"`
	ListID     int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceDrugVoluntary) Marshal() Payload {
	if entity.Involved != nil {
		entity.PayloadInvolved = entity.Involved.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.drugs.voluntary", entity)
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
func (entity *SubstanceDrugVoluntary) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugVoluntary{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugVoluntary)
		if entity.Involved == nil {
			entity.Involved = &Branch{}
		}
		entity.InvolvedID = previous.InvolvedID
		entity.Involved.ID = previous.InvolvedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceDrugVoluntary) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceDrugVoluntary{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceDrugVoluntary)
		if entity.Involved == nil {
			entity.Involved = &Branch{}
		}
		entity.InvolvedID = previous.InvolvedID
		entity.Involved.ID = previous.InvolvedID
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

	if _, err := entity.Involved.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceDrugVoluntary) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.InvolvedID != 0 {
		entity.Involved = &Branch{ID: entity.InvolvedID}
		if _, err := entity.Involved.Get(context, account); err != nil {
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
func (entity *SubstanceDrugVoluntary) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceDrugVoluntary) SetID(id int) {
	entity.ID = id
}

type SubstanceAlcoholNegative struct {
	PayloadHasImpacts Payload `json:"HasImpacts" sql:"-"`
	PayloadList       Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasImpacts *Branch     `json:"-"`
	List       *Collection `json:"-"`

	// Persister specific fields
	ID           int `json:"-"`
	HasImpactsID int `json:"-" pg:", fk:HasImpacts"`
	ListID       int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceAlcoholNegative) Marshal() Payload {
	if entity.HasImpacts != nil {
		entity.PayloadHasImpacts = entity.HasImpacts.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.negative", entity)
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
func (entity *SubstanceAlcoholNegative) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholNegative{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholNegative)
		if entity.HasImpacts == nil {
			entity.HasImpacts = &Branch{}
		}
		entity.HasImpactsID = previous.HasImpactsID
		entity.HasImpacts.ID = previous.HasImpactsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholNegative) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholNegative{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholNegative)
		if entity.HasImpacts == nil {
			entity.HasImpacts = &Branch{}
		}
		entity.HasImpactsID = previous.HasImpactsID
		entity.HasImpacts.ID = previous.HasImpactsID
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

	if _, err := entity.HasImpacts.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholNegative) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasImpactsID != 0 {
		entity.HasImpacts = &Branch{ID: entity.HasImpactsID}
		if _, err := entity.HasImpacts.Get(context, account); err != nil {
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
func (entity *SubstanceAlcoholNegative) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceAlcoholNegative) SetID(id int) {
	entity.ID = id
}

type SubstanceAlcoholOrdered struct {
	PayloadHasBeenOrdered Payload `json:"HasBeenOrdered" sql:"-"`
	PayloadList           Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBeenOrdered *Branch     `json:"-"`
	List           *Collection `json:"-"`

	// Persister specific fields
	ID               int `json:"-"`
	HasBeenOrderedID int `json:"-" pg:", fk:HasBeenOrdered"`
	ListID           int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceAlcoholOrdered) Marshal() Payload {
	if entity.HasBeenOrdered != nil {
		entity.PayloadHasBeenOrdered = entity.HasBeenOrdered.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.ordered", entity)
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
func (entity *SubstanceAlcoholOrdered) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholOrdered{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholOrdered)
		if entity.HasBeenOrdered == nil {
			entity.HasBeenOrdered = &Branch{}
		}
		entity.HasBeenOrderedID = previous.HasBeenOrderedID
		entity.HasBeenOrdered.ID = previous.HasBeenOrderedID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholOrdered) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholOrdered{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholOrdered)
		if entity.HasBeenOrdered == nil {
			entity.HasBeenOrdered = &Branch{}
		}
		entity.HasBeenOrderedID = previous.HasBeenOrderedID
		entity.HasBeenOrdered.ID = previous.HasBeenOrderedID
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

	if _, err := entity.HasBeenOrdered.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholOrdered) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasBeenOrderedID != 0 {
		entity.HasBeenOrdered = &Branch{ID: entity.HasBeenOrderedID}
		if _, err := entity.HasBeenOrdered.Get(context, account); err != nil {
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
func (entity *SubstanceAlcoholOrdered) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceAlcoholOrdered) SetID(id int) {
	entity.ID = id
}

type SubstanceAlcoholVoluntary struct {
	PayloadSoughtTreatment Payload `json:"SoughtTreatment" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	SoughtTreatment *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	SoughtTreatmentID int `json:"-" pg:", fk:SoughtTreatment"`
	ListID            int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceAlcoholVoluntary) Marshal() Payload {
	if entity.SoughtTreatment != nil {
		entity.PayloadSoughtTreatment = entity.SoughtTreatment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.voluntary", entity)
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
func (entity *SubstanceAlcoholVoluntary) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholVoluntary{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholVoluntary)
		if entity.SoughtTreatment == nil {
			entity.SoughtTreatment = &Branch{}
		}
		entity.SoughtTreatmentID = previous.SoughtTreatmentID
		entity.SoughtTreatment.ID = previous.SoughtTreatmentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholVoluntary) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholVoluntary{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholVoluntary)
		if entity.SoughtTreatment == nil {
			entity.SoughtTreatment = &Branch{}
		}
		entity.SoughtTreatmentID = previous.SoughtTreatmentID
		entity.SoughtTreatment.ID = previous.SoughtTreatmentID
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

	if _, err := entity.SoughtTreatment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholVoluntary) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.SoughtTreatmentID != 0 {
		entity.SoughtTreatment = &Branch{ID: entity.SoughtTreatmentID}
		if _, err := entity.SoughtTreatment.Get(context, account); err != nil {
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
func (entity *SubstanceAlcoholVoluntary) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceAlcoholVoluntary) SetID(id int) {
	entity.ID = id
}

type SubstanceAlcoholAdditional struct {
	PayloadReceivedTreatment Payload `json:"ReceivedTreatment" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	ReceivedTreatment *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	ReceivedTreatmentID int `json:"-" pg:", fk:ReceivedTreatment"`
	ListID              int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *SubstanceAlcoholAdditional) Marshal() Payload {
	if entity.ReceivedTreatment != nil {
		entity.PayloadReceivedTreatment = entity.ReceivedTreatment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("substance.alcohol.additional", entity)
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
func (entity *SubstanceAlcoholAdditional) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholAdditional{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholAdditional)
		if entity.ReceivedTreatment == nil {
			entity.ReceivedTreatment = &Branch{}
		}
		entity.ReceivedTreatmentID = previous.ReceivedTreatmentID
		entity.ReceivedTreatment.ID = previous.ReceivedTreatmentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *SubstanceAlcoholAdditional) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&SubstanceAlcoholAdditional{ID: account}, func(result interface{}) {
		previous := result.(*SubstanceAlcoholAdditional)
		if entity.ReceivedTreatment == nil {
			entity.ReceivedTreatment = &Branch{}
		}
		entity.ReceivedTreatmentID = previous.ReceivedTreatmentID
		entity.ReceivedTreatment.ID = previous.ReceivedTreatmentID
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

	if _, err := entity.ReceivedTreatment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *SubstanceAlcoholAdditional) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.ReceivedTreatmentID != 0 {
		entity.ReceivedTreatment = &Branch{ID: entity.ReceivedTreatmentID}
		if _, err := entity.ReceivedTreatment.Get(context, account); err != nil {
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
func (entity *SubstanceAlcoholAdditional) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *SubstanceAlcoholAdditional) SetID(id int) {
	entity.ID = id
}
