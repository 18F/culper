package api

import (
	"encoding/json"

	"github.com/pkg/errors"
)

// IdentificationName represents the payload for the identification name section.
type IdentificationName struct {
	PayloadName Payload `json:"Name" sql:"-"`

	// Validator specific fields
	Name *Name `json:"-"`

	// Persister specific fields
	ID     int `json:"-"`
	NameID int `json:"-" pg:", fk:Name"`
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

// Marshal to payload structure
func (entity *IdentificationName) Marshal() Payload {
	if entity.Name != nil {
		entity.PayloadName = entity.Name.Marshal()
	}
	return MarshalPayloadEntity("identification.name", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationName) Valid() (bool, error) {
	return entity.Name.Valid()
}

// Save will create or update the database.
func (entity *IdentificationName) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	nameID, err := entity.Name.Save(context, account)
	if err != nil {
		return nameID, err
	}
	entity.NameID = nameID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationName) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Name.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationName) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

// GetID returns the entity identifier.
func (entity *IdentificationName) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *IdentificationName) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *IdentificationName) Find(context DatabaseService) error {
	context.Find(&IdentificationName{ID: entity.ID}, func(result interface{}) {
		previous := result.(*IdentificationName)
		if entity.Name == nil {
			entity.Name = &Name{}
		}
		entity.NameID = previous.NameID
		entity.Name.ID = previous.NameID
	})
	return nil
}

// IdentificationBirthPlace represents the payload for the identification birth place section.
type IdentificationBirthPlace struct {
	Payload Payload `json:"Location" sql:"-"`

	// Validator specific fields
	Location *Location `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	LocationID int `json:"-" pg:", fk:Location"`
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

// Marshal to payload structure
func (entity *IdentificationBirthPlace) Marshal() Payload {
	if entity.Location != nil {
		entity.Payload = entity.Location.Marshal()
	}
	return MarshalPayloadEntity("identification.birthplace", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationBirthPlace) Valid() (bool, error) {
	return entity.Location.Valid()
}

// Save will create or update the database.
func (entity *IdentificationBirthPlace) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	locationID, err := entity.Location.Save(context, account)
	if err != nil {
		return locationID, err
	}
	entity.LocationID = locationID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationBirthPlace) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Location.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationBirthPlace) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.LocationID != 0 {
		entity.Location = &Location{ID: entity.LocationID}
		if _, err := entity.Location.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *IdentificationBirthPlace) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *IdentificationBirthPlace) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *IdentificationBirthPlace) Find(context DatabaseService) error {
	context.Find(&IdentificationBirthPlace{ID: entity.ID}, func(result interface{}) {
		previous := result.(*IdentificationBirthPlace)
		if entity.Location == nil {
			entity.Location = &Location{}
		}
		entity.LocationID = previous.LocationID
		entity.Location.ID = previous.LocationID
	})
	return nil
}

// IdentificationBirthDate represents the payload for the identification birth date section.
type IdentificationBirthDate struct {
	PayloadDate      Payload `json:"Date" sql:"-"`
	PayloadConfirmed Payload `json:"Confirmed" sql:"-"`

	// Validator specific fields
	Date      *DateControl `json:"-"`
	Confirmed *Checkbox    `json:"-"`

	// Persister specific fields
	ID          int `json:"-"`
	DateID      int `json:"-" pg:", fk:Date"`
	ConfirmedID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationBirthDate) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	date, err := entity.PayloadDate.Entity()
	if err != nil {
		return err
	}
	entity.Date = date.(*DateControl)

	confirmed, err := entity.PayloadConfirmed.Entity()
	if err != nil {
		return err
	}
	entity.Confirmed = confirmed.(*Checkbox)

	return err
}

// Marshal to payload structure
func (entity *IdentificationBirthDate) Marshal() Payload {
	if entity.Date != nil {
		entity.PayloadDate = entity.Date.Marshal()
	}
	if entity.Confirmed != nil {
		entity.PayloadConfirmed = entity.Confirmed.Marshal()
	}
	return MarshalPayloadEntity("identification.birthdate", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationBirthDate) Valid() (bool, error) {
	return entity.Date.Valid()
}

// Save will create or update the database.
func (entity *IdentificationBirthDate) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	dateID, err := entity.Date.Save(context, account)
	if err != nil {
		return dateID, err
	}
	entity.DateID = dateID

	confirmedID, err := entity.Confirmed.Save(context, account)
	if err != nil {
		return confirmedID, err
	}
	entity.ConfirmedID = confirmedID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationBirthDate) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.Date.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Confirmed.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationBirthDate) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.DateID != 0 {
		entity.Date = &DateControl{ID: entity.DateID}
		if _, err := entity.Date.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ConfirmedID != 0 {
		entity.Confirmed = &Checkbox{ID: entity.ConfirmedID}
		if _, err := entity.Confirmed.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *IdentificationBirthDate) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *IdentificationBirthDate) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *IdentificationBirthDate) Find(context DatabaseService) error {
	context.Find(&IdentificationBirthDate{ID: entity.ID}, func(result interface{}) {
		previous := result.(*IdentificationBirthDate)
		if entity.Date == nil {
			entity.Date = &DateControl{}
		}
		entity.DateID = previous.DateID
		entity.Date.ID = previous.DateID
		if entity.Confirmed == nil {
			entity.Confirmed = &Checkbox{}
		}
		entity.ConfirmedID = previous.ConfirmedID
		entity.Confirmed.ID = previous.ConfirmedID
	})
	return nil
}

// IdentificationSSN represents the payload for the identification SSN section.
type IdentificationSSN struct {
	Payload Payload `json:"ssn" sql:"-"`

	// Validator specific fields
	Verified bool `json:"verified"`
	SSN      *SSN `json:"-" sql:"-"`

	// Persister specific fields
	ID    int `json:"-"`
	SSNID int `json:"-" pg:", fk:SSN"`
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

// Marshal to payload structure
func (entity *IdentificationSSN) Marshal() Payload {
	if entity.SSN != nil {
		entity.Payload = entity.SSN.Marshal()
	}
	return MarshalPayloadEntity("identification.ssn", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationSSN) Valid() (bool, error) {
	if ok, err := entity.SSN.Valid(); !ok {
		return ok, err
	}

	var stack ErrorStack
	if !entity.Verified {
		stack.Append("ApplicantSSN", ErrFieldInvalid{"SSN has not been verified"})
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationSSN) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	id, err := entity.SSN.Save(context, account)
	if err != nil {
		return id, err
	}
	entity.SSNID = id

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationSSN) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.SSN.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationSSN) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.SSNID != 0 {
		entity.SSN = &SSN{ID: entity.SSNID}
		if _, err := entity.SSN.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *IdentificationSSN) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *IdentificationSSN) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *IdentificationSSN) Find(context DatabaseService) error {
	context.Find(&IdentificationSSN{ID: entity.ID}, func(result interface{}) {
		previous := result.(*IdentificationSSN)
		if entity.SSN == nil {
			entity.SSN = &SSN{}
		}
		entity.SSNID = previous.SSNID
		entity.SSN.ID = previous.SSNID
	})
	return nil
}

// IdentificationContacts represents the payload for the identification contact information section.
type IdentificationContacts struct {
	PayloadHomeEmail    Payload `json:"HomeEmail" sql:"-"`
	PayloadWorkEmail    Payload `json:"WorkEmail" sql:"-"`
	PayloadPhoneNumbers Payload `json:"PhoneNumbers" sql:"-"`

	// Validator specific fields
	HomeEmail    *Email      `json:"-"`
	WorkEmail    *Email      `json:"-"`
	PhoneNumbers *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HomeEmailID    int `json:"-" pg:", fk:HomeEmail"`
	WorkEmailID    int `json:"-" pg:", fk:WorkEmail"`
	PhoneNumbersID int `json:"-" pg:", fk:PhoneNumbers"`
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationContacts) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	homeEmail, err := entity.PayloadHomeEmail.Entity()
	if err != nil {
		return err
	}
	entity.HomeEmail = homeEmail.(*Email)

	workEmail, err := entity.PayloadWorkEmail.Entity()
	if err != nil {
		return err
	}
	entity.WorkEmail = workEmail.(*Email)

	phoneNumbers, err := entity.PayloadPhoneNumbers.Entity()
	if err != nil {
		return err
	}
	entity.PhoneNumbers = phoneNumbers.(*Collection)

	return nil
}

// Marshal to payload structure
func (entity *IdentificationContacts) Marshal() Payload {
	if entity.HomeEmail != nil {
		entity.PayloadHomeEmail = entity.HomeEmail.Marshal()
	}
	if entity.WorkEmail != nil {
		entity.PayloadWorkEmail = entity.WorkEmail.Marshal()
	}
	if entity.PhoneNumbers != nil {
		entity.PayloadPhoneNumbers = entity.PhoneNumbers.Marshal()
	}
	return MarshalPayloadEntity("identification.contacts", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationContacts) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.HomeEmail.Valid(); !ok {
		stack.Append("HomeEmail", err)
	}

	if ok, err := entity.WorkEmail.Valid(); !ok {
		stack.Append("WorkEmail", err)
	}

	if ok, err := entity.PhoneNumbers.Valid(); !ok {
		stack.Append("PhoneNumbers", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationContacts) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	homeEmailID, err := entity.HomeEmail.Save(context, account)
	if err != nil {
		return homeEmailID, err
	}
	entity.HomeEmailID = homeEmailID

	workEmailID, err := entity.WorkEmail.Save(context, account)
	if err != nil {
		return workEmailID, err
	}
	entity.WorkEmailID = workEmailID

	phoneNumbersID, err := entity.PhoneNumbers.Save(context, account)
	if err != nil {
		return phoneNumbersID, err
	}
	entity.PhoneNumbersID = phoneNumbersID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationContacts) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HomeEmail.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.WorkEmail.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.PhoneNumbers.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationContacts) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HomeEmailID != 0 {
		entity.HomeEmail = &Email{ID: entity.HomeEmailID}
		if _, err := entity.HomeEmail.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.WorkEmailID != 0 {
		entity.WorkEmail = &Email{ID: entity.WorkEmailID}
		if _, err := entity.WorkEmail.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.PhoneNumbersID != 0 {
		entity.PhoneNumbers = &Collection{ID: entity.PhoneNumbersID}
		if _, err := entity.PhoneNumbers.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *IdentificationContacts) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *IdentificationContacts) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *IdentificationContacts) Find(context DatabaseService) error {
	context.Find(&IdentificationContacts{ID: entity.ID}, func(result interface{}) {
		previous := result.(*IdentificationContacts)
		if entity.HomeEmail == nil {
			entity.HomeEmail = &Email{}
		}
		entity.HomeEmail.ID = previous.HomeEmailID
		entity.HomeEmailID = previous.HomeEmailID
		if entity.WorkEmail == nil {
			entity.WorkEmail = &Email{}
		}
		entity.WorkEmail.ID = previous.WorkEmailID
		entity.WorkEmailID = previous.WorkEmailID
		if entity.PhoneNumbers == nil {
			entity.PhoneNumbers = &Collection{}
		}
		entity.PhoneNumbersID = previous.PhoneNumbersID
		entity.PhoneNumbers.ID = previous.PhoneNumbersID
	})
	return nil
}

// IdentificationOtherNames represents the payload for the identification other names section.
type IdentificationOtherNames struct {
	PayloadHasOtherNames Payload `json:"HasOtherNames" sql:"-"`
	PayloadList          Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasOtherNames *Branch     `json:"-"`
	List          *Collection `json:"-"`

	// Persister specific fields
	ID              int `json:"-"`
	HasOtherNamesID int `json:"-" pg:", fk:HasOtherNames"`
	ListID          int `json:"-" pg:", fk:List"`
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

// Marshal to payload structure
func (entity *IdentificationOtherNames) Marshal() Payload {
	if entity.HasOtherNames != nil {
		entity.PayloadHasOtherNames = entity.HasOtherNames.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("identification.othernames", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationOtherNames) Valid() (bool, error) {
	var stack ErrorStack

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
func (entity *IdentificationOtherNames) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationOtherNames) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	if _, err := entity.HasOtherNames.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationOtherNames) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 { // DUMB, we just set it to account above, so unless you are calling this with a null account..........
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasOtherNamesID != 0 {
		entity.HasOtherNames = &Branch{ID: entity.HasOtherNamesID}
		if _, err := entity.HasOtherNames.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		entity.List = &Collection{ID: entity.ListID}
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *IdentificationOtherNames) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *IdentificationOtherNames) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *IdentificationOtherNames) Find(context DatabaseService) error {
	context.Find(&IdentificationOtherNames{ID: entity.ID}, func(result interface{}) {
		previous := result.(*IdentificationOtherNames)
		if entity.HasOtherNames == nil {
			entity.HasOtherNames = &Branch{}
		}
		entity.HasOtherNames.ID = previous.HasOtherNamesID
		entity.HasOtherNamesID = previous.HasOtherNamesID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.List.ID = previous.ListID
		entity.ListID = previous.ListID
	})
	return nil
}

// ClearIdentificationOtherNamesNos clears nos from identifcation.other_names
func ClearIdentificationOtherNamesNos(context DatabaseService, accountID int) error {
	otherNames := IdentificationOtherNames{}
	_, err := otherNames.Get(context, accountID)
	if err != nil {
		if IsDatabaseErrorNotFound(err) {
			return nil
		}
		return errors.Wrap(err, "Unable to load Other Names")
	}

	otherNamesModified := false
	if otherNames.HasOtherNames != nil {
		if otherNames.HasOtherNames.Value == "No" {
			otherNames.HasOtherNames.Value = ""
			otherNamesModified = true
		} else {
			// the last thing in the list will be another branch, which must also be cleared.
			if otherNames.List != nil {
				if otherNames.List.Branch != nil {
					if otherNames.List.Branch.Value == "No" {
						otherNames.List.Branch.Value = ""
						otherNamesModified = true
					}
				}
			}
		}
	}

	if otherNamesModified {
		_, err = otherNames.Save(context, accountID)
		if err != nil {
			return errors.Wrap(err, "Unable to save Other Names")
		}
	}

	return nil
}

// IdentificationPhysical represents the payload for the identification physical traits section.
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
	CommentsID  int `json:"-" pg:", fk:Comments"`
	EyeColorID  int `json:"-" pg:", fk:EyeColor"`
	HairColorID int `json:"-" pg:", fk:HairColor"`
	SexID       int `json:"-" pg:", fk:Sex"`
	HeightID    int `json:"-" pg:", fk:Height"`
	WeightID    int `json:"-" pg:", fk:Weight"`
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

// Marshal to payload structure
func (entity *IdentificationPhysical) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	if entity.EyeColor != nil {
		entity.PayloadEyeColor = entity.EyeColor.Marshal()
	}
	if entity.HairColor != nil {
		entity.PayloadHairColor = entity.HairColor.Marshal()
	}
	if entity.Height != nil {
		entity.PayloadHeight = entity.Height.Marshal()
	}
	if entity.Sex != nil {
		entity.PayloadSex = entity.Sex.Marshal()
	}
	if entity.Weight != nil {
		entity.PayloadWeight = entity.Weight.Marshal()
	}
	return MarshalPayloadEntity("identification.physical", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationPhysical) Valid() (bool, error) {
	var stack ErrorStack

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
func (entity *IdentificationPhysical) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationPhysical) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationPhysical) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		entity.Comments = &Textarea{ID: entity.CommentsID}
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.EyeColorID != 0 {
		entity.EyeColor = &Text{ID: entity.EyeColorID}
		if _, err := entity.EyeColor.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HairColorID != 0 {
		entity.HairColor = &Text{ID: entity.HairColorID}
		if _, err := entity.HairColor.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.SexID != 0 {
		entity.Sex = &Text{ID: entity.SexID}
		if _, err := entity.Sex.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HeightID != 0 {
		entity.Height = &Height{ID: entity.HeightID}
		if _, err := entity.Height.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.WeightID != 0 {
		entity.Weight = &Number{ID: entity.WeightID}
		if _, err := entity.Weight.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *IdentificationPhysical) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *IdentificationPhysical) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *IdentificationPhysical) Find(context DatabaseService) error {
	context.Find(&IdentificationPhysical{ID: entity.ID}, func(result interface{}) {
		previous := result.(*IdentificationPhysical)
		if entity.Comments == nil {
			entity.Comments = &Textarea{}
		}
		entity.Comments.ID = previous.CommentsID
		entity.CommentsID = previous.CommentsID
		if entity.EyeColor == nil {
			entity.EyeColor = &Text{}
		}
		entity.EyeColor.ID = previous.EyeColorID
		entity.EyeColorID = previous.EyeColorID
		if entity.HairColor == nil {
			entity.HairColor = &Text{}
		}
		entity.HairColor.ID = previous.HairColorID
		entity.HairColorID = previous.HairColorID
		if entity.Sex == nil {
			entity.Sex = &Text{}
		}
		entity.Sex.ID = previous.SexID
		entity.SexID = previous.SexID
		if entity.Height == nil {
			entity.Height = &Height{}
		}
		entity.Height.ID = previous.HeightID
		entity.HeightID = previous.HeightID
		if entity.Weight == nil {
			entity.Weight = &Number{}
		}
		entity.Weight.ID = previous.WeightID
		entity.WeightID = previous.WeightID
	})
	return nil
}
