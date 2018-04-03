package postgresql

import (
	"encoding/json"
	"net/mail"
	"strings"
)

// Unmarshal bytes in to the entity properties.
func (entity *Email) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Email) Marshal() Payload {
	return MarshalPayloadEntity("email", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Email) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(entity.Value) == "" {
		stack.Append("Email", model.ErrFieldRequired{"Email is required"})
	} else if _, err := mail.ParseAddress(entity.Value); err != nil {
		stack.Append("Email", model.ErrFieldInvalid{"Email is not correctly formatted"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Email) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Email) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Email) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *Email) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Email) SetID(id int) {
	entity.ID = id
}
