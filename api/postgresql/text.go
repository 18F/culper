package postgresql

import (
	"encoding/json"
	"strings"
)

// Unmarshal bytes in to the entity properties.
func (entity *Text) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Text) Marshal() Payload {
	return MarshalPayloadEntity("text", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Text) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(string(entity.Value)) == "" {
		stack.Append("Text", model.ErrFieldRequired{"Text is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Text) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Text) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Text) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *Text) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Text) SetID(id int) {
	entity.ID = id
}
