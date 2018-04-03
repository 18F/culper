package postgresql

import (
	"encoding/json"
	"strings"
)

// Unmarshal bytes in to the entity properties.
func (entity *Telephone) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Telephone) Marshal() Payload {
	return MarshalPayloadEntity("telephone", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Telephone) Valid() (bool, error) {
	if entity.NoNumber {
		return true, nil
	}

	var stack model.ErrorStack

	if strings.TrimSpace(entity.TimeOfDay) == "" {
		stack.Append("Telephone", model.ErrFieldRequired{"Telephone time of day is required"})
	}

	if strings.TrimSpace(entity.Number) == "" {
		stack.Append("Telephone", model.ErrFieldRequired{"Telephone number is required"})
	} else {
		switch strings.ToLower(entity.Type) {
		case "international":
			if ok := formatTelephoneInternational.MatchString(entity.Number); !ok {
				stack.Append("Telephone", model.ErrFieldInvalid{"International telephone number is not properly formatted"})
			}
		case "dsn":
			if ok := formatTelephoneDSN.MatchString(entity.Number); !ok {
				stack.Append("Telephone", model.ErrFieldInvalid{"DSN telephone number is not properly formatted"})
			}
		default:
			if ok := formatTelephoneDomestic.MatchString(entity.Number); !ok {
				stack.Append("Telephone", model.ErrFieldInvalid{"Domestic telephone number is not properly formatted"})
			}
		}
	}

	if strings.TrimSpace(entity.NumberType) == "" {
		stack.Append("Telephone", model.ErrFieldRequired{"Telephone number type is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Telephone) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *Telephone) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Telephone) Get(context *db.DatabaseContext, account int) (int, error) {
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
func (entity *Telephone) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Telephone) SetID(id int) {
	entity.ID = id
}
