package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// ClearanceLevel is a basic input.
type ClearanceLevel struct {
	PayloadLevel       Payload `json:"Level" sql:"-"`
	PayloadExplanation Payload `json:"Explanation" sql:"-"`

	// Validator specific fields
	Level       *Radio    `json:"-"`
	Explanation *Textarea `json:"-"`

	// Persister specific fields
	ID            int
	AccountID     int64
	LevelID       int
	ExplanationID int
}

// Unmarshal bytes in to the entity properties.
func (entity *ClearanceLevel) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	level, err := entity.PayloadLevel.Entity()
	if err != nil {
		return err
	}
	entity.Level = level.(*Radio)

	explanation, err := entity.PayloadExplanation.Entity()
	if err != nil {
		return err
	}
	entity.Explanation = explanation.(*Textarea)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *ClearanceLevel) Valid() (bool, error) {
	if ok, err := entity.Level.Valid(); !ok {
		return false, err
	}

	if entity.Level.Value == "Other" {
		if ok, err := entity.Explanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}

func (entity *ClearanceLevel) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	err = context.CreateTable(&ClearanceLevel{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	levelID, err := entity.Level.Save(context, account)
	if err != nil {
		return levelID, err
	}
	entity.LevelID = levelID

	explanationID, err := entity.Explanation.Save(context, account)
	if err != nil {
		return explanationID, err
	}
	entity.ExplanationID = explanationID

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *ClearanceLevel) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ClearanceLevel{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Level.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.Explanation.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *ClearanceLevel) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&ClearanceLevel{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.LevelID != 0 {
		if _, err := entity.Level.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ExplanationID != 0 {
		if _, err := entity.Explanation.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
