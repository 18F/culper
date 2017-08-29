package form

import (
	"encoding/json"

	"github.com/go-pg/pg"
)

type CoOwners struct {
	ID   int
	List Payload
}

// Unmarshal bytes in to the entity properties.
func (entity *CoOwners) Unmarshal(raw []byte) error {
	return json.Unmarshal(raw, entity)
}

// Valid checks the value(s) against an battery of tests.
func (entity *CoOwners) Valid() (bool, error) {
	return entity.List.Valid()
}

func (entity *CoOwners) Save(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *CoOwners) Delete(context *pg.DB, account int64) (int, error) {
	return 0, nil
}

func (entity *CoOwners) Get(context *pg.DB, account int64) (int, error) {
	return 0, nil
}
