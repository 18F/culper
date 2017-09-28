package form

import (
	"encoding/json"

	"github.com/18F/e-QIP-prototype/api/db"
)

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

func (entity *ReasonLeft) Save(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	commentsID, err := entity.Comments.Save(context, account)
	if err != nil {
		return commentsID, err
	}
	entity.CommentsID = commentsID

	reasonsID, err := entity.Reasons.Save(context, account)
	if err != nil {
		return reasonsID, err
	}
	entity.ReasonsID = reasonsID

	reasonDescriptionID, err := entity.ReasonDescription.Save(context, account)
	if err != nil {
		return reasonDescriptionID, err
	}
	entity.ReasonDescriptionID = reasonDescriptionID

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

func (entity *ReasonLeft) Delete(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Comments.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.Reasons.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if _, err := entity.ReasonDescription.Delete(context, account); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *ReasonLeft) Get(context *db.DatabaseContext, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Select(entity); err != nil {
			return entity.ID, err
		}
	}

	if entity.CommentsID != 0 {
		if _, err := entity.Comments.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ReasonsID != 0 {
		if _, err := entity.Reasons.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	if entity.ReasonDescriptionID != 0 {
		if _, err := entity.ReasonDescription.Get(context, account); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}
