package model

// Entity is a structure which can marshall, validate, and persist.
type Entity interface {
	Marshaller
	Validator
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
	Save(account int64) error
	Delete(account int64) error
	Get(account int64) error
}

type EntityPersister interface {
	Entity
	Persister
}
