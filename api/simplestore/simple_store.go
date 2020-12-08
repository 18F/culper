package simplestore

import (
	"database/sql"
	"fmt"
	"net/url"

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
	Select(dest interface{}, query string, args ...interface{}) error
	Close() error
}

// DBConfig contains everything neccecary to setup a postgres db connection
type DBConfig struct {
	User     string
	Password string
	Address  string
	DBName   string
	SSLMode  string
}

// PostgresConnectURI creates a connection string, which is used by the golang sql Open() function
func PostgresConnectURI(conf DBConfig) string {
	// By user (+ password) + database + host
	uri := &url.URL{Scheme: "postgres"}
	username := conf.User

	// Check if there is a password set. If not then we need to create
	// the Userinfo structure in a different way so we don't include
	// exta colons (:).
	pw := conf.Password
	if pw == "" {
		uri.User = url.User(username)
	} else {
		uri.User = url.UserPassword(username, pw)
	}

	// The database name will be part of the URI path so it needs
	// a prefix of "/"
	database := conf.DBName
	uri.Path = fmt.Sprintf("/%s", database)

	// Host can be either "address + port" or just "address"
	host := conf.Address
	uri.Host = host

	if conf.SSLMode != "" {
		params := url.Values{}
		params.Set("sslmode", conf.SSLMode)
		uri.RawQuery = params.Encode()
	}

	return uri.String()
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
