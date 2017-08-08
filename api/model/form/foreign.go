package form

import (
	"encoding/json"
	"errors"
	"regexp"
)

var (
	formatPassportBook = regexp.MustCompile(`^[a-zA-Z]{1}[0-9]{6,9}$`)
	formatPassportCard = regexp.MustCompile(`^[cC]{1}[0-9]{8}$`)
)

type ForeignPassport struct {
	HasPassports Payload
	Name         Payload
	Card         Payload
	Number       Payload
	Issued       Payload
	Expiration   Payload
	Comments     Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignPassport) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignPassport) Valid() (bool, error) {
	b, err := entity.HasPassports.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	if ok, err := entity.Name.Valid(); !ok {
		return false, err
	}

	card, err := entity.Card.Entity()
	if err != nil {
		return false, err
	}

	number, err := entity.Number.Entity()
	if err != nil {
		return false, err
	}

	cv := card.(*Radio).Value
	nv := number.(*Text).Value
	if cv == "Book" {
		if ok := formatPassportBook.MatchString(nv); !ok {
			return false, errors.New("Invalid format for passport book")
		}
	} else if cv == "Card" {
		if ok := formatPassportCard.MatchString(nv); !ok {
			return false, errors.New("Invalid format for passport card")
		}
	}

	if ok, err := entity.Issued.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Expiration.Valid(); !ok {
		return false, err
	}

	return true, nil
}

// Save will create or update the database.
func (entity *ForeignPassport) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignPassport) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignPassport) Get() error {
	return nil
}

type ForeignContacts struct {
	HasForeignContacts Payload
	List               Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignContacts) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignContacts) Valid() (bool, error) {
	b, err := entity.HasForeignContacts.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignContacts) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignContacts) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignContacts) Get() error {
	return nil
}

type ForeignTravel struct {
	HasForeignTravelOutside  Payload
	HasForeignTravelOfficial Payload
	List                     Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignTravel) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignTravel) Valid() (bool, error) {
	outside, err := entity.HasForeignTravelOutside.Entity()
	if err != nil {
		return false, err
	}

	if outside.(*Branch).Value == "No" {
		return true, nil
	}

	official, err := entity.HasForeignTravelOfficial.Entity()
	if err != nil {
		return false, err
	}

	if official.(*Branch).Value == "Yes" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignTravel) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignTravel) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignTravel) Get() error {
	return nil
}

type ForeignActivitiesBenefits struct {
	HasBenefits Payload
	List        Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesBenefits) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesBenefits) Valid() (bool, error) {
	b, err := entity.HasBenefits.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesBenefits) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesBenefits) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesBenefits) Get() error {
	return nil
}

type ForeignActivitiesDirect struct {
	HasInterests Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesDirect) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesDirect) Valid() (bool, error) {
	b, err := entity.HasInterests.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesDirect) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesDirect) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesDirect) Get() error {
	return nil
}

type ForeignActivitiesIndirect struct {
	HasInterests Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesIndirect) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesIndirect) Valid() (bool, error) {
	b, err := entity.HasInterests.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesIndirect) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesIndirect) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesIndirect) Get() error {
	return nil
}

type ForeignActivitiesRealEstate struct {
	HasInterests Payload
	List         Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesRealEstate) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesRealEstate) Valid() (bool, error) {
	b, err := entity.HasInterests.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesRealEstate) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesRealEstate) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesRealEstate) Get() error {
	return nil
}

type ForeignActivitiesSupport struct {
	HasForeignSupport Payload
	List              Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesSupport) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesSupport) Valid() (bool, error) {
	b, err := entity.HasForeignSupport.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesSupport) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesSupport) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesSupport) Get() error {
	return nil
}

type ForeignBusinessAdvice struct {
	HasForeignAdvice Payload
	List             Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessAdvice) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessAdvice) Valid() (bool, error) {
	b, err := entity.HasForeignAdvice.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessAdvice) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessAdvice) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessAdvice) Get() error {
	return nil
}

type ForeignBusinessConferences struct {
	HasForeignConferences Payload
	List                  Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessConferences) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessConferences) Valid() (bool, error) {
	b, err := entity.HasForeignConferences.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessConferences) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessConferences) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessConferences) Get() error {
	return nil
}

type ForeignBusinessContact struct {
	HasForeignContact Payload
	List              Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessContact) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessContact) Valid() (bool, error) {
	b, err := entity.HasForeignContact.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessContact) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessContact) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessContact) Get() error {
	return nil
}

type ForeignBusinessEmployment struct {
	HasForeignEmployment Payload
	List                 Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessEmployment) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessEmployment) Valid() (bool, error) {
	b, err := entity.HasForeignEmployment.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessEmployment) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessEmployment) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessEmployment) Get() error {
	return nil
}

type ForeignBusinessFamily struct {
	HasForeignFamily Payload
	List             Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessFamily) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessFamily) Valid() (bool, error) {
	b, err := entity.HasForeignFamily.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessFamily) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessFamily) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessFamily) Get() error {
	return nil
}

type ForeignBusinessPolitical struct {
	HasForeignPolitical Payload
	List                Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessPolitical) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessPolitical) Valid() (bool, error) {
	b, err := entity.HasForeignPolitical.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessPolitical) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessPolitical) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessPolitical) Get() error {
	return nil
}

type ForeignBusinessSponsorship struct {
	HasForeignSponsorship Payload
	List                  Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessSponsorship) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessSponsorship) Valid() (bool, error) {
	b, err := entity.HasForeignSponsorship.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessSponsorship) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessSponsorship) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessSponsorship) Get() error {
	return nil
}

type ForeignBusinessVentures struct {
	HasForeignVentures Payload
	List               Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessVentures) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessVentures) Valid() (bool, error) {
	b, err := entity.HasForeignVentures.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessVentures) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVentures) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVentures) Get() error {
	return nil
}

type ForeignBusinessVoting struct {
	HasForeignVoting Payload
	List             Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessVoting) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessVoting) Valid() (bool, error) {
	b, err := entity.HasForeignVoting.Entity()
	if err != nil {
		return false, err
	}

	if b.(*Branch).Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessVoting) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVoting) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVoting) Get() error {
	return nil
}
