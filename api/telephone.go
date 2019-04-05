package api

import (
	"encoding/json"
	"regexp"
	"strings"
)

var (
	formatTelephoneDomestic      = regexp.MustCompile("\\d{3}-?\\d{3}-?\\d{4}")
	formatTelephoneInternational = regexp.MustCompile("\\d{3}-?\\d{4}-?\\d{4}")
	formatTelephoneDSN           = regexp.MustCompile("\\d{3}-?\\d{4}")
	formatNumberType             = regexp.MustCompile("(Home|Work|Cell|NA|^$)")
)

// Telephone is a basic input.
type Telephone struct {
	ID         int    `json:"-"`
	TimeOfDay  string `json:"timeOfDay"`
	Type       string `json:"type"`
	NumberType string `json:"numberType"`
	Number     string `json:"number"`
	Extension  string `json:"extension"`
	NoNumber   bool   `json:"noNumber"`
}

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

	var stack ErrorStack

	if strings.TrimSpace(entity.TimeOfDay) == "" {
		stack.Append("Telephone", ErrFieldRequired{"Telephone time of day is required"})
	}

	if strings.TrimSpace(entity.Number) == "" {
		stack.Append("Telephone", ErrFieldRequired{"Telephone number is required"})
	} else {
		switch strings.ToLower(entity.Type) {
		case "international":
			if ok := formatTelephoneInternational.MatchString(entity.Number); !ok {
				stack.Append("Telephone", ErrFieldInvalid{"International telephone number is not properly formatted"})
			}
		case "dsn":
			if ok := formatTelephoneDSN.MatchString(entity.Number); !ok {
				stack.Append("Telephone", ErrFieldInvalid{"DSN telephone number is not properly formatted"})
			}
		default:
			if ok := formatTelephoneDomestic.MatchString(entity.Number); !ok {
				stack.Append("Telephone", ErrFieldInvalid{"Domestic telephone number is not properly formatted"})
			}
		}
	}

	if ok := formatNumberType.MatchString(entity.NumberType); !ok {
		stack.Append("Telephone", ErrFieldInvalid{"Number type is not properly formatted"})
	}

	return !stack.HasErrors(), stack
}

// Save the telephone to data storage.
func (entity *Telephone) Save(context DatabaseService, account int) (int, error) {
	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the telephone from data storage.
func (entity *Telephone) Delete(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// Get the telephone from data storage.
func (entity *Telephone) Get(context DatabaseService, account int) (int, error) {
	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

// GetID returns the entity identifier.
func (entity *Telephone) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Telephone) SetID(id int) {
	entity.ID = id
}

// Find is not used for telephones. Please use the `Get` method.
func (entity *Telephone) Find(context DatabaseService) error {
	return nil
}
