package form

import (
	"encoding/json"
	"errors"
	"regexp"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

var (
	formatPassportBook = regexp.MustCompile(`^[a-zA-Z]{1}[0-9]{6,9}$`)
	formatPassportCard = regexp.MustCompile(`^[cC]{1}[0-9]{8}$`)
)

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
	ID             int
	AccountID      int64
	HasPassportsID int
	NameID         int
	CardID         int
	NumberID       int
	IssuedID       int
	ExpirationID   int
	CommentsID     int
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
func (entity *ForeignPassport) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignPassport{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignPassport) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignPassport{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasPassports.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Name.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Card.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Number.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Issued.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Expiration.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignPassport) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignPassport{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasPassportsID != 0 {
		if _, err := entity.HasPassports.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.NameID != 0 {
		if _, err := entity.Name.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CardID != 0 {
		if _, err := entity.Card.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.NumberID != 0 {
		if _, err := entity.Number.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.IssuedID != 0 {
		if _, err := entity.Issued.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExpirationID != 0 {
		if _, err := entity.Expiration.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignContacts struct {
	PayloadHasForeignContacts Payload `json:"HasForeignContacts" sql:"-"`
	PayloadList               Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignContacts *Branch     `json:"-"`
	List               *Collection `json:"-"`

	// Persister specific fields
	ID                   int
	AccountID            int64
	HasForeignContactsID int
	ListID               int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignContacts) Valid() (bool, error) {
	if entity.HasForeignContacts.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignContacts) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignContacts{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignContacts) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignContacts{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignContacts.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignContacts) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignContacts{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignContactsID != 0 {
		if _, err := entity.HasForeignContacts.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignTravel struct {
	PayloadHasForeignTravelOutside  Payload `json:"HasForeignTravelOutside" sql:"-"`
	PayloadHasForeignTravelOfficial Payload `json:"HasForeignTravelOfficial" sql:"-"`
	PayloadList                     Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignTravelOutside  *Branch     `json:"-"`
	HasForeignTravelOfficial *Branch     `json:"-"`
	List                     *Collection `json:"-"`

	// Persister specific fields
	ID                         int
	AccountID                  int64
	HasForeignTravelOutsideID  int
	HasForeignTravelOfficialID int
	ListID                     int
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
func (entity *ForeignTravel) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignTravel{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignTravel) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignTravel{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignTravelOutside.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignTravelOfficial.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignTravel) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignTravel{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignTravelOutsideID != 0 {
		if _, err := entity.HasForeignTravelOutside.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.HasForeignTravelOfficialID != 0 {
		if _, err := entity.HasForeignTravelOfficial.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignActivitiesBenefits struct {
	PayloadHasBenefits Payload `json:"HasBenefits" sql:"-"`
	PayloadList        Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasBenefits *Branch     `json:"-"`
	List        *Collection `json:"-"`

	// Persister specific fields
	ID            int
	AccountID     int64
	HasBenefitsID int
	ListID        int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesBenefits) Valid() (bool, error) {
	if entity.HasBenefits.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesBenefits) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignActivitiesBenefits{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesBenefits) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesBenefits{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasBenefits.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesBenefits) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesBenefits{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasBenefitsID != 0 {
		if _, err := entity.HasBenefits.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignActivitiesDirect struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasInterestsID int
	ListID         int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesDirect) Valid() (bool, error) {
	if entity.HasInterests.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesDirect) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignActivitiesDirect{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesDirect) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesDirect{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasInterests.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesDirect) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesDirect{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasInterestsID != 0 {
		if _, err := entity.HasInterests.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignActivitiesIndirect struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasInterestsID int
	ListID         int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesIndirect) Valid() (bool, error) {
	if entity.HasInterests.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesIndirect) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignActivitiesIndirect{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesIndirect) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesIndirect{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasInterests.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesIndirect) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesIndirect{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasInterestsID != 0 {
		if _, err := entity.HasInterests.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignActivitiesRealEstate struct {
	PayloadHasInterests Payload `json:"HasInterests" sql:"-"`
	PayloadList         Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasInterests *Branch     `json:"-"`
	List         *Collection `json:"-"`

	// Persister specific fields
	ID             int
	AccountID      int64
	HasInterestsID int
	ListID         int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesRealEstate) Valid() (bool, error) {
	if entity.HasInterests.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesRealEstate) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignActivitiesRealEstate{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesRealEstate) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesRealEstate{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasInterests.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesRealEstate) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesRealEstate{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasInterestsID != 0 {
		if _, err := entity.HasInterests.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignActivitiesSupport struct {
	PayloadHasForeignSupport Payload `json:"HasForeignSupport" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignSupport *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int
	AccountID           int64
	HasForeignSupportID int
	ListID              int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignActivitiesSupport) Valid() (bool, error) {
	if entity.HasForeignSupport.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignActivitiesSupport) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignActivitiesSupport{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignActivitiesSupport) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesSupport{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignSupport.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignActivitiesSupport) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignActivitiesSupport{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignSupportID != 0 {
		if _, err := entity.HasForeignSupport.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessAdvice struct {
	PayloadHasForeignAdvice Payload `json:"HasForeignAdvice" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignAdvice *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int
	AccountID          int64
	HasForeignAdviceID int
	ListID             int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessAdvice) Valid() (bool, error) {
	if entity.HasForeignAdvice.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessAdvice) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessAdvice{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessAdvice) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessAdvice{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignAdvice.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessAdvice) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessAdvice{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignAdviceID != 0 {
		if _, err := entity.HasForeignAdvice.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessConferences struct {
	PayloadHasForeignConferences Payload `json:"HasForeignConferences" sql:"-"`
	PayloadList                  Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignConferences *Branch     `json:"-"`
	List                  *Collection `json:"-"`

	// Persister specific fields
	ID                      int
	AccountID               int64
	HasForeignConferencesID int
	ListID                  int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessConferences) Valid() (bool, error) {
	if entity.HasForeignConferences.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessConferences) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessConferences{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessConferences) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessConferences{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignConferences.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessConferences) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessConferences{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignConferencesID != 0 {
		if _, err := entity.HasForeignConferences.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessContact struct {
	PayloadHasForeignContact Payload `json:"HasForeignContact" sql:"-"`
	PayloadList              Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignContact *Branch     `json:"-"`
	List              *Collection `json:"-"`

	// Persister specific fields
	ID                  int
	AccountID           int64
	HasForeignContactID int
	ListID              int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessContact) Valid() (bool, error) {
	if entity.HasForeignContact.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessContact) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessContact{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessContact) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessContact{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignContact.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessContact) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessContact{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignContactID != 0 {
		if _, err := entity.HasForeignContact.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessEmployment struct {
	PayloadHasForeignEmployment Payload `json:"HasForeignEmployment" sql:"-"`
	PayloadList                 Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignEmployment *Branch     `json:"-"`
	List                 *Collection `json:"-"`

	// Persister specific fields
	ID                     int
	AccountID              int64
	HasForeignEmploymentID int
	ListID                 int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessEmployment) Valid() (bool, error) {
	if entity.HasForeignEmployment.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessEmployment) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessEmployment{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessEmployment) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessEmployment{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignEmployment.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessEmployment) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessEmployment{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignEmploymentID != 0 {
		if _, err := entity.HasForeignEmployment.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessFamily struct {
	PayloadHasForeignFamily Payload `json:"HasForeignFamily" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignFamily *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int
	AccountID          int64
	HasForeignFamilyID int
	ListID             int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessFamily) Valid() (bool, error) {
	if entity.HasForeignFamily.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessFamily) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessFamily{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessFamily) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessFamily{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignFamily.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessFamily) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessFamily{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignFamilyID != 0 {
		if _, err := entity.HasForeignFamily.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessPolitical struct {
	PayloadHasForeignPolitical Payload `json:"HasForeignPolitical" sql:"-"`
	PayloadList                Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignPolitical *Branch     `json:"-"`
	List                *Collection `json:"-"`

	// Persister specific fields
	ID                    int
	AccountID             int64
	HasForeignPoliticalID int
	ListID                int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessPolitical) Valid() (bool, error) {
	if entity.HasForeignPolitical.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessPolitical) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessPolitical{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessPolitical) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessPolitical{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignPolitical.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessPolitical) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessPolitical{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignPoliticalID != 0 {
		if _, err := entity.HasForeignPolitical.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessSponsorship struct {
	PayloadHasForeignSponsorship Payload `json:"HasForeignSponsorship" sql:"-"`
	PayloadList                  Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignSponsorship *Branch     `json:"-"`
	List                  *Collection `json:"-"`

	// Persister specific fields
	ID                      int
	AccountID               int64
	HasForeignSponsorshipID int
	ListID                  int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessSponsorship) Valid() (bool, error) {
	if entity.HasForeignSponsorship.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessSponsorship) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessSponsorship{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessSponsorship) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessSponsorship{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignSponsorship.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessSponsorship) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessSponsorship{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignSponsorshipID != 0 {
		if _, err := entity.HasForeignSponsorship.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessVentures struct {
	PayloadHasForeignVentures Payload `json:"HasForeignVentures" sql:"-"`
	PayloadList               Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignVentures *Branch     `json:"-"`
	List               *Collection `json:"-"`

	// Persister specific fields
	ID                   int
	AccountID            int64
	HasForeignVenturesID int
	ListID               int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessVentures) Valid() (bool, error) {
	if entity.HasForeignVentures.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessVentures) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessVentures{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVentures) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessVentures{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignVentures.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVentures) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessVentures{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignVenturesID != 0 {
		if _, err := entity.HasForeignVentures.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}

type ForeignBusinessVoting struct {
	PayloadHasForeignVoting Payload `json:"HasForeignVoting" sql:"-"`
	PayloadList             Payload `json:"List" sql:"-"`

	// Validator specific fields
	HasForeignVoting *Branch     `json:"-"`
	List             *Collection `json:"-"`

	// Persister specific fields
	ID                 int
	AccountID          int64
	HasForeignVotingID int
	ListID             int
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

// Valid checks the value(s) against an battery of tests.
func (entity *ForeignBusinessVoting) Valid() (bool, error) {
	if entity.HasForeignVoting.Value == "No" {
		return true, nil
	}

	return entity.List.Valid()
}

// Save will create or update the database.
func (entity *ForeignBusinessVoting) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
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

	err = context.CreateTable(&ForeignBusinessVoting{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

// Delete will remove the entity from the database.
func (entity *ForeignBusinessVoting) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessVoting{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.HasForeignVoting.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.List.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

// Get will retrieve the entity from the database.
func (entity *ForeignBusinessVoting) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ForeignBusinessVoting{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.HasForeignVotingID != 0 {
		if _, err := entity.HasForeignVoting.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ListID != 0 {
		if _, err := entity.List.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
