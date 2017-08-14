package form

import (
	"encoding/json"
	"regexp"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
)

var (
	formatTelephoneDomestic      = regexp.MustCompile("\\d{3}-?\\d{3}-?\\d{4}")
	formatTelephoneInternational = regexp.MustCompile("\\d{3}-?\\d{4}-?\\d{4}")
	formatTelephoneDSN           = regexp.MustCompile("\\d{3}-?\\d{4}")
)

// Telephone is a basic input.
type Telephone struct {
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
