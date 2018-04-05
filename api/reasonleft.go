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

// Save the ReasonLeft entity.
func (entity *ReasonLeft) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
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

// Delete the ReasonLeft entity.
func (entity *ReasonLeft) Delete(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
		return entity.ID, err
	}

	if entity.ID != 0 {
		if err := context.Delete(entity); err != nil {
			return entity.ID, err
		}
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

	return entity.ID, nil
}

// Get the ReasonLeft entity.
func (entity *ReasonLeft) Get(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := entity.Find(context); err != nil {
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

// GetID returns the entity identifier.
func (entity *ReasonLeft) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *ReasonLeft) SetID(id int) {
	entity.ID = id
}

func (entity *ReasonLeft) Find(context DatabaseService) error {
	context.Find(&ReasonLeft{ID: entity.AccountID}, func(result interface{}) {
		previous := result.(*ReasonLeft)
		if entity.Comments == nil {
			entity.Comments = &Textarea{}
		}
		entity.Comments.ID = previous.CommentsID
		entity.CommentsID = previous.CommentsID
		if entity.Reasons == nil {
			entity.Reasons = &Collection{}
		}
		entity.Reasons.ID = previous.ReasonsID
		entity.ReasonsID = previous.ReasonsID
		if entity.ReasonDescription == nil {
			entity.ReasonDescription = &Textarea{}
		}
		entity.ReasonDescription.ID = previous.ReasonDescriptionID
		entity.ReasonDescriptionID = previous.ReasonDescriptionID
	})
	return nil
}
