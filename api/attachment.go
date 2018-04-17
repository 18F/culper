package api

import (
	"encoding/json"
)

// Attachment is a basic yes/no input.
type Attachment struct {
	ID          int    `json:"id"`
	AccountID   int    `json:"-"`
	Description string `json:"description"`
	Filename    string `json:"filename"`
	Size        int64  `json:"size"`
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

// Valid checks the value(s) against an battery of tests.
func (entity *Attachment) Valid() (bool, error) {
	var stack ErrorStack
	return !stack.HasErrors(), stack
}

// Save the Branch entity.
func (entity *Attachment) Save(context DatabaseService, account int) (int, error) {
	entity.AccountID = account

	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if err := context.Save(entity); err != nil {
		return entity.ID, err
	}

	return entity.ID, nil
}

// Delete the Branch entity.
func (entity *Attachment) Delete(context DatabaseService, account int) (int, error) {
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

// Get the Branch entity.
func (entity *Attachment) Get(context DatabaseService, account int) (int, error) {
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

// GetID returns the entity identifier.
func (entity *Attachment) GetID() int {
	return entity.ID
}

// SetID sets the entity identifier.
func (entity *Attachment) SetID(id int) {
	entity.ID = id
}

func (entity *Attachment) Find(context DatabaseService) error {
	return nil
}
