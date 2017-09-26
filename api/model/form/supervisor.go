package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

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
	ID                   int   `json:"-"`
	AccountID            int64 `json:"-"`
	SupervisorNameID     int   `json:"-"`
	TitleID              int   `json:"-"`
	EmailID              int   `json:"-"`
	EmailNotApplicableID int   `json:"-"`
	AddressID            int   `json:"-"`
	TelephoneID          int   `json:"-"`
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

func (entity *Supervisor) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	err = context.CreateTable(&Supervisor{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	supervisorNameID, err := entity.SupervisorName.Save(context, account)
	if err != nil {
		return supervisorNameID, err
	}
	entity.SupervisorNameID = supervisorNameID

	titleID, err := entity.Title.Save(context, account)
	if err != nil {
		return titleID, err
	}
	entity.TitleID = titleID

	emailID, err := entity.Email.Save(context, account)
	if err != nil {
		return emailID, err
	}
	entity.EmailID = emailID

	emailNotApplicableID, err := entity.EmailNotApplicable.Save(context, account)
	if err != nil {
		return emailNotApplicableID, err
	}
	entity.EmailNotApplicableID = emailNotApplicableID

	addressID, err := entity.Address.Save(context, account)
	if err != nil {
		return addressID, err
	}
	entity.AddressID = addressID

	telephoneID, err := entity.Telephone.Save(context, account)
	if err != nil {
		return telephoneID, err
	}
	entity.TelephoneID = telephoneID

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *Supervisor) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Supervisor{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.SupervisorName.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Title.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Email.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.EmailNotApplicable.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Address.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Telephone.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *Supervisor) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Supervisor{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.SupervisorNameID != 0 {
		if _, err := entity.SupervisorName.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.TitleID != 0 {
		if _, err := entity.Title.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EmailID != 0 {
		if _, err := entity.Email.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EmailNotApplicableID != 0 {
		if _, err := entity.EmailNotApplicable.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.AddressID != 0 {
		if _, err := entity.Address.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.TelephoneID != 0 {
		if _, err := entity.Telephone.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
