package api

// Entity is a structure which can marshall, validate, and persist.
type Entity interface {
	Identifier
	Marshaller
	Validator
	Persister
}

// Identifier allows for entities to be tagged with an ID
type Identifier interface {
	GetID() int
	SetID(id int)
}

// Marshaller is structure which can marshal and unmarshal JSON.
type Marshaller interface {
	Unmarshal([]byte) error
	Marshal() Payload
}

// Validator interface entities which allow validating properties.
type Validator interface {
	Valid() (bool, error)
}

// Persister interface provides common functionality for persisting
// data to storage.
type Persister interface {
	Save(context *DatabaseService, account int) (int, error)
	Delete(context *DatabaseService, account int) (int, error)
	Get(context *DatabaseService, account int) (int, error)
}
