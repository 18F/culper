package simplestore

import (
	"database/sql"
	"encoding/json"

	_ "github.com/go-pg/pg" // pg is required for the sqlx package to work
	"github.com/jmoiron/sqlx"
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

// SimpleStore saves JSON in the db for applications
type SimpleStore struct {
	db     *sqlx.DB
	logger api.LogService
}

// NewSimpleStore returns a configured SimpleStore
func NewSimpleStore(connectionString string, logger api.LogService) (SimpleStore, error) {
	db, connErr := sqlx.Connect("postgres", connectionString)
	if connErr != nil {
		logger.WarnError("Unable to connect to DB", connErr, api.LogFields{})
		return SimpleStore{}, errors.Wrap(connErr, "Unable to connect to db")
	}

	store := SimpleStore{
		db,
		logger,
	}

	return store, nil
}

func runCreateApplication(conn simpleConnection, app api.Application) error {
	json, marshalErr := json.Marshal(app)
	if marshalErr != nil {
		return errors.Wrap(marshalErr, "Failed to convert application to JSON")
	}

	saveQuery := "INSERT INTO applications (account_id, body) VALUES ($1, $2)"

	_, saveErr := conn.Exec(saveQuery, app.AccountID, string(json))
	if saveErr != nil {
		return errors.Wrap(saveErr, "Failed to create Application")
	}

	return nil
}

// CreateApplication saves an application in the db
func (s SimpleStore) CreateApplication(app api.Application) error {
	return runCreateApplication(s.db, app)
}

func runUpdateApplication(conn simpleConnection, app api.Application) error {
	json, marshalErr := json.Marshal(app)
	if marshalErr != nil {
		return errors.Wrap(marshalErr, "Failed to convert application to JSON")
	}

	updateQuery := "UPDATE applications SET body = $1 WHERE account_id = $2"

	result, saveErr := conn.Exec(updateQuery, string(json), app.AccountID)
	if saveErr != nil {
		return errors.Wrap(saveErr, "Failed to save Application")
	}

	rows, affectedErr := result.RowsAffected()
	if affectedErr != nil {
		return errors.Wrap(affectedErr, "Bizzarely unable to read affected rows")
	}

	if rows != 1 {
		return api.ErrApplicationDoesNotExist
	}

	return nil
}

// UpdateApplication updates an existing application
func (s SimpleStore) UpdateApplication(app api.Application) error {
	return runUpdateApplication(s.db, app)
}

// SaveSection saves a single section in a given application
func (s SimpleStore) SaveSection(section api.Section, accountID int) error {

	tx, txErr := s.db.Beginx()
	if txErr != nil {
		return txErr
	}

	app, loadErr := runLoadApplication(tx, accountID)
	if loadErr != nil {
		s.logger.WarnError("Unable to load the application before saving", loadErr, api.LogFields{"accountID": accountID})
		return loadErr
	}

	app.SetSection(section)

	updateErr := runUpdateApplication(tx, app)
	if updateErr != nil {
		return updateErr
	}

	commitErr := tx.Commit()
	if commitErr != nil {
		return commitErr
	}

	return nil

}

type applicationRow struct {
	AccountID int    `db:"account_id"`
	Body      string `db:"body"`
}

type applicationAccountRow struct {
	applicationRow
	api.Account
}

func runLoadApplication(conn simpleConnection, accountID int) (api.Application, error) {

	selectQuery := `SELECT applications.account_id, applications.body,
					accounts.id, accounts.form_version, accounts.form_type
				FROM applications, accounts
				WHERE applications.account_id = accounts.id AND accounts.id = $1`

	row := applicationAccountRow{}
	selectErr := conn.Get(&row, selectQuery, accountID)
	if selectErr != nil {
		if selectErr == sql.ErrNoRows {
			return api.Application{}, api.ErrApplicationDoesNotExist
		}
		return api.Application{}, errors.Wrap(selectErr, "Couldn't find Application")
	}

	app := api.BlankApplication(row.Account.ID, row.Account.FormType, row.Account.FormVersion)
	jsonErr := json.Unmarshal([]byte(row.Body), &app)
	if jsonErr != nil {
		return api.Application{}, errors.Wrap(jsonErr, "Couldn't unmarshal the loaded Application")
	}

	return app, nil
}

// LoadApplication loads an application from the DB, it will return a NotFound error if it does not exist.
func (s SimpleStore) LoadApplication(accountID int) (api.Application, error) {
	return runLoadApplication(s.db, accountID)
}
