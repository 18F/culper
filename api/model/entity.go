package model

import (
	"github.com/go-pg/pg"
)

// Entity is a structure which can marshall, validate, and persist.
type Entity interface {
	Marshaller
	Validator
	Persister
}

// Marshaller is structure which can marshal and unmarshal JSON.
type Marshaller interface {
	Unmarshal([]byte) error
}

// Validator interface entities which allow validating properties.
type Validator interface {
	Valid() (bool, error)
}

// Persister interface provides common functionality for persisting
// data to storage.
type Persister interface {
	Save(context *pg.DB, account int64) (int, error)
	Delete(context *pg.DB, account int64) (int, error)
	Get(context *pg.DB, account int64) (int, error)
}
