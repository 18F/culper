package api

import "encoding/json"

// ReasonLeft is a basic input.
type ReasonLeft struct {
	PayloadComments          Payload `json:"Comments" sql:"-"`
	PayloadReasons           Payload `json:"Reasons" sql:"-"`
	PayloadReasonDescription Payload `json:"ReasonDescription" sql:"-"`

	// Validator specific fields
	Comments          *Textarea   `json:"-"`
	Reasons           *Collection `json:"-"`
	ReasonDescription *Textarea   `json:"-"`

	// Persister specific fields
	ID                  int `json:"-"`
	AccountID           int `json:"-"`
	CommentsID          int `json:"-"`
	ReasonsID           int `json:"-"`
	ReasonDescriptionID int `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *ReasonLeft) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Textarea)

	reasons, err := entity.PayloadReasons.Entity()
	if err != nil {
		return err
	}
	entity.Reasons = reasons.(*Collection)

	reasonDescription, err := entity.PayloadReasonDescription.Entity()
	if err != nil {
		return err
	}
	entity.ReasonDescription = reasonDescription.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *ReasonLeft) Marshal() Payload {
	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	if entity.Reasons != nil {
		entity.PayloadReasons = entity.Reasons.Marshal()
	}
	if entity.ReasonDescription != nil {
		entity.PayloadReasonDescription = entity.ReasonDescription.Marshal()
	}
	return MarshalPayloadEntity("reasonleft", entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *ReasonLeft) Valid() (bool, error) {
	if ok, err := entity.ReasonDescription.Valid(); !ok {
		return false, err
	}

	if ok, err := entity.Reasons.Valid(); !ok {
		return false, err
	}

	return true, nil
}
