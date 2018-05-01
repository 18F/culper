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

// Save will create or update the database.
func (entity *ForeignPassport) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasPassportsID, err := entity.HasPassports.Save(context, account)
	if err != nil {
		return hasPassportsID, err
	}
	entity.HasPassportsID = hasPassportsID

	nameID, err := entity.Name.Save(context, account)
	if err != nil {
		return nameID, err
	}
	entity.NameID = nameID

	cardID, err := entity.Card.Save(context, account)
	if err != nil {
		return cardID, err
	}
	entity.CardID = cardID

	numberID, err := entity.Number.Save(context, account)
	if err != nil {
		return numberID, err
	}
	entity.NumberID = numberID

	issuedID, err := entity.Issued.Save(context, account)
	if err != nil {
		return issuedID, err
	}
	entity.IssuedID = issuedID

	expirationID, err := entity.Expiration.Save(context, account)
	if err != nil {
		return expirationID, err
	}
	entity.ExpirationID = expirationID

	commentsID, err := entity.Comments.Save(context, account)
	if err != nil {
		return commentsID, err
	}
	entity.CommentsID = commentsID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignPassport) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasPassports.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Name.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Card.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Number.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Issued.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Expiration.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignPassport) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasPassportsID != 0 {
		entity.HasPassports = &Branch{ID: entity.HasPassportsID}
		if _, err := entity.HasPassports.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.NameID != 0 {
		entity.Name = &Name{ID: entity.NameID}
		if _, err := entity.Name.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CardID != 0 {
		entity.Card = &Radio{ID: entity.CardID}
		if _, err := entity.Card.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.NumberID != 0 {
		entity.Number = &Text{ID: entity.NumberID}
		if _, err := entity.Number.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.IssuedID != 0 {
		entity.Issued = &DateControl{ID: entity.IssuedID}
		if _, err := entity.Issued.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExpirationID != 0 {
		entity.Expiration = &DateControl{ID: entity.ExpirationID}
		if _, err := entity.Expiration.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		entity.Comments = &Textarea{ID: entity.CommentsID}
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *ForeignPassport) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignPassport) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignPassport) Find(context DatabaseService) error {
	context.Find(&ForeignPassport{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignPassport)
		if entity.HasPassports == nil {
			entity.HasPassports = &Branch{}
		}
		entity.HasPassportsID = previous.HasPassportsID
		entity.HasPassports.ID = previous.HasPassportsID
		if entity.Name == nil {
			entity.Name = &Name{}
		}
		entity.NameID = previous.NameID
		entity.Name.ID = previous.NameID
		if entity.Card == nil {
			entity.Card = &Radio{}
		}
		entity.CardID = previous.CardID
		entity.Card.ID = previous.CardID
		if entity.Number == nil {
			entity.Number = &Text{}
		}
		entity.NumberID = previous.NumberID
		entity.Number.ID = previous.NumberID
		if entity.Issued == nil {
			entity.Issued = &DateControl{}
		}
		entity.IssuedID = previous.IssuedID
		entity.Issued.ID = previous.IssuedID
		if entity.Expiration == nil {
			entity.Expiration = &DateControl{}
		}
		entity.ExpirationID = previous.ExpirationID
		entity.Expiration.ID = previous.ExpirationID
		if entity.Comments == nil {
			entity.Comments = &Textarea{}
		}
		entity.CommentsID = previous.CommentsID
		entity.Comments.ID = previous.CommentsID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignContacts) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignContactsID, err := entity.HasForeignContacts.Save(context, account)
	if err != nil {
		return hasForeignContactsID, err
	}
	entity.HasForeignContactsID = hasForeignContactsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignContacts) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignContacts.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignContacts) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignContactsID != 0 {
		entity.HasForeignContacts = &Branch{ID: entity.HasForeignContactsID}
		if _, err := entity.HasForeignContacts.Get(context, account); err != nil {
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
func (entity *ForeignContacts) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignContacts) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignContacts) Find(context DatabaseService) error {
	context.Find(&ForeignContacts{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignContacts)
		if entity.HasForeignContacts == nil {
			entity.HasForeignContacts = &Branch{}
		}
		entity.HasForeignContactsID = previous.HasForeignContactsID
		entity.HasForeignContacts.ID = previous.HasForeignContactsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignTravel) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignTravelOutsideID, err := entity.HasForeignTravelOutside.Save(context, account)
	if err != nil {
		return hasForeignTravelOutsideID, err
	}
	entity.HasForeignTravelOutsideID = hasForeignTravelOutsideID

	hasForeignTravelOfficialID, err := entity.HasForeignTravelOfficial.Save(context, account)
	if err != nil {
		return hasForeignTravelOfficialID, err
	}
	entity.HasForeignTravelOfficialID = hasForeignTravelOfficialID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignTravel) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignTravelOutside.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.HasForeignTravelOfficial.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignTravel) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignTravelOutsideID != 0 {
		entity.HasForeignTravelOutside = &Branch{ID: entity.HasForeignTravelOutsideID}
		if _, err := entity.HasForeignTravelOutside.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignTravelOfficialID != 0 {
		entity.HasForeignTravelOfficial = &Branch{ID: entity.HasForeignTravelOfficialID}
		if _, err := entity.HasForeignTravelOfficial.Get(context, account); err != nil {
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
func (entity *ForeignTravel) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignTravel) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignTravel) Find(context DatabaseService) error {
	context.Find(&ForeignTravel{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignTravel)
		if entity.HasForeignTravelOutside == nil {
			entity.HasForeignTravelOutside = &Branch{}
		}
		entity.HasForeignTravelOutsideID = previous.HasForeignTravelOutsideID
		entity.HasForeignTravelOutside.ID = previous.HasForeignTravelOutsideID
		if entity.HasForeignTravelOfficial == nil {
			entity.HasForeignTravelOfficial = &Branch{}
		}
		entity.HasForeignTravelOfficialID = previous.HasForeignTravelOfficialID
		entity.HasForeignTravelOfficial.ID = previous.HasForeignTravelOfficialID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignActivitiesBenefits) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasBenefitsID, err := entity.HasBenefits.Save(context, account)
	if err != nil {
		return hasBenefitsID, err
	}
	entity.HasBenefitsID = hasBenefitsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesBenefits) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasBenefits.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesBenefits) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasBenefitsID != 0 {
		entity.HasBenefits = &Branch{ID: entity.HasBenefitsID}
		if _, err := entity.HasBenefits.Get(context, account); err != nil {
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
func (entity *ForeignActivitiesBenefits) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignActivitiesBenefits) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignActivitiesBenefits) Find(context DatabaseService) error {
	context.Find(&ForeignActivitiesBenefits{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignActivitiesBenefits)
		if entity.HasBenefits == nil {
			entity.HasBenefits = &Branch{}
		}
		entity.HasBenefitsID = previous.HasBenefitsID
		entity.HasBenefits.ID = previous.HasBenefitsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignActivitiesDirect) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasInterestsID, err := entity.HasInterests.Save(context, account)
	if err != nil {
		return hasInterestsID, err
	}
	entity.HasInterestsID = hasInterestsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesDirect) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasInterests.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesDirect) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasInterestsID != 0 {
		entity.HasInterests = &Branch{ID: entity.HasInterestsID}
		if _, err := entity.HasInterests.Get(context, account); err != nil {
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
func (entity *ForeignActivitiesDirect) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignActivitiesDirect) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignActivitiesDirect) Find(context DatabaseService) error {
	context.Find(&ForeignActivitiesDirect{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignActivitiesDirect)
		if entity.HasInterests == nil {
			entity.HasInterests = &Branch{}
		}
		entity.HasInterestsID = previous.HasInterestsID
		entity.HasInterests.ID = previous.HasInterestsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignActivitiesIndirect) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasInterestsID, err := entity.HasInterests.Save(context, account)
	if err != nil {
		return hasInterestsID, err
	}
	entity.HasInterestsID = hasInterestsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesIndirect) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasInterests.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesIndirect) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasInterestsID != 0 {
		entity.HasInterests = &Branch{ID: entity.HasInterestsID}
		if _, err := entity.HasInterests.Get(context, account); err != nil {
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
func (entity *ForeignActivitiesIndirect) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignActivitiesIndirect) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignActivitiesIndirect) Find(context DatabaseService) error {
	context.Find(&ForeignActivitiesIndirect{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignActivitiesIndirect)
		if entity.HasInterests == nil {
			entity.HasInterests = &Branch{}
		}
		entity.HasInterestsID = previous.HasInterestsID
		entity.HasInterests.ID = previous.HasInterestsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignActivitiesRealEstate) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasInterestsID, err := entity.HasInterests.Save(context, account)
	if err != nil {
		return hasInterestsID, err
	}
	entity.HasInterestsID = hasInterestsID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesRealEstate) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasInterests.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesRealEstate) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasInterestsID != 0 {
		entity.HasInterests = &Branch{ID: entity.HasInterestsID}
		if _, err := entity.HasInterests.Get(context, account); err != nil {
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
func (entity *ForeignActivitiesRealEstate) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignActivitiesRealEstate) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignActivitiesRealEstate) Find(context DatabaseService) error {
	context.Find(&ForeignActivitiesRealEstate{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignActivitiesRealEstate)
		if entity.HasInterests == nil {
			entity.HasInterests = &Branch{}
		}
		entity.HasInterestsID = previous.HasInterestsID
		entity.HasInterests.ID = previous.HasInterestsID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignActivitiesSupport) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignSupportID, err := entity.HasForeignSupport.Save(context, account)
	if err != nil {
		return hasForeignSupportID, err
	}
	entity.HasForeignSupportID = hasForeignSupportID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesSupport) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignSupport.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesSupport) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignSupportID != 0 {
		entity.HasForeignSupport = &Branch{ID: entity.HasForeignSupportID}
		if _, err := entity.HasForeignSupport.Get(context, account); err != nil {
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
func (entity *ForeignActivitiesSupport) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignActivitiesSupport) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignActivitiesSupport) Find(context DatabaseService) error {
	context.Find(&ForeignActivitiesSupport{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignActivitiesSupport)
		if entity.HasForeignSupport == nil {
			entity.HasForeignSupport = &Branch{}
		}
		entity.HasForeignSupportID = previous.HasForeignSupportID
		entity.HasForeignSupport.ID = previous.HasForeignSupportID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessAdvice) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignAdviceID, err := entity.HasForeignAdvice.Save(context, account)
	if err != nil {
		return hasForeignAdviceID, err
	}
	entity.HasForeignAdviceID = hasForeignAdviceID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessAdvice) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignAdvice.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessAdvice) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignAdviceID != 0 {
		entity.HasForeignAdvice = &Branch{ID: entity.HasForeignAdviceID}
		if _, err := entity.HasForeignAdvice.Get(context, account); err != nil {
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
func (entity *ForeignBusinessAdvice) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessAdvice) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessAdvice) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessAdvice{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessAdvice)
		if entity.HasForeignAdvice == nil {
			entity.HasForeignAdvice = &Branch{}
		}
		entity.HasForeignAdviceID = previous.HasForeignAdviceID
		entity.HasForeignAdvice.ID = previous.HasForeignAdviceID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessConferences) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignConferencesID, err := entity.HasForeignConferences.Save(context, account)
	if err != nil {
		return hasForeignConferencesID, err
	}
	entity.HasForeignConferencesID = hasForeignConferencesID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessConferences) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignConferences.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessConferences) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignConferencesID != 0 {
		entity.HasForeignConferences = &Branch{ID: entity.HasForeignConferencesID}
		if _, err := entity.HasForeignConferences.Get(context, account); err != nil {
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
func (entity *ForeignBusinessConferences) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessConferences) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessConferences) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessConferences{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessConferences)
		if entity.HasForeignConferences == nil {
			entity.HasForeignConferences = &Branch{}
		}
		entity.HasForeignConferencesID = previous.HasForeignConferencesID
		entity.HasForeignConferences.ID = previous.HasForeignConferencesID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessContact) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignContactID, err := entity.HasForeignContact.Save(context, account)
	if err != nil {
		return hasForeignContactID, err
	}
	entity.HasForeignContactID = hasForeignContactID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessContact) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignContact.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessContact) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignContactID != 0 {
		entity.HasForeignContact = &Branch{ID: entity.HasForeignContactID}
		if _, err := entity.HasForeignContact.Get(context, account); err != nil {
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
func (entity *ForeignBusinessContact) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessContact) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessContact) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessContact{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessContact)
		if entity.HasForeignContact == nil {
			entity.HasForeignContact = &Branch{}
		}
		entity.HasForeignContactID = previous.HasForeignContactID
		entity.HasForeignContact.ID = previous.HasForeignContactID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessEmployment) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignEmploymentID, err := entity.HasForeignEmployment.Save(context, account)
	if err != nil {
		return hasForeignEmploymentID, err
	}
	entity.HasForeignEmploymentID = hasForeignEmploymentID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessEmployment) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignEmployment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessEmployment) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignEmploymentID != 0 {
		entity.HasForeignEmployment = &Branch{ID: entity.HasForeignEmploymentID}
		if _, err := entity.HasForeignEmployment.Get(context, account); err != nil {
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
func (entity *ForeignBusinessEmployment) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessEmployment) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessEmployment) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessEmployment{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessEmployment)
		if entity.HasForeignEmployment == nil {
			entity.HasForeignEmployment = &Branch{}
		}
		entity.HasForeignEmploymentID = previous.HasForeignEmploymentID
		entity.HasForeignEmployment.ID = previous.HasForeignEmploymentID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessFamily) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignFamilyID, err := entity.HasForeignFamily.Save(context, account)
	if err != nil {
		return hasForeignFamilyID, err
	}
	entity.HasForeignFamilyID = hasForeignFamilyID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessFamily) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignFamily.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessFamily) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignFamilyID != 0 {
		entity.HasForeignFamily = &Branch{ID: entity.HasForeignFamilyID}
		if _, err := entity.HasForeignFamily.Get(context, account); err != nil {
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
func (entity *ForeignBusinessFamily) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessFamily) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessFamily) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessFamily{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessFamily)
		if entity.HasForeignFamily == nil {
			entity.HasForeignFamily = &Branch{}
		}
		entity.HasForeignFamilyID = previous.HasForeignFamilyID
		entity.HasForeignFamily.ID = previous.HasForeignFamilyID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessPolitical) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignPoliticalID, err := entity.HasForeignPolitical.Save(context, account)
	if err != nil {
		return hasForeignPoliticalID, err
	}
	entity.HasForeignPoliticalID = hasForeignPoliticalID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessPolitical) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignPolitical.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessPolitical) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignPoliticalID != 0 {
		entity.HasForeignPolitical = &Branch{ID: entity.HasForeignPoliticalID}
		if _, err := entity.HasForeignPolitical.Get(context, account); err != nil {
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
func (entity *ForeignBusinessPolitical) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessPolitical) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessPolitical) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessPolitical{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessPolitical)
		if entity.HasForeignPolitical == nil {
			entity.HasForeignPolitical = &Branch{}
		}
		entity.HasForeignPoliticalID = previous.HasForeignPoliticalID
		entity.HasForeignPolitical.ID = previous.HasForeignPoliticalID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessSponsorship) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignSponsorshipID, err := entity.HasForeignSponsorship.Save(context, account)
	if err != nil {
		return hasForeignSponsorshipID, err
	}
	entity.HasForeignSponsorshipID = hasForeignSponsorshipID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessSponsorship) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignSponsorship.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessSponsorship) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignSponsorshipID != 0 {
		entity.HasForeignSponsorship = &Branch{ID: entity.HasForeignSponsorshipID}
		if _, err := entity.HasForeignSponsorship.Get(context, account); err != nil {
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
func (entity *ForeignBusinessSponsorship) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessSponsorship) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessSponsorship) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessSponsorship{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessSponsorship)
		if entity.HasForeignSponsorship == nil {
			entity.HasForeignSponsorship = &Branch{}
		}
		entity.HasForeignSponsorshipID = previous.HasForeignSponsorshipID
		entity.HasForeignSponsorship.ID = previous.HasForeignSponsorshipID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessVentures) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignVenturesID, err := entity.HasForeignVentures.Save(context, account)
	if err != nil {
		return hasForeignVenturesID, err
	}
	entity.HasForeignVenturesID = hasForeignVenturesID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVentures) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignVentures.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVentures) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignVenturesID != 0 {
		entity.HasForeignVentures = &Branch{ID: entity.HasForeignVenturesID}
		if _, err := entity.HasForeignVentures.Get(context, account); err != nil {
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
func (entity *ForeignBusinessVentures) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessVentures) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessVentures) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessVentures{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessVentures)
		if entity.HasForeignVentures == nil {
			entity.HasForeignVentures = &Branch{}
		}
		entity.HasForeignVenturesID = previous.HasForeignVenturesID
		entity.HasForeignVentures.ID = previous.HasForeignVenturesID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
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

// Save will create or update the database.
func (entity *ForeignBusinessVoting) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	hasForeignVotingID, err := entity.HasForeignVoting.Save(context, account)
	if err != nil {
		return hasForeignVotingID, err
	}
	entity.HasForeignVotingID = hasForeignVotingID

	listID, err := entity.List.Save(context, account)
	if err != nil {
		return listID, err
	}
	entity.ListID = listID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVoting) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.HasForeignVoting.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVoting) Get(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignVotingID != 0 {
		entity.HasForeignVoting = &Branch{ID: entity.HasForeignVotingID}
		if _, err := entity.HasForeignVoting.Get(context, account); err != nil {
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
func (entity *ForeignBusinessVoting) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignBusinessVoting) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignBusinessVoting) Find(context DatabaseService) error {
	context.Find(&ForeignBusinessVoting{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignBusinessVoting)
		if entity.HasForeignVoting == nil {
			entity.HasForeignVoting = &Branch{}
		}
		entity.HasForeignVotingID = previous.HasForeignVotingID
		entity.HasForeignVoting.ID = previous.HasForeignVotingID
		if entity.List == nil {
			entity.List = &Collection{}
		}
		entity.ListID = previous.ListID
		entity.List.ID = previous.ListID
	})
	return nil
}

// ForeignComments represents the payload for the foreign comments section.
type ForeignComments struct {
	PayloadComments Payload `json:"Comments" sql:"-"`

	// Validator specific fields
	Comments *Text `json:"-"`

	// Persister specific fields
	ID         int `json:"-"`
	CommentsID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ForeignComments) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Text)

	return err
}

// Marshal to payload structure
func (entity *ForeignComments) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("foreign.comments", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignComments) Valid() (bool, error) {
	return entity.Comments.Valid()
}

// Save will create or update the database.
func (entity *ForeignComments) Save(context DatabaseService, account int) (int, error) {
	entity.ID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	commentsID, err := entity.Comments.Save(context, account)
	if err != nil {
		return commentsID, err
	}
	entity.CommentsID = commentsID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete will remove the entity from the database.
func (entity *ForeignComments) Delete(context DatabaseService, account int) (int, error) {
	entity.ID = account

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

	if _, err := entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get will retrieve the entity from the database.
func (entity *ForeignComments) Get(context DatabaseService, account int) (int, error) {
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
		entity.Comments = &Text{ID: entity.CommentsID}
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *ForeignComments) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ForeignComments) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *ForeignComments) Find(context DatabaseService) error {
	context.Find(&ForeignComments{ID: entity.ID}, func(result interface{}) {
		previous := result.(*ForeignComments)
		if entity.Comments == nil {
			entity.Comments = &Text{}
		}
		entity.CommentsID = previous.CommentsID
		entity.Comments.ID = previous.CommentsID
	})
	return nil
}
