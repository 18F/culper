package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/model"
)

// Branch is a basic yes/no input.
type Branch struct {
	ID    int    `json:"-"`
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Branch) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Branch) Valid() (bool, error) {
	var stack model.ErrorStack

	trimmed := strings.TrimSpace(string(entity.Value))
	if trimmed == "" {
		stack.Append("Branch", model.ErrFieldRequired{"Branch value is required"})
	}

	if trimmed != "Yes" && trimmed != "No" {
		stack.Append("Branch", model.ErrFieldInvalid{"Invalid value for branch"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Branch) Save(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Branch) Delete(context *db.DatabaseContext, account int) (int, error) {
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

func (entity *Branch) Get(context *db.DatabaseContext, account int) (int, error) {
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
