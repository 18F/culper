package form

import (
	"encoding/json"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api/model"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

// DateControl is a basic input.
type DateControl struct {
	ID        int
	Month     string    `json:"month"`
	Day       string    `json:"day"`
	Year      string    `json:"year"`
	Estimated bool      `json:"estimated"`
	Date      time.Time `json:"date"`
}

// Unmarshal bytes in to the entity properties.
func (entity *DateControl) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *DateControl) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(entity.Month) == "" {
		stack.Append("Month", model.ErrFieldRequired{"Month is required"})
	}

	if strings.TrimSpace(entity.Day) == "" {
		if entity.Estimated {
			entity.Day = "15"
		} else {
			stack.Append("Day", model.ErrFieldRequired{"Day is required"})
		}
	}

	if strings.TrimSpace(entity.Year) == "" {
		stack.Append("Year", model.ErrFieldRequired{"Year is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *DateControl) Save(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	if err := context.CreateTable(&DateControl{}, options); err != nil {
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

func (entity *DateControl) Delete(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&DateControl{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Delete(entity)
	}

	return entity.ID, err
}

func (entity *DateControl) Get(context *pg.DB, account int64) (int, error) {
	options := &orm.CreateTableOptions{
		Temp:        false,
		IfNotExists: true,
	}

	var err error
	if err = context.CreateTable(&DateControl{}, options); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		err = context.Select(entity)
	}

	return entity.ID, err
}
