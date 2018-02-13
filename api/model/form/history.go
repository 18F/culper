package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
)

type HistoryResidence struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *HistoryResidence) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("history.residence", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryResidence) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryResidence) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryResidence{ID: account}, func(result interface{}) {
		previous := result.(*HistoryResidence)
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
func (entity *HistoryResidence) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryResidence{ID: account}, func(result interface{}) {
		previous := result.(*HistoryResidence)
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
func (entity *HistoryResidence) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *HistoryResidence) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *HistoryResidence) SetID(id int) {
	entity.ID = id
}

type HistoryEmployment struct {
	PayloadList             Payload `json:"List" sql:"-"`
	PayloadEmploymentRecord Payload `json:"EmploymentRecord" sql:"-"`

	// Validator specific fields
	List             *Collection `json:"-"`
	EmploymentRecord *Branch     `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	ListID             int `json:"-" pg:", fk:List"`
	EmploymentRecordID int `json:"-"`
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

	employmentRecord, err := entity.PayloadEmploymentRecord.Entity()
	if err != nil {
		return err
	}
	entity.EmploymentRecord = employmentRecord.(*Branch)

	return err
}

// Marshal to payload structure
func (entity *HistoryEmployment) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	if entity.EmploymentRecord != nil {
		entity.PayloadEmploymentRecord = entity.EmploymentRecord.Marshal()
	}
	return MarshalPayloadEntity("history.employment", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryEmployment) Valid() (bool, error) {
	if ok, err := entity.List.Valid(); !ok {
		return false, err
	}
	if ok, err := entity.EmploymentRecord.Valid(); !ok {
		return false, err
	}
	return true, nil
}

// Save will create or update the database.
func (entity *HistoryEmployment) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryEmployment{ID: account}, func(result interface{}) {
		previous := result.(*HistoryEmployment)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID

		if entity.EmploymentRecord == nil {
			entity.EmploymentRecord = &Branch{}
		}
		entity.EmploymentRecord.ID = previous.EmploymentRecordID
		entity.EmploymentRecordID = previous.EmploymentRecordID
	})

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	employmentRecordID, err := entity.EmploymentRecord.Save(context, account)
	if err != nil {
		return employmentRecordID, err
	}
	entity.EmploymentRecordID = employmentRecordID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *HistoryEmployment) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryEmployment{ID: account}, func(result interface{}) {
		previous := result.(*HistoryEmployment)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID

		if entity.EmploymentRecord == nil {
			entity.EmploymentRecord = &Branch{}
		}
		entity.EmploymentRecord.ID = previous.EmploymentRecordID
		entity.EmploymentRecordID = previous.EmploymentRecordID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.EmploymentRecord.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryEmployment) Get(context *db.DatabaseContext, account int) (int, error) {
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

	if entity.EmploymentRecordID != 0 {
		entity.EmploymentRecord = &Branch{ID: entity.EmploymentRecordID}
		if _, err := entity.EmploymentRecord.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *HistoryEmployment) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *HistoryEmployment) SetID(id int) {
	entity.ID = id
}

type HistoryEducation struct {
	PayloadHasAttended Payload `json:"HasAttended" sql:"-"`
	PayloadHasDegree10 Payload `json:"HasDegree10" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasAttended *Branch     `json:"-" sql:"-"`
	HasDegree10 *Branch     `json:"-" sql:"-"`
	List        *Collection `json:"-" sql:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasAttendedID int `json:"-" pg:", fk:HasAttended"`
	HasDegree10ID int `json:"-" pg:", fk:HasDegree10" sql:"has_degree10_id"`
	ListID        int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *HistoryEducation) Marshal() Payload {
	if entity.HasAttended != nil {
		entity.PayloadHasAttended = entity.HasAttended.Marshal()
	}
	if entity.HasDegree10 != nil {
		entity.PayloadHasDegree10 = entity.HasDegree10.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("history.education", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryEducation) Valid() (bool, error) {
	if entity.HasAttended.Value == "Yes" || entity.HasDegree10.Value == "Yes" {
		return entity.List.Valid()
	}

	return true, nil
}

// Save will create or update the database.
func (entity *HistoryEducation) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryEducation{ID: account}, func(result interface{}) {
		previous := result.(*HistoryEducation)
		if entity.HasAttended == nil {
			entity.HasAttended = &Branch{}
		}
		entity.HasAttendedID = previous.HasAttendedID
		entity.HasAttended.ID = previous.HasAttendedID
		if entity.HasDegree10 == nil {
			entity.HasDegree10 = &Branch{}
		}
		entity.HasDegree10ID = previous.HasDegree10ID
		entity.HasDegree10.ID = previous.HasDegree10ID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *HistoryEducation) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryEducation{ID: account}, func(result interface{}) {
		previous := result.(*HistoryEducation)
		if entity.HasAttended == nil {
			entity.HasAttended = &Branch{}
		}
		entity.HasAttendedID = previous.HasAttendedID
		entity.HasAttended.ID = previous.HasAttendedID
		if entity.HasDegree10 == nil {
			entity.HasDegree10 = &Branch{}
		}
		entity.HasDegree10ID = previous.HasDegree10ID
		entity.HasDegree10.ID = previous.HasDegree10ID
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

	if _, err := entity.HasAttended.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasDegree10.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryEducation) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasAttendedID != 0 {
		entity.HasAttended = &Branch{ID: entity.HasAttendedID}
		if _, err := entity.HasAttended.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasDegree10ID != 0 {
		entity.HasDegree10 = &Branch{ID: entity.HasDegree10ID}
		if _, err := entity.HasDegree10.Get(context, account); err != nil {
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
func (entity *HistoryEducation) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *HistoryEducation) SetID(id int) {
	entity.ID = id
}

type HistoryFederal struct {
	PayloadHasFederalService Payload `json:"HasFederalService" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasFederalService *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	HasFederalServiceID int `json:"-" pg:", fk:HasFederalService"`
	ListID              int `json:"-" pg:", fk:List"`
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
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *HistoryFederal) Marshal() Payload {
	if entity.HasFederalService != nil {
		entity.PayloadHasFederalService = entity.HasFederalService.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("history.federal", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *HistoryFederal) Valid() (bool, error) {
	if entity.HasFederalService.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *HistoryFederal) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryFederal{ID: account}, func(result interface{}) {
		previous := result.(*HistoryFederal)
		if entity.HasFederalService == nil {
			entity.HasFederalService = &Branch{}
		}
		entity.HasFederalServiceID = previous.HasFederalServiceID
		entity.HasFederalService.ID = previous.HasFederalServiceID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *HistoryFederal) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&HistoryFederal{ID: account}, func(result interface{}) {
		previous := result.(*HistoryFederal)
		if entity.HasFederalService == nil {
			entity.HasFederalService = &Branch{}
		}
		entity.HasFederalServiceID = previous.HasFederalServiceID
		entity.HasFederalService.ID = previous.HasFederalServiceID
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

	if _, err := entity.HasFederalService.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *HistoryFederal) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasFederalServiceID != 0 {
		entity.HasFederalService = &Branch{ID: entity.HasFederalServiceID}
		if _, err := entity.HasFederalService.Get(context, account); err != nil {
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
func (entity *HistoryFederal) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *HistoryFederal) SetID(id int) {
	entity.ID = id
}
