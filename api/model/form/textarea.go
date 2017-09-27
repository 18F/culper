package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// Textarea is a basic input.
type Textarea struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Textarea) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Textarea) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(string(entity.Value)) == "" {
		stack.Append("Textarea", model.ErrFieldRequired{"Text is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Textarea) Save(context *db.DatabaseContext, account int) (int, error) {
	if err := context.CheckTable(entity); err != nil {
		return entity.ID, err
	}

	if entity.ID == 0 {
		if err := context.Insert(entity); err != nil {
			return entity.ID, err
		}
	} else {
		if err := context.Update(entity); err != nil {
			return entity.ID, err
		}
	}

	return entity.ID, nil
}

func (entity *Textarea) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Textarea) Get(context *db.DatabaseContext, account int) (int, error) {
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
