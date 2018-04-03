package postgresql

import "errors"

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
