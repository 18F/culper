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

// Save the Supervisor entity.
func (entity *Supervisor) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the Supervisor entity.
func (entity *Supervisor) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.SupervisorName.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Title.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Email.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.EmailNotApplicable.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Address.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Telephone.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get the Supervisor entity.
func (entity *Supervisor) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Supervisor) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Supervisor) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *Supervisor) Find(context DatabaseService) error {
	context.Find(&Supervisor{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*Supervisor)
		if entity.SupervisorName == nil {
			entity.SupervisorName = &Text{}
		}
		entity.SupervisorName.ID = previous.SupervisorNameID
		entity.SupervisorNameID = previous.SupervisorNameID
		if entity.Title == nil {
			entity.Title = &Text{}
		}
		entity.Title.ID = previous.TitleID
		entity.TitleID = previous.TitleID
		if entity.Email == nil {
			entity.Email = &Email{}
		}
		entity.Email.ID = previous.EmailID
		entity.EmailID = previous.EmailID
		if entity.EmailNotApplicable == nil {
			entity.EmailNotApplicable = &NotApplicable{}
		}
		entity.EmailNotApplicable.ID = previous.EmailNotApplicableID
		entity.EmailNotApplicableID = previous.EmailNotApplicableID
		if entity.Address == nil {
			entity.Address = &Location{}
		}
		entity.Address.ID = previous.AddressID
		entity.AddressID = previous.AddressID
		if entity.Telephone == nil {
			entity.Telephone = &Telephone{}
		}
		entity.Telephone.ID = previous.TelephoneID
		entity.TelephoneID = previous.TelephoneID
	})
	return nil
}
