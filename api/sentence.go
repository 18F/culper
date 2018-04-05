package api

import "encoding/json"

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
	Description          *Textarea      `json:"-" sql:"-"`
	ExceedsYear          *Branch        `json:"-" sql:"-"`
	Incarcerated         *Branch        `json:"-" sql:"-"`
	IncarcerationDates   *DateRange     `json:"-" sql:"-"`
	IncarcerationDatesNA *NotApplicable `json:"-" sql:"-"`
	ProbationDates       *DateRange     `json:"-" sql:"-"`
	ProbationDatesNA     *NotApplicable `json:"-" sql:"-"`

	// Persister specific fields
	ID                     int `json:"-"`
	AccountID              int `json:"-"`
	DescriptionID          int `json:"-"`
	ExceedsYearID          int `json:"-"`
	IncarceratedID         int `json:"-"`
	IncarcerationDatesID   int `json:"-"`
	IncarcerationDatesNAID int `json:"-"`
	ProbationDatesID       int `json:"-"`
	ProbationDatesNAID     int `json:"-"`
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

// Marshal to payload structure
func (entity *Sentence) Marshal() Payload {
	if entity.Description != nil {
		entity.PayloadDescription = entity.Description.Marshal()
	}
	if entity.ExceedsYear != nil {
		entity.PayloadExceedsYear = entity.ExceedsYear.Marshal()
	}
	if entity.Incarcerated != nil {
		entity.PayloadIncarcerated = entity.Incarcerated.Marshal()
	}
	if entity.IncarcerationDates != nil {
		entity.PayloadIncarcerationDates = entity.IncarcerationDates.Marshal()
	}
	if entity.IncarcerationDatesNA != nil {
		entity.PayloadIncarcerationDatesNA = entity.IncarcerationDatesNA.Marshal()
	}
	if entity.ProbationDates != nil {
		entity.PayloadProbationDates = entity.ProbationDates.Marshal()
	}
	if entity.ProbationDatesNA != nil {
		entity.PayloadProbationDatesNA = entity.ProbationDatesNA.Marshal()
	}
	return MarshalPayloadEntity("sentence", entity)
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

// Save the Sentence entity.
func (entity *Sentence) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the Sentence entity.
func (entity *Sentence) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

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

	if _, err := entity.Description.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ExceedsYear.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Incarcerated.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.IncarcerationDates.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.IncarcerationDatesNA.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ProbationDates.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ProbationDatesNA.Delete(context, account); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Get the Sentence entity.
func (entity *Sentence) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Sentence) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Sentence) SetID(id int) {
	entity.ID = id
}

func (entity *Sentence) Find(context DatabaseService) error {
	context.Find(&Sentence{ID: entity.ID, AccountID: entity.AccountID}, func(result interface{}) {
		previous := result.(*Sentence)
		if entity.Description == nil {
			entity.Description = &Textarea{}
		}
		entity.Description.ID = previous.DescriptionID
		entity.DescriptionID = previous.DescriptionID
		if entity.ExceedsYear == nil {
			entity.ExceedsYear = &Branch{}
		}
		entity.ExceedsYear.ID = previous.ExceedsYearID
		entity.ExceedsYearID = previous.ExceedsYearID
		if entity.Incarcerated == nil {
			entity.Incarcerated = &Branch{}
		}
		entity.Incarcerated.ID = previous.IncarceratedID
		entity.IncarceratedID = previous.IncarceratedID
		if entity.IncarcerationDates == nil {
			entity.IncarcerationDates = &DateRange{}
		}
		entity.IncarcerationDates.ID = previous.IncarcerationDatesID
		entity.IncarcerationDatesID = previous.IncarcerationDatesID
		if entity.IncarcerationDatesNA == nil {
			entity.IncarcerationDatesNA = &NotApplicable{}
		}
		entity.IncarcerationDatesNA.ID = previous.IncarcerationDatesNAID
		entity.IncarcerationDatesNAID = previous.IncarcerationDatesNAID
		if entity.ProbationDates == nil {
			entity.ProbationDates = &DateRange{}
		}
		entity.ProbationDates.ID = previous.ProbationDatesID
		entity.ProbationDatesID = previous.ProbationDatesID
		if entity.ProbationDatesNA == nil {
			entity.ProbationDatesNA = &NotApplicable{}
		}
		entity.ProbationDatesNA.ID = previous.ProbationDatesNAID
		entity.ProbationDatesNAID = previous.ProbationDatesNAID
	})
	return nil
}
