package api

import (
	"time"
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
func (transmission *Transmission) Get(context DatabaseService) error {
	return context.Select(transmission)
}

// Save transmission record to the database.
func (transmission *Transmission) Save(context DatabaseService) error {
	var err error
	if transmission.ID == 0 {
		err = context.Insert(transmission)
	} else {
		err = context.Update(transmission)
	}

	return err
}

func (entity *Transmission) Find(context DatabaseService) error {
	return nil
}
