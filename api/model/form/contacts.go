package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

type Contacts struct {
	ID   int
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *Contacts) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *Contacts) Valid() (bool, error) {
	return entity.List.Valid()
}

func (entity *Contacts) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Contacts) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *Contacts) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
