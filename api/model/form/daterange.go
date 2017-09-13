package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// DateRange is a basic input.
type DateRange struct {
	PayloadFrom Payload `json:"from" sql:"-"`
	PayloadTo   Payload `json:"to" sql:"-"`
	Present     bool    `json:"present"`

	// Validator specific fields
	From *DateControl `json:"-"`
	To   *DateControl `json:"-"`

	// Persister specific fields
	ID        int
	AccountID int64
	FromID    int
	ToID      int
}

// Unmarshal bytes in to the entity properties.
func (entity *DateRange) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	from, err := entity.PayloadFrom.Entity()
	if err != nil {
		return err
	}
	entity.From = from.(*DateControl)

	to, err := entity.PayloadTo.Entity()
	if err != nil {
		return err
	}
	entity.To = to.(*DateControl)

	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *DateRange) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.From.Valid(); !ok {
		stack.Append("From", err)
	}

	if ok, err := entity.To.Valid(); !ok {
		stack.Append("To", err)
	}

	if !stack.HasErrors() && entity.From.Date.After(entity.To.Date) {
		stack.Append("Range", model.ErrFieldRequired{"Date range is out of order"})
	}

	return !stack.HasErrors(), stack
}

func (entity *DateRange) Save(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	var err error
	err = context.CreateTable(&DateRange{}, &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	})
	if err != nil {
		return entity.ID, err
	}

	fromID, err := entity.From.Save(context, account)
	if err != nil {
		return fromID, err
	}
	entity.FromID = fromID

	toID, err := entity.To.Save(context, account)
	if err != nil {
		return toID, err
	}
	entity.ToID = toID

	if entity.ID == 0 {
		err = context.Insert(entity)
	} else {
		err = context.Update(entity)
	}

	return entity.ID, err
}

func (entity *DateRange) Delete(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&DateRange{}, options); err != nil {
		return entity.ID, err
	}

	if _, err = entity.From.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err = entity.To.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *DateRange) Get(context *pg.DB, account int64) (int, error) {
	entity.AccountID = account

	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&DateRange{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	if entity.FromID != 0 {
		if _, err := entity.From.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ToID != 0 {
		if _, err := entity.To.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, err
}
