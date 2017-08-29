package form

import (
	"encoding/json"
	"errors"
	"regexp"

	"github.com/go-pg/pg"
)

var (
	formatPassportBook = regexp.MustCompile(`^[a-zA-Z]{1}[0-9]{6,9}$`)
	formatPassportCard = regexp.MustCompile(`^[cC]{1}[0-9]{8}$`)
)

type ForeignPassport struct {
	ID           int
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
func (entity *ForeignPassport) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignPassport) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignPassport) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignContacts) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignContacts) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignContacts) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignTravel) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignTravel) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignTravel) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignActivitiesBenefits) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesBenefits) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesBenefits) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignActivitiesDirect) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesDirect) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesDirect) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignActivitiesIndirect) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesIndirect) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesIndirect) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignActivitiesRealEstate) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesRealEstate) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesRealEstate) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignActivitiesSupport) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesSupport) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesSupport) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessAdvice) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessAdvice) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessAdvice) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessConferences) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessConferences) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessConferences) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessContact) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessContact) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessContact) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessEmployment) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessEmployment) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessEmployment) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessFamily) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessFamily) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessFamily) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessPolitical) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessPolitical) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessPolitical) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessSponsorship) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessSponsorship) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessSponsorship) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessVentures) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVentures) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVentures) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
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
func (entity *ForeignBusinessVoting) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVoting) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVoting) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
