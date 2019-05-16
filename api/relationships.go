package api

import (
	"encoding/json"

	"github.com/pkg/errors"
)

// RelationshipsMarital represents the payload for the relationships marital section.
type RelationshipsMarital struct {
	PayloadStatus       Payload `json:"Status" sql:"-"`
	PayloadCivilUnion   Payload `json:"CivilUnion" sql:"-"`
	PayloadDivorcedList Payload `json:"DivorcedList" sql:"-"`

	// Validator specific fields
	Status *Radio `json:"-"`
	// This is VERY weird. Without the sql:"-" tag we can't save one of these
	// go-pg complains that the civil_union column doesn't exist.
	// But it doesn't complain that the divorced_list or status columns don't exist
	// It may be rare for a top level section to point to a non-basic type? (*CivilUnion vs. *Collection)
	// But I'm at a loss. Thankfully we are switching away from go-pg soon.
	CivilUnion   *CivilUnion `json:"-" sql:"-"`
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
	var stack ErrorStack

	sv := entity.Status.Value
	switch {
	case sv == "Married" || sv == "Separated":
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
func (entity *RelationshipsMarital) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsMarital) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsMarital) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
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

// Find the previous entity stored if one is available.
func (entity *RelationshipsMarital) Find(context DatabaseService) error {
	context.Find(&RelationshipsMarital{ID: entity.ID}, func(result interface{}) {
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
	return nil
}

// ClearNos clears any questions answered nos on a kickback
func (entity *RelationshipsMarital) ClearNos() error {

	if entity.CivilUnion != nil && entity.CivilUnion.Separated != nil && entity.CivilUnion.Separated.Value == "No" {
		entity.CivilUnion.Separated.Value = ""
	}

	if entity.CivilUnion != nil && entity.CivilUnion.Divorced != nil && entity.CivilUnion.Divorced.Value == "No" {
		entity.CivilUnion.Divorced.Value = ""
	}

	if entity.DivorcedList != nil && entity.DivorcedList.Branch != nil && entity.DivorcedList.Branch.Value == "No" {
		entity.DivorcedList.Branch.Value = ""
	}

	for _, divorcedItem := range entity.DivorcedList.Items {

		deceased, itemErr := divorcedItem.GetItemValue("Deceased")
		if itemErr != nil {
			return errors.Wrap(itemErr, "Failed to pull deceased from a divorcee")
		}
		deceasedRadio := deceased.(*Radio)

		if deceasedRadio.Value == "No" {
			deceasedRadio.Value = ""
		}

		setErr := divorcedItem.SetItemValue("Deceased", deceasedRadio)
		if setErr != nil {
			return errors.Wrap(setErr, "Failed to set deceased for a divorcee")
		}

	}

	return nil

}

// RelationshipsCohabitants represents the payload for the relationships cohabitants section.
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
func (entity *RelationshipsCohabitants) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsCohabitants) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsCohabitants) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
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

// Find the previous entity stored if one is available.
func (entity *RelationshipsCohabitants) Find(context DatabaseService) error {
	context.Find(&RelationshipsCohabitants{ID: entity.ID}, func(result interface{}) {
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
	return nil
}

// RelationshipsPeople represents the payload for the relationships people section.
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
func (entity *RelationshipsPeople) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsPeople) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsPeople) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

// Find the previous entity stored if one is available.
func (entity *RelationshipsPeople) Find(context DatabaseService) error {
	context.Find(&RelationshipsPeople{ID: entity.ID}, func(result interface{}) {
		previous := result.(*RelationshipsPeople)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}

// RelationshipsRelatives represents the payload for the relationships relatives section.
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
func (entity *RelationshipsRelatives) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsRelatives) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsRelatives) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

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

// Find the previous entity stored if one is available.
func (entity *RelationshipsRelatives) Find(context DatabaseService) error {
	context.Find(&RelationshipsRelatives{ID: entity.ID}, func(result interface{}) {
		previous := result.(*RelationshipsRelatives)
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}
