package api

import "encoding/json"

// MilitarySelective represents the payload for the military service section.
type MilitarySelective struct {
	PayloadWasBornAfter               Payload `json:"WasBornAfter" sql:"-"`
	PayloadHasRegistered              Payload `json:"HasRegistered" sql:"-"`
	PayloadRegistrationNumber         Payload `json:"RegistrationNumber" sql:"-"`
	PayloadExplanation                Payload `json:"Explanation" sql:"-"`
	PayloadHasRegisteredNotApplicable Payload `json:"HasRegisteredNotApplicable" sql:"-"`

	// Validator specific fields
	WasBornAfter               *Branch        `json:"-"`
	HasRegistered              *Branch        `json:"-"`
	RegistrationNumber         *Text          `json:"-"`
	Explanation                *Textarea      `json:"-"`
	HasRegisteredNotApplicable *NotApplicable `json:"-"`

	// Persister specific fields
	ID                           int `json:"-"`
	WasBornAfterID               int `json:"-" pg:", fk:WasBornAfter"`
	HasRegisteredID              int `json:"-" pg:", fk:HasRegistered"`
	RegistrationNumberID         int `json:"-" pg:", fk:RegistrationNumber"`
	ExplanationID                int `json:"-" pg:", fk:Explanation"`
	HasRegisteredNotApplicableID int `json:"-" pg:", fk:HasRegisteredNotApplicable"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *MilitarySelective) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.WasBornAfter.Valid(); !ok {
		stack.Append("MilitarySelective", err)
	}

	if entity.WasBornAfter.Value == "Yes" {
		if ok, err := entity.HasRegistered.Valid(); !ok {
			stack.Append("MilitarySelective", err)
		} else {
			if entity.HasRegistered.Value == "Yes" {
				if ok, err := entity.RegistrationNumber.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			} else if entity.HasRegistered.Value == "No" {
				if ok, err := entity.Explanation.Valid(); !ok {
					stack.Append("MilitarySelective", err)
				}
			}
		}
	}

	if entity.HasRegisteredNotApplicable != nil {
		if ok, err := entity.HasRegisteredNotApplicable.Valid(); !ok {
			return false, err
		}
	}

	return !stack.HasErrors(), stack
}

// MilitaryHistory represents the payload for the military history section.
type MilitaryHistory struct {
	PayloadHasServed Payload `json:"HasServed" sql:"-"`
	PayloadList      Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasServed *Branch     `json:"-"`
	List      *Collection `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	HasServedID int `json:"-" pg:", fk:HasServed"`
	ListID      int `json:"-" pg:", fk:List"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryHistory) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.HasServed.Valid(); !ok {
		stack.Append("MilitaryHistory", err)
	}

	if entity.HasServed.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("MilitaryHistory", err)
		}
	}

	return !stack.HasErrors(), stack
}

// MilitaryDisciplinary represents the payload for the military disposition section.
type MilitaryDisciplinary struct {
	PayloadHasDisciplinary Payload `json:"HasDisciplinary" sql:"-"`
	PayloadList            Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasDisciplinary *Branch     `json:"-"`
	List            *Collection `json:"-"`

	// Persister specific fields
	ID                int `json:"-"`
	HasDisciplinaryID int `json:"-" pg:", fk:HasDisciplinary"`
	ListID            int `json:"-" pg:", fk:List"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryDisciplinary) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.HasDisciplinary.Valid(); !ok {
		stack.Append("MilitaryDisciplinary", err)
	}

	if entity.HasDisciplinary.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("MilitaryDisciplinary", err)
		}
	}

	return !stack.HasErrors(), stack
}

// MilitaryForeign represents the payload for the military foreign section.
type MilitaryForeign struct {
	PayloadList Payload `json:"List" sql:"-"`

	// Validator specific fields
	List *Collection `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	ListID int `json:"-" pg:", fk:List"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *MilitaryForeign) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.List.Valid(); !ok {
		stack.Append("MilitaryForeign", err)
	}

	return !stack.HasErrors(), stack
}
