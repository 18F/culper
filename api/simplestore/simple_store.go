package simplestore

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq" // pg is required for the sqlx package to work
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

// simpleConnection contains all the methods we actually call on the db connection.
// These functions are callable on both the sqlx.DB *and* the sqlx.Tx so we can have our
// db functions easily work on either the main connection or a transaction.
type simpleConnection interface {
	Exec(query string, args ...interface{}) (sql.Result, error)
	Get(dest interface{}, query string, args ...interface{}) error
}

// In order to be able to mock the db for coverage reasons, we here declare an interface of
// everything we actually use in sqlx.
type sqlxConnection interface {
	simpleConnection

	MustExec(query string, args ...interface{}) sql.Result
	Beginx() (*sqlx.Tx, error)
	Queryx(query string, args ...interface{}) (*sqlx.Rows, error)
	Close() error
}

// SimpleStore saves JSON in the db for applications
type SimpleStore struct {
	db         sqlxConnection
	serializer api.Serializer
	logger     api.LogService
}

// NewSimpleStore returns a configured SimpleStore
func NewSimpleStore(connectionString string, logger api.LogService, serializer api.Serializer) (SimpleStore, error) {
	db, connErr := sqlx.Connect("postgres", connectionString)
	if connErr != nil {
		logger.WarnError("Unable to connect to DB", connErr, api.LogFields{})
		return SimpleStore{}, errors.Wrap(connErr, "Unable to connect to db")
	}

	store := SimpleStore{
		db,
		serializer,
		logger,
	}

	return store, nil
}

// Close closes the db connection
func (s SimpleStore) Close() error {
	return s.db.Close()
}
