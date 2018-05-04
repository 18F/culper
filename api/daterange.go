package api

import "encoding/json"

// DateRange is a basic input.
type DateRange struct {
	PayloadFrom Payload `json:"from" sql:"-"`
	PayloadTo   Payload `json:"to" sql:"-"`
	Present     bool    `json:"present"`

	// Validator specific fields
	From *DateControl `json:"-"`
	To   *DateControl `json:"-"`

	// Persister specific fields
	ID        int `json:"-"`
	AccountID int `json:"-"`
	FromID    int `json:"-"`
	ToID      int `json:"-"`
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

// Marshal to payload structure
func (entity *DateRange) Marshal() Payload {
	if entity.From != nil {
		entity.PayloadFrom = entity.From.Marshal()
	}
	if entity.To != nil {
		entity.PayloadTo = entity.To.Marshal()
	}
	return MarshalPayloadEntity("daterange", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *DateRange) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := entity.From.Valid(); !ok {
		stack.Append("From", err)
	}

	if ok, err := entity.To.Valid(); !ok {
		stack.Append("To", err)
	}

	if !stack.HasErrors() && entity.From.Date().After(entity.To.Date()) {
		stack.Append("Range", ErrFieldRequired{"Date range is out of order"})
	}

	return !stack.HasErrors(), stack
}

// Save the DateRange entity.
func (entity *DateRange) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
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

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the DateRange entity.
func (entity *DateRange) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if _, err := entity.From.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.To.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the DateRange entity.
func (entity *DateRange) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.FromID != 0 {
		entity.From = &DateControl{ID: entity.FromID}
		if _, err := entity.From.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ToID != 0 {
		entity.To = &DateControl{ID: entity.ToID}
		if _, err := entity.To.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *DateRange) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *DateRange) SetID(id int) {
	entity.ID = id
}

// Find the previous entity stored if one is available.
func (entity *DateRange) Find(context DatabaseService) error {
	context.Find(&DateRange{ID: entity.ID}, func(result interface{}) {
		previous := result.(*DateRange)
		if entity.From == nil {
			entity.From = &DateControl{}
		}
		entity.FromID = previous.FromID
		entity.From.ID = previous.FromID
		if entity.To == nil {
			entity.To = &DateControl{}
		}
		entity.ToID = previous.ToID
		entity.To.ID = previous.ToID
	})
	return nil
}
