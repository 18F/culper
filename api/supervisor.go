package api

import "encoding/json"

// Supervisor is a basic input.
type Supervisor struct {
	PayloadSupervisorName     Payload `json:"SupervisorName" sql:"-"`
	PayloadTitle              Payload `json:"Title" sql:"-"`
	PayloadEmail              Payload `json:"Email" sql:"-"`
	PayloadEmailNotApplicable Payload `json:"EmailNotApplicable" sql:"-"`
	PayloadAddress            Payload `json:"Address" sql:"-"`
	PayloadTelephone          Payload `json:"Telephone" sql:"-"`

	// Validator specific fields
	SupervisorName     *Text          `json:"-"`
	Title              *Text          `json:"-"`
	Email              *Email         `json:"-"`
	EmailNotApplicable *NotApplicable `json:"-"`
	Address            *Location      `json:"-"`
	Telephone          *Telephone     `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	AccountID            int `json:"-"`
	SupervisorNameID     int `json:"-"`
	TitleID              int `json:"-"`
	EmailID              int `json:"-"`
	EmailNotApplicableID int `json:"-"`
	AddressID            int `json:"-"`
	TelephoneID          int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Supervisor) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	supervisorName, err := entity.PayloadSupervisorName.Entity()
	if err != nil {
		return err
	}
	entity.SupervisorName = supervisorName.(*Text)

	title, err := entity.PayloadTitle.Entity()
	if err != nil {
		return err
	}
	entity.Title = title.(*Text)

	email, err := entity.PayloadEmail.Entity()
	if err != nil {
		return err
	}
	entity.Email = email.(*Email)

	emailNotApplicable, err := entity.PayloadEmailNotApplicable.Entity()
	if err != nil {
		return err
	}
	entity.EmailNotApplicable = emailNotApplicable.(*NotApplicable)

	address, err := entity.PayloadAddress.Entity()
	if err != nil {
		return err
	}
	entity.Address = address.(*Location)

	telephone, err := entity.PayloadTelephone.Entity()
	if err != nil {
		return err
	}
	entity.Telephone = telephone.(*Telephone)

	return err
}

// Marshal to payload structure
func (entity *Supervisor) Marshal() Payload {
	if entity.SupervisorName != nil {
		entity.PayloadSupervisorName = entity.SupervisorName.Marshal()
	}
	if entity.Title != nil {
		entity.PayloadTitle = entity.Title.Marshal()
	}
	if entity.Email != nil {
		entity.PayloadEmail = entity.Email.Marshal()
	}
	if entity.EmailNotApplicable != nil {
		entity.PayloadEmailNotApplicable = entity.EmailNotApplicable.Marshal()
	}
	if entity.Address != nil {
		entity.PayloadAddress = entity.Address.Marshal()
	}
	if entity.Telephone != nil {
		entity.PayloadTelephone = entity.Telephone.Marshal()
	}
	return MarshalPayloadEntity("supervisor", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Supervisor) Valid() (bool, error) {
	if ok, err := entity.SupervisorName.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Title.Valid(); !ok {
		return false, err
	}

	if entity.EmailNotApplicable.Applicable {
		if ok, err := entity.Email.Valid(); !ok {
			return false, err
		}
	}

	if ok, err := entity.Address.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Telephone.Valid(); !ok {
		return false, err
	}

	return true, nil
}
