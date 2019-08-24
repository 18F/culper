package api

import (
	"encoding/json"
)

// Attachment document types (dervied from e-QIP identifiers)
const (
	Certification  = "CER"
	MedicalRelease = "MEL"
	GeneralRelease = "REL"
	CreditRelease  = "FCR"
)

// Attachment stores information in regards to a file associated with the application.
type Attachment struct {
	ID          int    `json:"id"`
	AccountID   int    `json:"-"`
	Description string `json:"description"`
	Filename    string `json:"filename"`
	Size        int64  `json:"size"`
	DocType     string `json:"docType"`
	Raw         []byte `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Attachment) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Marshal to payload structure
func (entity *Attachment) Marshal() Payload {
	return MarshalPayloadEntity("attachment", entity)
}
