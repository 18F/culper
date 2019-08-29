package api

import (
	"encoding/json"
	"regexp"
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
