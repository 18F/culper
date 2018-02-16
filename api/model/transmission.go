package model

import (
	"errors"
	"time"

	"github.com/18F/e-QIP-prototype/api/db"
)

// Transmission record of application being sent to external system for
// additional processing.
type Transmission struct {
	ID         int
	AccountID  int
	Raw        []byte
	RequestKey string
	AgencyKey  int
	Status     string
	Created    time.Time
	Modified   time.Time
}

// Get transmission record from the database.
func (transmission *Transmission) Get(ctx *db.DatabaseContext) error {
	if ctx.Database == nil {
		return errors.New("No database context found")
	}
	return ctx.Database.Select(transmission)
}

// Save transmission record to the database.
func (transmission *Transmission) Save(ctx *db.DatabaseContext) error {
	if ctx.Database == nil {
		return errors.New("No database context found")
	}

	var err error
	if transmission.ID == 0 {
		err = ctx.Database.Insert(transmission)
	} else {
		err = ctx.Database.Update(transmission)
	}

	return err
}
