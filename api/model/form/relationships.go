package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

type RelationshipsMarital struct {
	PayloadStatus       Payload `json:"Status" sql:"-"`
	PayloadCivilUnion   Payload `json:"CivilUnion" sql:"-"`
	PayloadDivorcedList Payload `json:"DivorcedList" sql:"-"`

	// Validator specific fields
	Status       *Radio      `json:"-"`
	CivilUnion   *CivilUnion `json:"-"`
	DivorcedList *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	StatusID       int `json:"-" pg:", fk:Status"`
	CivilUnionID   int `json:"-" pg:", fk:CivilUnion"`
	DivorcedListID int `json:"-" pg:", fk:DivorcedList"`
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

	civilUnion, err := entity.PayloadCivilUnion.Entity()
	if err != nil {
		return err
	}
	entity.CivilUnion = civilUnion.(*CivilUnion)

	divorcedList, err := entity.PayloadDivorcedList.Entity()
	if err != nil {
		return err
	}
	entity.DivorcedList = divorcedList.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *RelationshipsMarital) Marshal() Payload {
	if entity.Status != nil {
		entity.PayloadStatus = entity.Status.Marshal()
	}
	if entity.CivilUnion != nil {
		entity.PayloadCivilUnion = entity.CivilUnion.Marshal()
	}
	if entity.DivorcedList != nil {
		entity.PayloadDivorcedList = entity.DivorcedList.Marshal()
	}
	return MarshalPayloadEntity("relationships.status.marital", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsMarital) Valid() (bool, error) {
	var stack model.ErrorStack

	sv := entity.Status.Value
	switch {
	case sv == "InCivilUnion" || sv == "Separated":
		// Check if the civil union information is valid
		if ok, err := entity.CivilUnion.Valid(); !ok {
			stack.Append("CitizenshipMarital", err)
		}
		if entity.CivilUnion.Divorced.Value == "Yes" {
			if ok, err := entity.DivorcedList.Valid(); !ok {
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
func (entity *RelationshipsMarital) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsMarital{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsMarital)
		if entity.Status == nil {
			entity.Status = &Radio{}
		}
		entity.Status.ID = previous.StatusID
		entity.StatusID = previous.StatusID
		if entity.CivilUnion == nil {
			entity.CivilUnion = &CivilUnion{}
		}
		entity.CivilUnion.ID = previous.CivilUnionID
		entity.CivilUnionID = previous.CivilUnionID
		if entity.DivorcedList == nil {
			entity.DivorcedList = &Collection{}
		}
		entity.DivorcedList.ID = previous.DivorcedListID
		entity.DivorcedListID = previous.DivorcedListID
	})

	statusID, err := entity.Status.Save(context, account)
	if err != nil {
		return statusID, err
	}
	entity.StatusID = statusID

	divorcedListID, err := entity.DivorcedList.Save(context, account)
	if err != nil {
		return divorcedListID, err
	}
	entity.DivorcedListID = divorcedListID

	civilUnionID, err := entity.CivilUnion.Save(context, account)
	if err != nil {
		return civilUnionID, err
	}
	entity.CivilUnionID = civilUnionID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *RelationshipsMarital) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsMarital{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsMarital)
		if entity.Status == nil {
			entity.Status = &Radio{}
		}
		entity.Status.ID = previous.StatusID
		entity.StatusID = previous.StatusID
		if entity.CivilUnion == nil {
			entity.CivilUnion = &CivilUnion{}
		}
		entity.CivilUnion.ID = previous.CivilUnionID
		entity.CivilUnionID = previous.CivilUnionID
		if entity.DivorcedList == nil {
			entity.DivorcedList = &Collection{}
		}
		entity.DivorcedList.ID = previous.DivorcedListID
		entity.DivorcedListID = previous.DivorcedListID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Status.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CivilUnion.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.DivorcedList.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsMarital) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	context.Find(&RelationshipsMarital{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsMarital)
		if entity.Status == nil {
			entity.Status = &Radio{}
		}
		entity.Status.ID = previous.StatusID
		entity.StatusID = previous.StatusID
		if entity.CivilUnion == nil {
			entity.CivilUnion = &CivilUnion{}
		}
		entity.CivilUnion.ID = previous.CivilUnionID
		entity.CivilUnionID = previous.CivilUnionID
		if entity.DivorcedList == nil {
			entity.DivorcedList = &Collection{}
		}
		entity.DivorcedList.ID = previous.DivorcedListID
		entity.DivorcedListID = previous.DivorcedListID
	})

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

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *RelationshipsMarital) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *RelationshipsMarital) SetID(id int) {
	entity.ID = id
}

type RelationshipsCohabitants struct {
	PayloadHasCohabitant  Payload `json:"HasCohabitant" sql:"-"`
	PayloadCohabitantList Payload `json:"CohabitantList" sql:"-"`

	// Validator specific fields
	HasCohabitant  *Branch     `json:"-"`
	CohabitantList *Collection `json:"-"`

	// Persister specific fields
	ID               int `json:"-"`
	HasCohabitantID  int `json:"-" pg:", fk:HasCohabitant"`
	CohabitantListID int `json:"-" pg:", fk:CohabitantList"`
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

// Marshal to payload structure
func (entity *RelationshipsCohabitants) Marshal() Payload {
	if entity.HasCohabitant != nil {
		entity.PayloadHasCohabitant = entity.HasCohabitant.Marshal()
	}
	if entity.CohabitantList != nil {
		entity.PayloadCohabitantList = entity.CohabitantList.Marshal()
	}
	return MarshalPayloadEntity("relationships.status.cohabitant", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsCohabitants) Valid() (bool, error) {
	if entity.HasCohabitant.Value == "No" {
		return true, nil
	}

	return entity.CohabitantList.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsCohabitants) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsCohabitants{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsCohabitants)
		if entity.HasCohabitant == nil {
			entity.HasCohabitant = &Branch{}
		}
		entity.HasCohabitantID = previous.HasCohabitantID
		entity.HasCohabitant.ID = previous.HasCohabitantID
		if entity.CohabitantList == nil {
			entity.CohabitantList = &Collection{}
		}
		entity.CohabitantListID = previous.CohabitantListID
		entity.CohabitantList.ID = previous.CohabitantListID
	})

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *RelationshipsCohabitants) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsCohabitants{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsCohabitants)
		if entity.HasCohabitant == nil {
			entity.HasCohabitant = &Branch{}
		}
		entity.HasCohabitantID = previous.HasCohabitantID
		entity.HasCohabitant.ID = previous.HasCohabitantID
		if entity.CohabitantList == nil {
			entity.CohabitantList = &Collection{}
		}
		entity.CohabitantListID = previous.CohabitantListID
		entity.CohabitantList.ID = previous.CohabitantListID
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasCohabitant.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CohabitantList.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *RelationshipsCohabitants) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	context.Find(&RelationshipsCohabitants{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsCohabitants)
		if entity.HasCohabitant == nil {
			entity.HasCohabitant = &Branch{}
		}
		entity.HasCohabitantID = previous.HasCohabitantID
		entity.HasCohabitant.ID = previous.HasCohabitantID
		if entity.CohabitantList == nil {
			entity.CohabitantList = &Collection{}
		}
		entity.CohabitantListID = previous.CohabitantListID
		entity.CohabitantList.ID = previous.CohabitantListID
	})

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

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *RelationshipsCohabitants) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *RelationshipsCohabitants) SetID(id int) {
	entity.ID = id
}

type RelationshipsPeople struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *RelationshipsPeople) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("relationships.people", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsPeople) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsPeople) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsPeople{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsPeople)
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
func (entity *RelationshipsPeople) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsPeople{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsPeople)
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
func (entity *RelationshipsPeople) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	context.Find(&RelationshipsPeople{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsPeople)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *RelationshipsPeople) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *RelationshipsPeople) SetID(id int) {
	entity.ID = id
}

type RelationshipsRelatives struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *RelationshipsRelatives) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("relationships.relatives", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *RelationshipsRelatives) Valid() (bool, error) {
	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *RelationshipsRelatives) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsRelatives{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsRelatives)
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
func (entity *RelationshipsRelatives) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&RelationshipsRelatives{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsRelatives)
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
func (entity *RelationshipsRelatives) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	context.Find(&RelationshipsRelatives{ID: account}, func(result interface{}) {
		previous := result.(*RelationshipsRelatives)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *RelationshipsRelatives) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *RelationshipsRelatives) SetID(id int) {
	entity.ID = id
}
