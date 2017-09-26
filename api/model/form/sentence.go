package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// Sentence is a basic input.
type Sentence struct {
	PayloadDescription          Payload `json:"Description" sql:"-"`
	PayloadExceedsYear          Payload `json:"ExceedsYear" sql:"-"`
	PayloadIncarcerated         Payload `json:"Incarcerated" sql:"-"`
	PayloadIncarcerationDates   Payload `json:"IncarcerationDates" sql:"-"`
	PayloadIncarcerationDatesNA Payload `json:"IncarcerationDatesNA" sql:"-"`
	PayloadProbationDates       Payload `json:"ProbationDates" sql:"-"`
	PayloadProbationDatesNA     Payload `json:"ProbationDatesNA" sql:"-"`

	// Validator specific fields
	Description          *Textarea      `json:"-"`
	ExceedsYear          *Branch        `json:"-"`
	Incarcerated         *Branch        `json:"-"`
	IncarcerationDates   *DateRange     `json:"-"`
	IncarcerationDatesNA *NotApplicable `json:"-"`
	ProbationDates       *DateRange     `json:"-"`
	ProbationDatesNA     *NotApplicable `json:"-"`

	// Persister specific fields
	ID                     int   `json:"-"`
	AccountID              int64 `json:"-"`
	DescriptionID          int   `json:"-"`
	ExceedsYearID          int   `json:"-"`
	IncarceratedID         int   `json:"-"`
	IncarcerationDatesID   int   `json:"-"`
	IncarcerationDatesNAID int   `json:"-"`
	ProbationDatesID       int   `json:"-"`
	ProbationDatesNAID     int   `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Sentence) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	description, err := entity.PayloadDescription.Entity()
	if err != nil {
		return err
	}
	entity.Description = description.(*Textarea)

	exceedsYear, err := entity.PayloadExceedsYear.Entity()
	if err != nil {
		return err
	}
	entity.ExceedsYear = exceedsYear.(*Branch)

	incarcerated, err := entity.PayloadIncarcerated.Entity()
	if err != nil {
		return err
	}
	entity.Incarcerated = incarcerated.(*Branch)

	incarcerationDates, err := entity.PayloadIncarcerationDates.Entity()
	if err != nil {
		return err
	}
	entity.IncarcerationDates = incarcerationDates.(*DateRange)

	incarcerationDatesNA, err := entity.PayloadIncarcerationDatesNA.Entity()
	if err != nil {
		return err
	}
	entity.IncarcerationDatesNA = incarcerationDatesNA.(*NotApplicable)

	probationDates, err := entity.PayloadProbationDates.Entity()
	if err != nil {
		return err
	}
	entity.ProbationDates = probationDates.(*DateRange)

	probationDatesNA, err := entity.PayloadProbationDatesNA.Entity()
	if err != nil {
		return err
	}
	entity.ProbationDatesNA = probationDatesNA.(*NotApplicable)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *Sentence) Valid() (bool, error) {
	if ok, err := entity.Description.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.ExceedsYear.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Incarcerated.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.IncarcerationDates.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.IncarcerationDatesNA.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.ProbationDates.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.ProbationDatesNA.Valid(); !ok {
		return false, err
	}

	return true, nil
}

func (entity *Sentence) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	err = context.CreateTable(&Sentence{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	descriptionID, err := entity.Description.Save(context, account)
	if err != nil {
		return descriptionID, err
	}
	entity.DescriptionID = descriptionID

	exceedsYearID, err := entity.ExceedsYear.Save(context, account)
	if err != nil {
		return exceedsYearID, err
	}
	entity.ExceedsYearID = exceedsYearID

	incarceratedID, err := entity.Incarcerated.Save(context, account)
	if err != nil {
		return incarceratedID, err
	}
	entity.IncarceratedID = incarceratedID

	incarcerationDatesID, err := entity.IncarcerationDates.Save(context, account)
	if err != nil {
		return incarcerationDatesID, err
	}
	entity.IncarcerationDatesID = incarcerationDatesID

	incarcerationDatesNAID, err := entity.IncarcerationDatesNA.Save(context, account)
	if err != nil {
		return incarcerationDatesNAID, err
	}
	entity.IncarcerationDatesNAID = incarcerationDatesNAID

	probationDatesID, err := entity.ProbationDates.Save(context, account)
	if err != nil {
		return probationDatesID, err
	}
	entity.ProbationDatesID = probationDatesID

	probationDatesNAID, err := entity.ProbationDatesNA.Save(context, account)
	if err != nil {
		return probationDatesNAID, err
	}
	entity.ProbationDatesNAID = probationDatesNAID

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *Sentence) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Sentence{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Description.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.ExceedsYear.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Incarcerated.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.IncarcerationDates.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.IncarcerationDatesNA.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.ProbationDates.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.ProbationDatesNA.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *Sentence) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&Sentence{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.DescriptionID != 0 {
		if _, err := entity.Description.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExceedsYearID != 0 {
		if _, err := entity.ExceedsYear.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.IncarceratedID != 0 {
		if _, err := entity.Incarcerated.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.IncarcerationDatesID != 0 {
		if _, err := entity.IncarcerationDates.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.IncarcerationDatesNAID != 0 {
		if _, err := entity.IncarcerationDatesNA.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ProbationDatesID != 0 {
		if _, err := entity.ProbationDates.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ProbationDatesNAID != 0 {
		if _, err := entity.ProbationDatesNA.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
