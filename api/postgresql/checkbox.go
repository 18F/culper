package postgresql

import "encoding/json"

// Unmarshal bytes in to the entity properties.
func (entity *Checkbox) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Checkbox) Marshal() Payload {
	return MarshalPayloadEntity("checkbox", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Checkbox) Valid() (bool, error) {
	return true, nil
}

func (entity *Checkbox) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Checkbox) Delete(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *Checkbox) Get(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// ID returns the entity identifier.
func (entity *Checkbox) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Checkbox) SetID(id int) {
	entity.ID = id
}
