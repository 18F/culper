package api

import "encoding/json"

// AdditionalComments represents the payload for the additional comments at the end of the form.
type AdditionalComments struct {
	PayloadHasComments Payload `json:"HasComments" sql:"-"`
	PayloadComments    Payload `json:"Comments" sql:"-"`

	HasComments *Branch   `json:"-"`
	Comments    *Textarea `json:"-"`
}

// Unmarshal bytes in to the entity properties.
func (entity *AdditionalComments) Unmarshal(raw []byte) error {
	err := json.Unmarshal(raw, entity)
	if err != nil {
		return err
	}

	hasComments, err := entity.PayloadHasComments.Entity()
	if err != nil {
		return err
	}
	entity.HasComments = hasComments.(*Branch)

	comments, err := entity.PayloadComments.Entity()
	if err != nil {
		return err
	}
	entity.Comments = comments.(*Textarea)

	return err
}

// Marshal to payload structure
func (entity *AdditionalComments) Marshal() Payload {
	if entity.HasComments != nil {
		entity.PayloadHasComments = entity.HasComments.Marshal()
	}

	if entity.Comments != nil {
		entity.PayloadComments = entity.Comments.Marshal()
	}
	return MarshalPayloadEntity("package.comments", entity)
}

// ClearNoBranches clears any questions answered nos on a kickback
func (entity *AdditionalComments) ClearNoBranches() error {
	entity.HasComments.ClearNo()
	return nil
}
