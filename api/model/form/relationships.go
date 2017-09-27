package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
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
	ID             int `json:"-"`
	StatusID       int `json:"-"`
	CivilUnionID   int `json:"-"`
	DivorcedListID int `json:"-"`
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
func (entity *RelationshipsMarital) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

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
func (entity *RelationshipsMarital) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
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

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
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

type RelationshipsCohabitants struct {
	PayloadHasCohabitant  Payload `json:"HasCohabitant" sql:"-"`
	PayloadCohabitantList Payload `json:"CohabitantList" sql:"-"`

	// Validator specific fields
	HasCohabitant  *Branch     `json:"-"`
	CohabitantList *Collection `json:"-"`

	// Persister specific fields
	ID               int `json:"-"`
	HasCohabitantID  int `json:"-"`
	CohabitantListID int `json:"-"`
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
func (entity *RelationshipsCohabitants) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
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
func (entity *RelationshipsCohabitants) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasCohabitant.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.CohabitantList.Delete(context, account); err != nil {
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

type RelationshipsPeople struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-"`
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
func (entity *RelationshipsPeople) Save(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *RelationshipsPeople) Delete(context *db.DatabaseContext, account int) (int, error) {
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

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

type RelationshipsRelatives struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-"`
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
func (entity *RelationshipsRelatives) Save(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *RelationshipsRelatives) Delete(context *db.DatabaseContext, account int) (int, error) {
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

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}
