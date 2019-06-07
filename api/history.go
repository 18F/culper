package api

import (
	"encoding/json"

	"github.com/pkg/errors"
)

// HistoryResidence represents the payload for the history residence section.
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

// ClearNos clears any questions answered nos on a kickback
func (entity *HistoryResidence) ClearNos() error {
	entity.List.ClearBranchNo()

	return nil
}

// HistoryEmployment represents the payload for the history employment section.
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

// ClearNos clears any questions answered nos on a kickback
func (entity *HistoryEmployment) ClearNos() error {
	entity.EmploymentRecord.ClearNo()

	// loop through all the records of employment.
	if entity.List != nil {
		for _, employmentInstance := range entity.List.Items {
			reprimandsEntity, repErr := employmentInstance.GetItemValue("Reprimand")
			if repErr != nil {
				return errors.Wrap(repErr, "Failed to pull a reprimand from an employment instance")
			}

			reprimands := reprimandsEntity.(*Collection)

			clearErr := reprimands.ClearBranchItemsNo("Has")
			if clearErr != nil {
				return clearErr
			}

			setErr := employmentInstance.SetItemValue("Reprimand", reprimands)
			if setErr != nil {
				return setErr
			}
		}
	}

	entity.List.ClearBranchNo()

	return nil
}

// HistoryEducation represents the payload for the history education section.
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

// ClearNos clears any questions answered nos on a kickback
func (entity *HistoryEducation) ClearNos() error {

	entity.HasAttended.ClearNo()
	entity.HasDegree10.ClearNo()
	entity.List.ClearBranchNo()

	return nil

}

// HistoryFederal represents the payload for the history federal section.
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

// ClearNos clears any questions answered nos on a kickback
func (entity *HistoryFederal) ClearNos() error {

	entity.HasFederalService.ClearNo()
	entity.List.ClearBranchNo()

	return nil

}
