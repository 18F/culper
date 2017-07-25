package form

import (
	"encoding/json"
	"errors"
)

// Payload is a basic structure to encapsulate a generic structure.
type Payload struct {
	Type  string          `json:"type"`
	Props json.RawMessage `json:"props"`
}

// Unmarshal basic payload structure.
func (payload *Payload) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, payload)
}

// Entity returns the appropriate entity as an interface
// based on its type.
func (payload Payload) Entity() (Entity, error) {
	var entity Entity

	switch {
	case payload.Type == "checkbox":
		entity = &Checkbox{}
	case payload.Type == "datecontrol":
		entity = &DateControl{}
	case payload.Type == "daterange":
		entity = &DateRange{}
	case payload.Type == "email":
		entity = &Email{}
	case payload.Type == "name":
		entity = &Name{}
	case payload.Type == "notapplicable":
		entity = &NotApplicable{}
	case payload.Type == "number":
		entity = &Number{}
	case payload.Type == "radio":
		entity = &Radio{}
	case payload.Type == "ssn":
		entity = &SSN{}
	case payload.Type == "telephone":
		entity = &Telephone{}
	case payload.Type == "text":
		entity = &Text{}
	case payload.Type == "textarea":
		entity = &Textarea{}
	}

	if entity == nil {
		return nil, errors.New("Could not determine a suitable type")
	}

	err := entity.Unmarshal(payload.Props)
	return entity, err
}
