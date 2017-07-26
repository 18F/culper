package form

import "encoding/json"

// DateRange is a basic input.
type DateRange struct {
	From    Payload `json:"from"`
	To      Payload `json:"to"`
	Present bool    `json:"present"`
	from    DateControl
	to      DateControl
}

// Unmarshal bytes in to the entity properties.
func (entity *DateRange) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	from, err := entity.From.Entity()
	if err != nil {
		return err
	}

	to, err := entity.To.Entity()
	if err != nil {
		return err
	}

	entity.from = *from.(*DateControl)
	entity.to = *to.(*DateControl)
	return err
}

// Valid checks the value(s) against an battery of tests.
func (entity *DateRange) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.from.Valid(); !ok {
		stack.Append("From", err)
	}

	if ok, err := entity.to.Valid(); !ok {
		stack.Append("To", err)
	}

	if !stack.HasErrors() && entity.from.Date.After(entity.to.Date) {
		stack.Append("Range", ErrFieldRequired{"Date range is out of order"})
	}

	return !stack.HasErrors(), stack
}

// Save will create or update the database.
func (entity *DateRange) Save() error {
	return nil
}

// Delete will remove the entity from the database.
func (entity *DateRange) Delete() error {
	return nil
}

// Get will retrieve the entity from the database.
func (entity *DateRange) Get() error {
	return nil
}
