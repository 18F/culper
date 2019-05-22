package api

import (
	"encoding/json"
	"errors"
	"regexp"
)

var (
	formatPassportBook = regexp.MustCompile(`^[a-zA-Z]{1}[0-9]{6,9}$`)
	formatPassportCard = regexp.MustCompile(`^[cC]{1}[0-9]{8}$`)
)

// ForeignPassport represents the payload for the foreign passport section.
type ForeignPassport struct {
	PayloadHasPassports Payload `json:"HasPassports" sql:"-"`
	PayloadName         Payload `json:"Name" sql:"-"`
	PayloadCard         Payload `json:"Card" sql:"-"`
	PayloadNumber       Payload `json:"Number" sql:"-"`
	PayloadIssued       Payload `json:"Issued" sql:"-"`
	PayloadExpiration   Payload `json:"Expiration" sql:"-"`
	PayloadComments     Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	HasPassports *Branch      `json:"-"`
	Name         *Name        `json:"-"`
	Card         *Radio       `json:"-"`
	Number       *Text        `json:"-"`
	Issued       *DateControl `json:"-"`
	Expiration   *DateControl `json:"-"`
	Comments     *Textarea    `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasPassportsID int `json:"-" pg:",fk:HasPassports"`
	NameID         int `json:"-" pg:",fk:Name"`
	CardID         int `json:"-" pg:",fk:Card"`
	NumberID       int `json:"-" pg:",fk:Number"`
	IssuedID       int `json:"-" pg:",fk:Issued"`
	ExpirationID   int `json:"-" pg:",fk:Expiration"`
	CommentsID     int `json:"-" pg:",fk:Comments"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignPassport) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasPassports, err := entity.PayloadHasPassports.Entity()
	if err != nil {
		return err
	}
	entity.HasPassports = hasPassports.(*Branch)

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Name)

	card, err := entity.PayloadCard.Entity()
	if err != nil {
		return err
	}
	entity.Card = card.(*Radio)

	number, err := entity.PayloadNumber.Entity()
	if err != nil {
		return err
	}
	entity.Number = number.(*Text)

	issued, err := entity.PayloadIssued.Entity()
	if err != nil {
		return err
	}
	entity.Issued = issued.(*DateControl)

	expiration, err := entity.PayloadExpiration.Entity()
	if err != nil {
		return err
	}
	entity.Expiration = expiration.(*DateControl)

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *ForeignPassport) Marshal() Payload {
	if entity.HasPassports != nil {
		entity.PayloadHasPassports = entity.HasPassports.Marshal()
	}
	if entity.Name != nil {
		entity.PayloadName = entity.Name.Marshal()
	}
	if entity.Card != nil {
		entity.PayloadCard = entity.Card.Marshal()
	}
	if entity.Number != nil {
		entity.PayloadNumber = entity.Number.Marshal()
	}
	if entity.Issued != nil {
		entity.PayloadIssued = entity.Issued.Marshal()
	}
	if entity.Expiration != nil {
		entity.PayloadExpiration = entity.Expiration.Marshal()
	}
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("foreign.passport", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignPassport) Valid() (bool, error) {
	if entity.HasPassports.Value == "No" {
		return true, nil
	}

	if ok, err := entity.Name.Valid(); !ok {
		return false, err
	}

	if entity.Card.Value == "Book" {
		if ok := formatPassportBook.MatchString(entity.Number.Value); !ok {
			return false, errors.New("Invalid format for passport book")
		}
	} else if entity.Card.Value == "Card" {
		if ok := formatPassportCard.MatchString(entity.Number.Value); !ok {
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

// ForeignContacts represents the payload for the foreign contacts section.
type ForeignContacts struct {
	PayloadHasForeignContacts Payload `json:"HasForeignContacts" sql:"-"`
	PayloadList               Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignContacts *Branch     `json:"-"`
	List               *Collection `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	HasForeignContactsID int `json:"-" pg:", fk:HasForeignContacts"`
	ListID               int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignContacts) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignContacts, err := entity.PayloadHasForeignContacts.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignContacts = hasForeignContacts.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignContacts) Marshal() Payload {
	if entity.HasForeignContacts != nil {
		entity.PayloadHasForeignContacts = entity.HasForeignContacts.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.contacts", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignContacts) Valid() (bool, error) {
	if entity.HasForeignContacts.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignTravel represents the payload for the foreign travel section.
type ForeignTravel struct {
	PayloadHasForeignTravelOutside  Payload `json:"HasForeignTravelOutside" sql:"-"`
	PayloadHasForeignTravelOfficial Payload `json:"HasForeignTravelOfficial" sql:"-"`
	PayloadList                     Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignTravelOutside  *Branch     `json:"-"`
	HasForeignTravelOfficial *Branch     `json:"-"`
	List                     *Collection `json:"-"`

	// Persister specific fields
	ID                         int `json:"-"`
	HasForeignTravelOutsideID  int `json:"-" pg:", fk:HasForeignTravelOutside"`
	HasForeignTravelOfficialID int `json:"-" pg:", fk:HasForeignTravelOfficial"`
	ListID                     int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignTravel) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignTravelOutside, err := entity.PayloadHasForeignTravelOutside.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignTravelOutside = hasForeignTravelOutside.(*Branch)

	hasForeignTravelOfficial, err := entity.PayloadHasForeignTravelOfficial.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignTravelOfficial = hasForeignTravelOfficial.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignTravel) Marshal() Payload {
	if entity.HasForeignTravelOutside != nil {
		entity.PayloadHasForeignTravelOutside = entity.HasForeignTravelOutside.Marshal()
	}
	if entity.HasForeignTravelOfficial != nil {
		entity.PayloadHasForeignTravelOfficial = entity.HasForeignTravelOfficial.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.travel", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignTravel) Valid() (bool, error) {
	if entity.HasForeignTravelOutside.Value == "No" {
		return true, nil
	}

	if entity.HasForeignTravelOfficial.Value == "Yes" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignActivitiesBenefits represents the payload for the foreign activities benefits section.
type ForeignActivitiesBenefits struct {
	PayloadHasBenefits Payload `json:"HasBenefits" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBenefits *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int `json:"-"`
	HasBenefitsID int `json:"-" pg:", fk:HasBenefits"`
	ListID        int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesBenefits) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasBenefits, err := entity.PayloadHasBenefits.Entity()
	if err != nil {
		return err
	}
	entity.HasBenefits = hasBenefits.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignActivitiesBenefits) Marshal() Payload {
	if entity.HasBenefits != nil {
		entity.PayloadHasBenefits = entity.HasBenefits.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.activities.benefits", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesBenefits) Valid() (bool, error) {
	if entity.HasBenefits.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignActivitiesDirect represents the payload for the foreign activities direct section.
type ForeignActivitiesDirect struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasInterestsID int `json:"-" pg:", fk:HasInterests"`
	ListID         int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesDirect) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasInterests, err := entity.PayloadHasInterests.Entity()
	if err != nil {
		return err
	}
	entity.HasInterests = hasInterests.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignActivitiesDirect) Marshal() Payload {
	if entity.HasInterests != nil {
		entity.PayloadHasInterests = entity.HasInterests.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.activities.direct", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesDirect) Valid() (bool, error) {
	if entity.HasInterests.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignActivitiesIndirect represents the payload for the foreign activities indirect section.
type ForeignActivitiesIndirect struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasInterestsID int `json:"-" pg:", fk:HasInterests"`
	ListID         int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesIndirect) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasInterests, err := entity.PayloadHasInterests.Entity()
	if err != nil {
		return err
	}
	entity.HasInterests = hasInterests.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignActivitiesIndirect) Marshal() Payload {
	if entity.HasInterests != nil {
		entity.PayloadHasInterests = entity.HasInterests.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.activities.indirect", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesIndirect) Valid() (bool, error) {
	if entity.HasInterests.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignActivitiesRealEstate represents the payload for the foreign activities real estate section.
type ForeignActivitiesRealEstate struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int `json:"-"`
	HasInterestsID int `json:"-" pg:", fk:HasInterests"`
	ListID         int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesRealEstate) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasInterests, err := entity.PayloadHasInterests.Entity()
	if err != nil {
		return err
	}
	entity.HasInterests = hasInterests.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignActivitiesRealEstate) Marshal() Payload {
	if entity.HasInterests != nil {
		entity.PayloadHasInterests = entity.HasInterests.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.activities.realestate", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesRealEstate) Valid() (bool, error) {
	if entity.HasInterests.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignActivitiesSupport represents the payload for the foreign activities support section.
type ForeignActivitiesSupport struct {
	PayloadHasForeignSupport Payload `json:"HasForeignSupport" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignSupport *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	HasForeignSupportID int `json:"-" pg:", fk:HasForeignSupport"`
	ListID              int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignActivitiesSupport) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignSupport, err := entity.PayloadHasForeignSupport.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignSupport = hasForeignSupport.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignActivitiesSupport) Marshal() Payload {
	if entity.HasForeignSupport != nil {
		entity.PayloadHasForeignSupport = entity.HasForeignSupport.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.activities.support", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesSupport) Valid() (bool, error) {
	if entity.HasForeignSupport.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessAdvice represents the payload for the foreign business advice section.
type ForeignBusinessAdvice struct {
	PayloadHasForeignAdvice Payload `json:"HasForeignAdvice" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignAdvice *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasForeignAdviceID int `json:"-" pg:", fk:HasForeignAdvice"`
	ListID             int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessAdvice) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignAdvice, err := entity.PayloadHasForeignAdvice.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignAdvice = hasForeignAdvice.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessAdvice) Marshal() Payload {
	if entity.HasForeignAdvice != nil {
		entity.PayloadHasForeignAdvice = entity.HasForeignAdvice.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.advice", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessAdvice) Valid() (bool, error) {
	if entity.HasForeignAdvice.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessConferences represents the payload for the foreign business conferences section.
type ForeignBusinessConferences struct {
	PayloadHasForeignConferences Payload `json:"HasForeignConferences" sql:"-"`
	PayloadList                  Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignConferences *Branch     `json:"-"`
	List                  *Collection `json:"-"`

	// Persister specific fields
	ID                      int `json:"-"`
	HasForeignConferencesID int `json:"-" pg:", fk:HasForeignConferences"`
	ListID                  int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessConferences) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignConferences, err := entity.PayloadHasForeignConferences.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignConferences = hasForeignConferences.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessConferences) Marshal() Payload {
	if entity.HasForeignConferences != nil {
		entity.PayloadHasForeignConferences = entity.HasForeignConferences.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.conferences", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessConferences) Valid() (bool, error) {
	if entity.HasForeignConferences.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessContact represents the payload for the foreign business contact section.
type ForeignBusinessContact struct {
	PayloadHasForeignContact Payload `json:"HasForeignContact" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignContact *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	HasForeignContactID int `json:"-" pg:", fk:HasForeignContact"`
	ListID              int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessContact) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignContact, err := entity.PayloadHasForeignContact.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignContact = hasForeignContact.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessContact) Marshal() Payload {
	if entity.HasForeignContact != nil {
		entity.PayloadHasForeignContact = entity.HasForeignContact.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.contact", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessContact) Valid() (bool, error) {
	if entity.HasForeignContact.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessEmployment represents the payload for the foreign business employment section.
type ForeignBusinessEmployment struct {
	PayloadHasForeignEmployment Payload `json:"HasForeignEmployment" sql:"-"`
	PayloadList                 Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignEmployment *Branch     `json:"-"`
	List                 *Collection `json:"-"`

	// Persister specific fields
	ID                     int `json:"-"`
	HasForeignEmploymentID int `json:"-" pg:", fk:HasForeignEmployment"`
	ListID                 int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessEmployment) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignEmployment, err := entity.PayloadHasForeignEmployment.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignEmployment = hasForeignEmployment.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessEmployment) Marshal() Payload {
	if entity.HasForeignEmployment != nil {
		entity.PayloadHasForeignEmployment = entity.HasForeignEmployment.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.employment", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessEmployment) Valid() (bool, error) {
	if entity.HasForeignEmployment.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessFamily represents the payload for the foreign business family section.
type ForeignBusinessFamily struct {
	PayloadHasForeignFamily Payload `json:"HasForeignFamily" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignFamily *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasForeignFamilyID int `json:"-" pg:", fk:HasForeignFamily"`
	ListID             int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessFamily) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignFamily, err := entity.PayloadHasForeignFamily.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignFamily = hasForeignFamily.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessFamily) Marshal() Payload {
	if entity.HasForeignFamily != nil {
		entity.PayloadHasForeignFamily = entity.HasForeignFamily.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.family", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessFamily) Valid() (bool, error) {
	if entity.HasForeignFamily.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessPolitical represents the payload for the foreign business political section.
type ForeignBusinessPolitical struct {
	PayloadHasForeignPolitical Payload `json:"HasForeignPolitical" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignPolitical *Branch     `json:"-"`
	List                *Collection `json:"-"`

	// Persister specific fields
	ID                    int `json:"-"`
	HasForeignPoliticalID int `json:"-" pg:", fk:HasForeignPolitical"`
	ListID                int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessPolitical) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignPolitical, err := entity.PayloadHasForeignPolitical.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignPolitical = hasForeignPolitical.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessPolitical) Marshal() Payload {
	if entity.HasForeignPolitical != nil {
		entity.PayloadHasForeignPolitical = entity.HasForeignPolitical.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.political", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessPolitical) Valid() (bool, error) {
	if entity.HasForeignPolitical.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessSponsorship represents the payload for the foreign business sponsorship section.
type ForeignBusinessSponsorship struct {
	PayloadHasForeignSponsorship Payload `json:"HasForeignSponsorship" sql:"-"`
	PayloadList                  Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignSponsorship *Branch     `json:"-"`
	List                  *Collection `json:"-"`

	// Persister specific fields
	ID                      int `json:"-"`
	HasForeignSponsorshipID int `json:"-" pg:", fk:HasForeignSponsorship"`
	ListID                  int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessSponsorship) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignSponsorship, err := entity.PayloadHasForeignSponsorship.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignSponsorship = hasForeignSponsorship.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessSponsorship) Marshal() Payload {
	if entity.HasForeignSponsorship != nil {
		entity.PayloadHasForeignSponsorship = entity.HasForeignSponsorship.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.sponsorship", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessSponsorship) Valid() (bool, error) {
	if entity.HasForeignSponsorship.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessVentures represents the payload for the foreign business ventures section.
type ForeignBusinessVentures struct {
	PayloadHasForeignVentures Payload `json:"HasForeignVentures" sql:"-"`
	PayloadList               Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignVentures *Branch     `json:"-"`
	List               *Collection `json:"-"`

	// Persister specific fields
	ID                   int `json:"-"`
	HasForeignVenturesID int `json:"-" pg:", fk:HasForeignVentures"`
	ListID               int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessVentures) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignVentures, err := entity.PayloadHasForeignVentures.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignVentures = hasForeignVentures.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessVentures) Marshal() Payload {
	if entity.HasForeignVentures != nil {
		entity.PayloadHasForeignVentures = entity.HasForeignVentures.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.ventures", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessVentures) Valid() (bool, error) {
	if entity.HasForeignVentures.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// ForeignBusinessVoting represents the payload for the foreign business voting section.
type ForeignBusinessVoting struct {
	PayloadHasForeignVoting Payload `json:"HasForeignVoting" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignVoting *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int `json:"-"`
	HasForeignVotingID int `json:"-" pg:", fk:HasForeignVoting"`
	ListID             int `json:"-" pg:", fk:List"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignBusinessVoting) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasForeignVoting, err := entity.PayloadHasForeignVoting.Entity()
	if err != nil {
		return err
	}
	entity.HasForeignVoting = hasForeignVoting.(*Branch)

	list, err := entity.PayloadList.Entity()
	if err != nil {
		return err
	}
	entity.List = list.(*Collection)

	return err
}

// Marshal to payload structure
func (entity *ForeignBusinessVoting) Marshal() Payload {
	if entity.HasForeignVoting != nil {
		entity.PayloadHasForeignVoting = entity.HasForeignVoting.Marshal()
	}
	if entity.List != nil {
		entity.PayloadList = entity.List.Marshal()
	}
	return MarshalPayloadEntity("foreign.business.voting", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessVoting) Valid() (bool, error) {
	if entity.HasForeignVoting.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}
