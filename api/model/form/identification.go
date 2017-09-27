package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// IdentificationName subsection of identification section.
type IdentificationName struct {
	PayloadName Payload `json:"Name" sql:"-"`

	// Validator specific fields
	Name *Name `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	NameID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationName) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Name)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationName) Valid() (bool, error) {
	return entity.Name.Valid()
}

// Save will create or update the database.
func (entity *IdentificationName) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	exists := false
	previous := &IdentificationName{ID: entity.ID}
	if _, err := previous.Get(context, account); err == nil {
		exists = true
		entity.NameID = previous.NameID
		entity.Name.ID = previous.NameID
	}

	nameID, err := entity.Name.Save(context, account)
	if err != nil {
		return nameID, err
	}
	entity.NameID = nameID

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if exists {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationName) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Name.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationName) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.NameID != 0 {
		entity.Name = &Name{ID: entity.NameID}
		if _, err := entity.Name.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// IdentificationBirthPlace subsection of identification section.
type IdentificationBirthPlace struct {
	Payload Payload `json:"location" sql:"-"`

	// Validator specific fields
	Location *Location

	// Persister specific fields
	ID         int `json:"-"`
	LocationID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationBirthPlace) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	location, err := entity.Payload.Entity()
	if err != nil {
		return err
	}
	entity.Location = location.(*Location)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationBirthPlace) Valid() (bool, error) {
	return entity.Location.Valid()
}

// Save will create or update the database.
func (entity *IdentificationBirthPlace) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	locationID, err := entity.Location.Save(context, account)
	if err != nil {
		return locationID, err
	}
	entity.LocationID = locationID

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationBirthPlace) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Location.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationBirthPlace) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.LocationID != 0 {
		if _, err := entity.Location.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// IdentificationBirthDate subsection of identification section.
type IdentificationBirthDate struct {
	Payload Payload `json:"date" sql:"-"`

	// Validator specific fields
	Date *DateControl `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	DateID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationBirthDate) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	date, err := entity.Payload.Entity()
	if err != nil {
		return err
	}
	entity.Date = date.(*DateControl)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationBirthDate) Valid() (bool, error) {
	return entity.Date.Valid()
}

// Save will create or update the database.
func (entity *IdentificationBirthDate) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	dateID, err := entity.Date.Save(context, account)
	if err != nil {
		return dateID, err
	}
	entity.DateID = dateID

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationBirthDate) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Date.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationBirthDate) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.DateID != 0 {
		if _, err := entity.Date.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// IdentificationSSN subsection of identification section.
type IdentificationSSN struct {
	Payload Payload `json:"ssn" sql:"-"`

	// Validator specific fields
	Verified bool `json:"verified"`
	SSN      *SSN

	// Persister specific fields
	ID    int `json:"-"`
	SSNID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationSSN) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	ssn, err := entity.Payload.Entity()
	if err != nil {
		return err
	}
	entity.SSN = ssn.(*SSN)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationSSN) Valid() (bool, error) {
	if ok, err := entity.SSN.Valid(); !ok {
		return ok, err
	}

	var stack model.ErrorStack
	if !entity.Verified {
		stack.Append("ApplicantSSN", model.ErrFieldInvalid{"SSN has not been verified"})
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationSSN) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	id, err := entity.SSN.Save(context, account)
	if err != nil {
		return id, err
	}
	entity.SSNID = id

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationSSN) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.SSN.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationSSN) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.SSNID != 0 {
		if _, err := entity.SSN.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// IdentificationContacts subsection of identification section.
type IdentificationContacts struct {
	PayloadEmails       Payload `json:"Emails" sql:"-"`
	PayloadPhoneNumbers Payload `json:"PhoneNumbers" sql:"-"`

	// Validator specific fields
	Emails       *Collection `json:"-"`
	PhoneNumbers *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	EmailsID       int `json:"-"`
	PhoneNumbersID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationContacts) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	emails, err := entity.PayloadEmails.Entity()
	if err != nil {
		return err
	}
	entity.Emails = emails.(*Collection)

	phoneNumbers, err := entity.PayloadPhoneNumbers.Entity()
	if err != nil {
		return err
	}
	entity.PhoneNumbers = phoneNumbers.(*Collection)

	return nil
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationContacts) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Emails.Valid(); !ok {
		stack.Append("Emails", err)
	}

	if ok, err := entity.PhoneNumbers.Valid(); !ok {
		stack.Append("PhoneNumbers", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationContacts) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	emailsID, err := entity.Emails.Save(context, account)
	if err != nil {
		return emailsID, err
	}
	entity.EmailsID = emailsID

	phoneNumbersID, err := entity.PhoneNumbers.Save(context, account)
	if err != nil {
		return phoneNumbersID, err
	}
	entity.PhoneNumbersID = phoneNumbersID

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationContacts) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Emails.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.PhoneNumbers.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationContacts) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.EmailsID != 0 {
		if _, err := entity.Emails.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.PhoneNumbersID != 0 {
		if _, err := entity.PhoneNumbers.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// IdentificationOtherNames subsection of identification section.
type IdentificationOtherNames struct {
	PayloadHasOtherNames Payload `json:"HasOtherNames" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOtherNames *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasOtherNamesID int `json:"-"`
	ListID          int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationOtherNames) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	branch, err := entity.PayloadHasOtherNames.Entity()
	if err != nil {
		return err
	}
	entity.HasOtherNames = branch.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return nil
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationOtherNames) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.HasOtherNames.Valid(); !ok {
		stack.Append("OtherNames", err)
	}

	if entity.HasOtherNames.Value == "Yes" {
		if ok, err := entity.List.Valid(); !ok {
			stack.Append("OtherNames", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationOtherNames) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	branchID, err := entity.HasOtherNames.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.HasOtherNamesID = branchID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.ListID = listID

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationOtherNames) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasOtherNames.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationOtherNames) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasOtherNamesID != 0 {
		if _, err := entity.HasOtherNames.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// IdentificationPhysical subsection of identification section.
type IdentificationPhysical struct {
	PayloadComments  Payload `json:"Comments" sql:"-"`
	PayloadEyeColor  Payload `json:"EyeColor" sql:"-"`
	PayloadHairColor Payload `json:"HairColor" sql:"-"`
	PayloadHeight    Payload `json:"Height" sql:"-"`
	PayloadSex       Payload `json:"Sex" sql:"-"`
	PayloadWeight    Payload `json:"Weight" sql:"-"`

	// Validator specific fields
	Comments  *Textarea `json:"-"`
	EyeColor  *Text     `json:"-"`
	HairColor *Text     `json:"-"`
	Sex       *Text     `json:"-"`
	Height    *Height   `json:"-"`
	Weight    *Number   `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	CommentsID  int `json:"-"`
	EyeColorID  int `json:"-"`
	HairColorID int `json:"-"`
	SexID       int `json:"-"`
	HeightID    int `json:"-"`
	WeightID    int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationPhysical) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Textarea)

	eye, err := entity.PayloadEyeColor.Entity()
	if err != nil {
		return err
	}
	entity.EyeColor = eye.(*Text)

	hair, err := entity.PayloadHairColor.Entity()
	if err != nil {
		return err
	}
	entity.HairColor = hair.(*Text)

	sex, err := entity.PayloadSex.Entity()
	if err != nil {
		return err
	}
	entity.Sex = sex.(*Text)

	height, err := entity.PayloadHeight.Entity()
	if err != nil {
		return err
	}
	entity.Height = height.(*Height)

	weight, err := entity.PayloadWeight.Entity()
	if err != nil {
		return err
	}
	entity.Weight = weight.(*Number)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationPhysical) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.EyeColor.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.HairColor.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.Sex.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.Height.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.Weight.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationPhysical) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	commentsID, err := entity.Comments.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.CommentsID = commentsID

	eyeID, err := entity.EyeColor.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.EyeColorID = eyeID

	hairID, err := entity.HairColor.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.HairColorID = hairID

	sexID, err := entity.Sex.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.SexID = sexID

	heightID, err := entity.Height.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.HeightID = heightID

	weightID, err := entity.Weight.Save(context, account)
	if err != nil {
		return entity.ID, err
	}
	entity.WeightID = weightID

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationPhysical) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.EyeColor.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HairColor.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Sex.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Height.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Weight.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationPhysical) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EyeColorID != 0 {
		if _, err := entity.EyeColor.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HairColorID != 0 {
		if _, err := entity.HairColor.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.SexID != 0 {
		if _, err := entity.Sex.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HeightID != 0 {
		if _, err := entity.Height.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.WeightID != 0 {
		if _, err := entity.Weight.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}
