package api

import (
	"encoding/json"
)

// HistoryResidence represents the payload for the history residence section.
type HistoryResidence struct {
	PayloadList Payload `json:"List" sql:"-"`

	List *Collection `json:"-"`
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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *HistoryResidence) ClearNoBranches() error {
	entity.List.ClearBranchNo()

	return nil
}

// HistoryEmployment represents the payload for the history employment section.
type HistoryEmployment struct {
	PayloadList             Payload `json:"List" sql:"-"`
	PayloadEmploymentRecord Payload `json:"EmploymentRecord" sql:"-"`

	List             *Collection `json:"-"`
	EmploymentRecord *Branch     `json:"-"`
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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *HistoryEmployment) ClearNoBranches() error {
	entity.EmploymentRecord.ClearNo()

	nestedErr := entity.List.ClearNestedHasNo("Reprimand")
	if nestedErr != nil {
		return nestedErr
	}
	entity.List.ClearBranchNo()

	return nil
}

// HistoryEducation represents the payload for the history education section.
type HistoryEducation struct {
	PayloadHasAttended Payload `json:"HasAttended" sql:"-"`
	PayloadHasDegree10 Payload `json:"HasDegree10" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	HasAttended *Branch     `json:"-" sql:"-"`
	HasDegree10 *Branch     `json:"-" sql:"-"`
	List        *Collection `json:"-" sql:"-"`
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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *HistoryEducation) ClearNoBranches() error {

	entity.HasAttended.ClearNo()
	entity.HasDegree10.ClearNo()
	entity.List.ClearBranchNo()

	return nil

}

// HistoryFederal represents the payload for the history federal section.
type HistoryFederal struct {
	PayloadHasFederalService Payload `json:"HasFederalService" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	HasFederalService *Branch     `json:"-"`
	List              *Collection `json:"-"`
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

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *HistoryFederal) ClearNoBranches() error {

	entity.HasFederalService.ClearNo()
	entity.List.ClearBranchNo()

	return nil

}
