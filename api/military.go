package api

import (
	"encoding/json"

	"github.com/pkg/errors"
)

// MilitarySelective represents the payload for the military service section.
type MilitarySelective struct {
	PayloadWasBornAfter               Payload `json:"WasBornAfter" sql:"-"`
	PayloadHasRegistered              Payload `json:"HasRegistered" sql:"-"`
	PayloadRegistrationNumber         Payload `json:"RegistrationNumber" sql:"-"`
	PayloadExplanation                Payload `json:"Explanation" sql:"-"`
	PayloadHasRegisteredNotApplicable Payload `json:"HasRegisteredNotApplicable" sql:"-"`

	WasBornAfter               *Branch        `json:"-"`
	HasRegistered              *Branch        `json:"-"`
	RegistrationNumber         *Text          `json:"-"`
	Explanation                *Textarea      `json:"-"`
	HasRegisteredNotApplicable *NotApplicable `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitarySelective) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	wasBornAfter, err := entity.PayloadWasBornAfter.Entity()
	if err != nil {
		return err
	}
	entity.WasBornAfter = wasBornAfter.(*Branch)

	hasRegistered, err := entity.PayloadHasRegistered.Entity()
	if err != nil {
		return err
	}
	entity.HasRegistered = hasRegistered.(*Branch)

	registrationNumber, err := entity.PayloadRegistrationNumber.Entity()
	if err != nil {
		return err
	}
	entity.RegistrationNumber = registrationNumber.(*Text)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	hasRegisteredNotApplicable, err := entity.PayloadHasRegisteredNotApplicable.Entity()
	if err != nil {
		return err
	}
	entity.HasRegisteredNotApplicable = hasRegisteredNotApplicable.(*NotApplicable)

	return err
}

// Marshal to payload structure
func (entity *MilitarySelective) Marshal() Payload {
	if entity.WasBornAfter != nil {
		entity.PayloadWasBornAfter = entity.WasBornAfter.Marshal()
	}
	if entity.HasRegistered != nil {
		entity.PayloadHasRegistered = entity.HasRegistered.Marshal()
	}
	if entity.RegistrationNumber != nil {
		entity.PayloadRegistrationNumber = entity.RegistrationNumber.Marshal()
	}
	if entity.Explanation != nil {
		entity.PayloadExplanation = entity.Explanation.Marshal()
	}
	if entity.HasRegisteredNotApplicable != nil {
		entity.PayloadHasRegisteredNotApplicable = entity.HasRegisteredNotApplicable.Marshal()
	}
	return MarshalPayloadEntity("military.selective", entity)
}

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *MilitarySelective) ClearNoBranches() error {

	entity.HasRegistered.ClearNo()

	return nil
}

// MilitaryHistory represents the payload for the military history section.
type MilitaryHistory struct {
	PayloadHasServed Payload `json:"HasServed" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	HasServed *Branch     `json:"-"`
	List      *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryHistory) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasServed, err := entity.PayloadHasServed.Entity()
	if err != nil {
		return err
	}
	entity.HasServed = hasServed.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *MilitaryHistory) Marshal() Payload {
	if entity.HasServed != nil {
		entity.PayloadHasServed = entity.HasServed.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("military.history", entity)
}

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *MilitaryHistory) ClearNoBranches() error {

	entity.HasServed.ClearNo()

	itemsErr := entity.List.ClearBranchItemsNo("HasBeenDischarged")
	if itemsErr != nil {
		errors.Wrap(itemsErr, "Couldn't clear discharge from military")
	}

	entity.List.ClearBranchNo()

	return nil
}

// MilitaryDisciplinary represents the payload for the military disposition section.
type MilitaryDisciplinary struct {
	PayloadHasDisciplinary Payload `json:"HasDisciplinary" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	HasDisciplinary *Branch     `json:"-"`
	List            *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryDisciplinary) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasDisciplinary, err := entity.PayloadHasDisciplinary.Entity()
	if err != nil {
		return err
	}
	entity.HasDisciplinary = hasDisciplinary.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *MilitaryDisciplinary) Marshal() Payload {
	if entity.HasDisciplinary != nil {
		entity.PayloadHasDisciplinary = entity.HasDisciplinary.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("military.disciplinary", entity)
}

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *MilitaryDisciplinary) ClearNoBranches() error {

	entity.HasDisciplinary.ClearNo()

	entity.List.ClearBranchNo()

	return nil
}

// MilitaryForeign represents the payload for the military foreign section.
type MilitaryForeign struct {
	PayloadList Payload `json:"List" sql:"-"`

	List *Collection `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *MilitaryForeign) Unmarshal(raw []byte) error {
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
func (entity *MilitaryForeign) Marshal() Payload {
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("military.foreign", entity)
}

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *MilitaryForeign) ClearNoBranches() error {

	listErr := entity.List.ClearBranchItemsNo("Has", "MaintainsContact")
	if listErr != nil {
		return errors.Wrap(listErr, "couldn't clear the military has")
	}

	return nil
}
