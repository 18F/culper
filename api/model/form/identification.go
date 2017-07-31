package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"
)

// IdentificationName subsection of identification section.
type IdentificationName struct {
	Name Payload `json:"name"`
	name Name
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationName) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	name, err := entity.Name.Entity()
	if err != nil {
		return err
	}
	entity.name = *name.(*Name)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationName) Valid() (bool, error) {
	return entity.name.Valid()
}

// Save will create or update the database.
func (entity *IdentificationName) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationName) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationName) Get() error {
	return nil
}

// IdentificationBirthPlace subsection of identification section.
type IdentificationBirthPlace struct {
	Location Payload `json:"location"`
	location Location
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationBirthPlace) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	location, err := entity.Location.Entity()
	if err != nil {
		return err
	}
	entity.location = *location.(*Location)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationBirthPlace) Valid() (bool, error) {
	return entity.location.Valid()
}

// Save will create or update the database.
func (entity *IdentificationBirthPlace) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationBirthPlace) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationBirthPlace) Get() error {
	return nil
}

// IdentificationBirthDate subsection of identification section.
type IdentificationBirthDate struct {
	Date Payload `json:"date"`
	date DateControl
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationBirthDate) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	date, err := entity.Date.Entity()
	if err != nil {
		return err
	}
	entity.date = *date.(*DateControl)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationBirthDate) Valid() (bool, error) {
	return entity.date.Valid()
}

// Save will create or update the database.
func (entity *IdentificationBirthDate) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationBirthDate) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationBirthDate) Get() error {
	return nil
}

// IdentificationSSN subsection of identification section.
type IdentificationSSN struct {
	SSN      Payload `json:"ssn"`
	Verified bool    `json:"verified"`
	ssn      SSN
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationSSN) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	ssn, err := entity.SSN.Entity()
	if err != nil {
		return err
	}
	entity.ssn = *ssn.(*SSN)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationSSN) Valid() (bool, error) {
	if ok, err := entity.ssn.Valid(); !ok {
		return ok, err
	}

	var stack model.ErrorStack
	if !entity.Verified {
		stack.Append("ApplicantSSN", model.ErrFieldInvalid{"SSN has not been verified"})
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationSSN) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationSSN) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationSSN) Get() error {
	return nil
}

// IdentificationContacts subsection of identification section.
type IdentificationContacts struct {
	Emails       Payload
	PhoneNumbers Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationContacts) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationContacts) Valid() (bool, error) {
	var stack model.ErrorStack

	if _, err := entity.Emails.Entity(); err != nil {
		stack.Append("Emails", err)
	}

	if _, err := entity.PhoneNumbers.Entity(); err != nil {
		stack.Append("PhoneNumbers", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationContacts) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationContacts) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationContacts) Get() error {
	return nil
}

// IdentificationOtherNames subsection of identification section.
type IdentificationOtherNames struct {
	HasOtherNames Payload
	List          Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationOtherNames) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationOtherNames) Valid() (bool, error) {
	var stack model.ErrorStack

	b, err := entity.HasOtherNames.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := b.Valid(); !ok {
		stack.Append("OtherNames", err)
	}

	if b.(*Branch).Value == "Yes" {
		l, err := entity.List.Entity()
		if err != nil {
			return false, err
		}

		if ok, err := l.Valid(); !ok {
			stack.Append("OtherNames", err)
		}
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationOtherNames) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationOtherNames) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationOtherNames) Get() error {
	return nil
}

// IdentificationPhysical subsection of identification section.
type IdentificationPhysical struct {
	Comments  Payload
	EyeColor  Payload
	HairColor Payload
	Height    Payload
	Sex       Payload
	Weight    Payload

	comments Textarea
	eye      Text
	hair     Text
	sex      Text
	height   Height
	weight   Number
}

// Unmarshal bytes in to the entity properties.
func (entity *IdentificationPhysical) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.Comments.Entity()
	if err != nil {
		return err
	}
	entity.comments = *comments.(*Textarea)

	eye, err := entity.EyeColor.Entity()
	if err != nil {
		return err
	}
	entity.eye = *eye.(*Text)

	hair, err := entity.HairColor.Entity()
	if err != nil {
		return err
	}
	entity.hair = *hair.(*Text)

	sex, err := entity.Sex.Entity()
	if err != nil {
		return err
	}
	entity.sex = *sex.(*Text)

	height, err := entity.Height.Entity()
	if err != nil {
		return err
	}
	entity.height = *height.(*Height)

	weight, err := entity.Weight.Entity()
	if err != nil {
		return err
	}
	entity.weight = *weight.(*Number)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *IdentificationPhysical) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.eye.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.hair.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.sex.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.height.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	if ok, err := entity.weight.Valid(); !ok {
		stack.Append("ApplicantPhysical", err)
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *IdentificationPhysical) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *IdentificationPhysical) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *IdentificationPhysical) Get() error {
	return nil
}
