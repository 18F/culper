package simplestore

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
)

// errrorDB throws errors on every call to a
type errorDB struct {
}

func (db *errorDB) Exec(query string, args ...interface{}) (sql.Result, error) {
	return nil, errors.New("MOCK ERR")
}

func (db *errorDB) Get(dest interface{}, query string, args ...interface{}) error {
	return errors.New("MOCK ERR")
}

func (db *errorDB) MustExec(query string, args ...interface{}) sql.Result {
	return nil
}

func (db *errorDB) Beginx() (*sqlx.Tx, error) {
	return nil, errors.New("MOCK ERR")
}

func (db *errorDB) Queryx(query string, args ...interface{}) (*sqlx.Rows, error) {
	return nil, errors.New("MOCK ERR")
}

func (db *errorDB) Select(dest interface{}, query string, args ...interface{}) error {
	return errors.New("MOCK ERR")
}

func (db *errorDB) Close() error {
	return errors.New("MOCK ERR")
}
