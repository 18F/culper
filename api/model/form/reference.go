package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
)

// Reference is a basic input.
type Reference struct {
	PayloadFullName           Payload `json:"FullName" sql:"-"`
	PayloadLastContact        Payload `json:"LastContact" sql:"-"`
	PayloadRelationship       Payload `json:"Relationship" sql:"-"`
	PayloadRelationshipOther  Payload `json:"RelationshipOther" sql:"-"`
	PayloadPhone              Payload `json:"Phone" sql:"-"`
	PayloadEmail              Payload `json:"Email" sql:"-"`
	PayloadEmailNotApplicable Payload `json:"EmailNotApplicable" sql:"-"`
	PayloadAddress            Payload `json:"Address" sql:"-"`

	// Validator specific fields
	FullName           *Name          `json:"-"`
	LastContact        *DateControl   `json:"-"`
	Relationship       *CheckboxGroup `json:"-"`
	RelationshipOther  *Text          `json:"-"`
	Phone              *Telephone     `json:"-"`
	Email              *Email         `json:"-"`
	EmailNotApplicable *NotApplicable `json:"-"`
	Address            *Location      `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	AccountID            int `json:"-"`
	FullNameID           int `json:"-"`
	LastContactID        int `json:"-"`
	RelationshipID       int `json:"-"`
	RelationshipOtherID  int `json:"-"`
	PhoneID              int `json:"-"`
	EmailID              int `json:"-"`
	EmailNotApplicableID int `json:"-"`
	AddressID            int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Reference) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	fullName, err := entity.PayloadFullName.Entity()
	if err != nil {
		return err
	}
	entity.FullName = fullName.(*Name)

	lastContact, err := entity.PayloadLastContact.Entity()
	if err != nil {
		return err
	}
	entity.LastContact = lastContact.(*DateControl)

	relationship, err := entity.PayloadRelationship.Entity()
	if err != nil {
		return err
	}
	entity.Relationship = relationship.(*CheckboxGroup)

	relationshipOther, err := entity.PayloadRelationshipOther.Entity()
	if err != nil {
		return err
	}
	entity.RelationshipOther = relationshipOther.(*Text)

	phone, err := entity.PayloadPhone.Entity()
	if err != nil {
		return err
	}
	entity.Phone = phone.(*Telephone)

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

	return err
}

// Marshal to payload structure
func (entity *Reference) Marshal() Payload {
	entity.PayloadFullName = entity.FullName.Marshal()
	entity.PayloadLastContact = entity.LastContact.Marshal()
	entity.PayloadRelationship = entity.Relationship.Marshal()
	entity.PayloadRelationshipOther = entity.RelationshipOther.Marshal()
	entity.PayloadPhone = entity.Phone.Marshal()
	entity.PayloadEmail = entity.Email.Marshal()
	entity.PayloadEmailNotApplicable = entity.EmailNotApplicable.Marshal()
	entity.PayloadAddress = entity.Address.Marshal()
	return MarshalPayloadEntity("reference", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Reference) Valid() (bool, error) {
	if ok, err := entity.FullName.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.LastContact.Valid(); !ok {
		return false, err
	}

	values := entity.Relationship.Values
	l := len(values)
	for i := 0; i < l; i++ {
		v := values[i]
		if v == "Other" {
			if ok, err := entity.RelationshipOther.Valid(); !ok {
				return false, err
			}
		}
	}

	if ok, err := entity.Phone.Valid(); !ok {
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

	return true, nil
}

// Save the Reference entity.
func (entity *Reference) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Reference{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*Reference)
		if entity.FullName == nil {
			entity.FullName = &Name{}
		}
		entity.FullName.ID = previous.FullNameID
		entity.FullNameID = previous.FullNameID
		if entity.LastContact == nil {
			entity.LastContact = &DateControl{}
		}
		entity.LastContact.ID = previous.LastContactID
		entity.LastContactID = previous.LastContactID
		if entity.Relationship == nil {
			entity.Relationship = &CheckboxGroup{}
		}
		entity.Relationship.ID = previous.RelationshipID
		entity.RelationshipID = previous.RelationshipID
		if entity.RelationshipOther == nil {
			entity.RelationshipOther = &Text{}
		}
		entity.RelationshipOther.ID = previous.RelationshipOtherID
		entity.RelationshipOtherID = previous.RelationshipOtherID
		if entity.Phone == nil {
			entity.Phone = &Telephone{}
		}
		entity.Phone.ID = previous.PhoneID
		entity.PhoneID = previous.PhoneID
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
	})

	fullNameID, err := entity.FullName.Save(context, account)
	if err != nil {
		return fullNameID, err
	}
	entity.FullNameID = fullNameID

	lastContactID, err := entity.LastContact.Save(context, account)
	if err != nil {
		return lastContactID, err
	}
	entity.LastContactID = lastContactID

	relationshipID, err := entity.Relationship.Save(context, account)
	if err != nil {
		return relationshipID, err
	}
	entity.RelationshipID = relationshipID

	relationshipOtherID, err := entity.RelationshipOther.Save(context, account)
	if err != nil {
		return relationshipOtherID, err
	}
	entity.RelationshipOtherID = relationshipOtherID

	phoneID, err := entity.Phone.Save(context, account)
	if err != nil {
		return phoneID, err
	}
	entity.PhoneID = phoneID

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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the Reference entity.
func (entity *Reference) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Reference{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*Reference)
		if entity.FullName == nil {
			entity.FullName = &Name{}
		}
		entity.FullName.ID = previous.FullNameID
		entity.FullNameID = previous.FullNameID
		if entity.LastContact == nil {
			entity.LastContact = &DateControl{}
		}
		entity.LastContact.ID = previous.LastContactID
		entity.LastContactID = previous.LastContactID
		if entity.Relationship == nil {
			entity.Relationship = &CheckboxGroup{}
		}
		entity.Relationship.ID = previous.RelationshipID
		entity.RelationshipID = previous.RelationshipID
		if entity.RelationshipOther == nil {
			entity.RelationshipOther = &Text{}
		}
		entity.RelationshipOther.ID = previous.RelationshipOtherID
		entity.RelationshipOtherID = previous.RelationshipOtherID
		if entity.Phone == nil {
			entity.Phone = &Telephone{}
		}
		entity.Phone.ID = previous.PhoneID
		entity.PhoneID = previous.PhoneID
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
	})

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.FullName.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.LastContact.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Relationship.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.RelationshipOther.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Phone.Delete(context, account); err != nil {
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

	return entity.ID, nil
}

// Get the Reference entity.
func (entity *Reference) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Reference{ID: entity.ID, AccountID: account}, func(result interface{}) {
		previous := result.(*Reference)
		if entity.FullName == nil {
			entity.FullName = &Name{}
		}
		entity.FullName.ID = previous.FullNameID
		entity.FullNameID = previous.FullNameID
		if entity.LastContact == nil {
			entity.LastContact = &DateControl{}
		}
		entity.LastContact.ID = previous.LastContactID
		entity.LastContactID = previous.LastContactID
		if entity.Relationship == nil {
			entity.Relationship = &CheckboxGroup{}
		}
		entity.Relationship.ID = previous.RelationshipID
		entity.RelationshipID = previous.RelationshipID
		if entity.RelationshipOther == nil {
			entity.RelationshipOther = &Text{}
		}
		entity.RelationshipOther.ID = previous.RelationshipOtherID
		entity.RelationshipOtherID = previous.RelationshipOtherID
		if entity.Phone == nil {
			entity.Phone = &Telephone{}
		}
		entity.Phone.ID = previous.PhoneID
		entity.PhoneID = previous.PhoneID
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
	})

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.FullNameID != 0 {
		if _, err := entity.FullName.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.LastContactID != 0 {
		if _, err := entity.LastContact.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.RelationshipID != 0 {
		if _, err := entity.Relationship.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.RelationshipOtherID != 0 {
		if _, err := entity.RelationshipOther.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.PhoneID != 0 {
		if _, err := entity.Phone.Get(context, account); err != nil {
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

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Reference) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Reference) SetID(id int) {
	entity.ID = id
}
