package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/go-pg/pg"
)

// Text is a basic input.
type Text struct {
	ID    int
	Value string `json:"value"`
}

// Unmarshal bytes in to the entity properties.
func (entity *Text) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Text) Valid() (bool, error) {
	var stack model.ErrorStack

	if strings.TrimSpace(string(entity.Value)) == "" {
		stack.Append("Text", model.ErrFieldRequired{"Text is required"})
	}

	return !stack.HasErrors(), stack
}

func (entity *Text) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Text) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Text) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
