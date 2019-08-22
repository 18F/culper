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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *RelationshipsMarital) ClearNoBranches() error {

	if entity.CivilUnion != nil {
		entity.CivilUnion.Separated.ClearNo()
		entity.CivilUnion.Divorced.ClearNo()
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

	entity.DivorcedList.ClearBranchNo()

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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *RelationshipsCohabitants) ClearNoBranches() error {

	entity.HasCohabitant.ClearNo()

	entity.CohabitantList.ClearBranchNo()

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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *RelationshipsPeople) ClearNoBranches() error {

	entity.List.ClearBranchNo()

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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *RelationshipsRelatives) ClearNoBranches() error {

	deceasedErr := entity.List.ClearBranchItemsNo("IsDeceased")
	if deceasedErr != nil {
		return errors.Wrap(deceasedErr, "Couldn't clear deceased from relative")
	}

	entity.List.ClearBranchNo()

	return nil
}
