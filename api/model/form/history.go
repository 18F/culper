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
	ListID int `json:"-"`
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
func (entity *HistoryResidence) Save(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *HistoryResidence) Delete(context *db.DatabaseContext, account int) (int, error) {
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
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

type HistoryEmployment struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-"`
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
func (entity *HistoryEmployment) Save(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *HistoryEmployment) Delete(context *db.DatabaseContext, account int) (int, error) {
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
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
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
	ID            int `json:"-"`
	HasAttendedID int `json:"-"`
	HasDegree10ID int `json:"-"`
	ListID        int `json:"-"`
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
func (entity *HistoryEducation) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

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
func (entity *HistoryEducation) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
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

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
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
		if _, err := entity.HasAttended.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasDegree10ID != 0 {
		if _, err := entity.HasDegree10.Get(context, account); err != nil {
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

type HistoryFederal struct {
	PayloadHasFederalService Payload `json:"HasFederalService" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasFederalService *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	HasFederalServiceID int `json:"-"`
	ListID              int `json:"-"`
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
func (entity *HistoryFederal) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasFederalService.Delete(context, account); err != nil {
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
		if _, err := entity.HasFederalService.Get(context, account); err != nil {
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
