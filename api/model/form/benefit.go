package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

type Benefit struct {
	ID                   int
	Begin                Payload `json:"Begin,omitempty"`
	End                  Payload `json:"End,omitempty"`
	Frequency            Payload `json:"Frequency,omitempty"`
	OtherFrequency       Payload `json:"OtherFrequency,omitempty"`
	Received             Payload `json:"Received,omitempty"`
	Country              Payload
	Value                Payload
	ValueEstimated       Payload
	Reason               Payload
	Obligated            Payload
	ObligatedExplanation Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *Benefit) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Benefit) Valid() (bool, error) {

	if ok, err := entity.Country.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Value.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Reason.Valid(); !ok {
		return false, err
	}

	o, err := entity.Obligated.Entity()
	if err != nil {
		return false, err
	}

	if ok, err := o.Valid(); !ok {
		return false, err
	}

	if o.(*Branch).Value == "Yes" {
		if ok, err := entity.ObligatedExplanation.Valid(); !ok {
			return false, err
		}
	}

	return true, nil
}

func (entity *Benefit) Save(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	if err := context.CreateTable(&Benefit{}, options); err != nil {
		return entity.ID, err
	}

	var err error
	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *Benefit) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Benefit) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
