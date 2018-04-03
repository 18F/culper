package postgresql

import (
	"encoding/json"
	"strconv"
	"strings"
)

// Unmarshal bytes in to the entity properties.
func (entity *Number) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Number) Marshal() Payload {
	return MarshalPayloadEntity("number", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Number) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(entity.Value) == "" {
		stack.Append("Number", model.ErrFieldRequired{"Number is required"})
	} else if _, err := strconv.Atoi(entity.Value); err != nil {
		stack.Append("Number", model.ErrFieldInvalid{"Invalid number"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Number) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Number) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Number) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *Number) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Number) SetID(id int) {
	entity.ID = id
}
