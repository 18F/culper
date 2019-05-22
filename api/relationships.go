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

	if entity.DivorcedList != nil {
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

// ClearNos clears any questions answered nos on a kickback
func (entity *RelationshipsCohabitants) ClearNos() error {

	if entity.HasCohabitant != nil && entity.HasCohabitant.Value == "No" {
		entity.HasCohabitant.Value = ""
	}

	if entity.CohabitantList != nil && entity.CohabitantList.Branch != nil && entity.CohabitantList.Branch.Value == "No" {
		entity.CohabitantList.Branch.Value = ""
	}

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

// ClearNos clears any questions answered nos on a kickback
func (entity *RelationshipsPeople) ClearNos() error {

	if entity.List != nil && entity.List.Branch != nil && entity.List.Branch.Value == "No" {
		entity.List.Branch.Value = ""
	}

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

// ClearNos clears any questions answered nos on a kickback
func (entity *RelationshipsRelatives) ClearNos() error {

	if entity.List != nil {
		for _, divorcedItem := range entity.List.Items {

			deceased, itemErr := divorcedItem.GetItemValue("IsDeceased")
			if itemErr != nil {
				return errors.Wrap(itemErr, "Failed to pull deceased from a divorcee")
			}
			deceasedBranch := deceased.(*Branch)

			if deceasedBranch.Value == "No" {
				deceasedBranch.Value = ""
			}

			setErr := divorcedItem.SetItemValue("IsDeceased", deceasedBranch)
			if setErr != nil {
				return errors.Wrap(setErr, "Failed to set deceased for a divorcee")
			}

		}
	}

	if entity.List != nil && entity.List.Branch != nil && entity.List.Branch.Value == "No" {
		entity.List.Branch.Value = ""
	}

	return nil
}
