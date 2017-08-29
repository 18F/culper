package form

import (
	"encoding/json"
	"strings"

	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/go-pg/pg"
)

// Textarea is a basic input.
type Textarea struct {
	ID    int
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

func (entity *Textarea) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Textarea) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Textarea) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
