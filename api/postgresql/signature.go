package postgresql

import "encoding/json"

// Unmarshal bytes in to the entity properties.
func (entity *Signature) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	name, err := entity.PayloadName.Entity()
	if err != nil {
		return err
	}
	entity.Name = name.(*Text)

	date, err := entity.PayloadDate.Entity()
	if err != nil {
		return err
	}
	entity.Date = date.(*DateControl)

	return err
}

// Marshal to payload structure
func (entity *Signature) Marshal() Payload {
	if entity.Name != nil {
		entity.PayloadName = entity.Name.Marshal()
	}
	if entity.Date != nil {
		entity.PayloadDate = entity.Date.Marshal()
	}
	return MarshalPayloadEntity("signature", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Signature) Valid() (bool, error) {
	var stack model.ErrorStack

	if ok, err := entity.Name.Valid(); !ok {
		stack.Append("Name", err)
	}

	if ok, err := entity.Date.Valid(); !ok {
		stack.Append("Date", err)
	}

	return !stack.HasErrors(), stack
}

func (entity *Signature) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Signature{ID: entity.ID}, func(result interface{}) {
		previous := result.(*Signature)
		if entity.Name == nil {
			entity.Name = &Text{}
		}
		entity.NameID = previous.NameID
		entity.Name.ID = previous.NameID
		if entity.Date == nil {
			entity.Date = &DateControl{}
		}
		entity.DateID = previous.DateID
		entity.Date.ID = previous.DateID
	})

	nameID, err := entity.Name.Save(context, account)
	if err != nil {
		return nameID, err
	}
	entity.NameID = nameID

	dateID, err := entity.Date.Save(context, account)
	if err != nil {
		return dateID, err
	}
	entity.DateID = dateID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Signature) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	context.Find(&Signature{ID: entity.ID}, func(result interface{}) {
		previous := result.(*Signature)
		if entity.Name == nil {
			entity.Name = &Text{}
		}
		entity.NameID = previous.NameID
		entity.Name.ID = previous.NameID
		if entity.Date == nil {
			entity.Date = &DateControl{}
		}
		entity.DateID = previous.DateID
		entity.Date.ID = previous.DateID
	})

	if _, err := entity.Name.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Date.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *Signature) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.NameID != 0 {
		entity.Name = &Text{ID: entity.NameID}
		if _, err := entity.Name.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.DateID != 0 {
		entity.Date = &DateControl{ID: entity.DateID}
		if _, err := entity.Date.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// ID returns the entity identifier.
func (entity *Signature) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Signature) SetID(id int) {
	entity.ID = id
}
