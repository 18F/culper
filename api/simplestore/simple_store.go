package simplestore

import (
	"database/sql"

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
	db         *sqlx.DB
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

func runCreateApplication(conn simpleConnection, serializer api.Serializer, app api.Application) error {
	serializedApp, serializeErr := serializer.SerializeApplication(app)
	if serializeErr != nil {
		return errors.Wrap(serializeErr, "Failed to serialize Application.")
	}

	saveQuery := "INSERT INTO applications (account_id, body) VALUES ($1, $2)"

	_, saveErr := conn.Exec(saveQuery, app.AccountID, serializedApp)
	if saveErr != nil {
		return errors.Wrap(saveErr, "Failed to create Application")
	}

	return nil
}

// CreateApplication saves an application in the db
func (s SimpleStore) CreateApplication(app api.Application) error {
	return runCreateApplication(s.db, s.serializer, app)
}

func runUpdateApplication(conn simpleConnection, serializer api.Serializer, app api.Application) error {
	serializedApp, serializeErr := serializer.SerializeApplication(app)
	if serializeErr != nil {
		return errors.Wrap(serializeErr, "Failed to serialize Application.")
	}

	updateQuery := "UPDATE applications SET body = $1 WHERE account_id = $2"

	result, saveErr := conn.Exec(updateQuery, serializedApp, app.AccountID)
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
	return runUpdateApplication(s.db, s.serializer, app)
}

// SaveSection saves a single section in a given application
func (s SimpleStore) SaveSection(section api.Section, accountID int) error {

	tx, txErr := s.db.Beginx()
	if txErr != nil {
		return txErr
	}

	app, loadErr := runLoadApplication(tx, s.serializer, accountID)
	if loadErr != nil {
		s.logger.WarnError("Unable to load the application before saving", loadErr, api.LogFields{"accountID": accountID})
		return loadErr
	}

	app.SetSection(section)

	updateErr := runUpdateApplication(tx, s.serializer, app)
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

func runLoadApplication(conn simpleConnection, serializer api.Serializer, accountID int) (api.Application, error) {

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

	app, serializeErr := serializer.DeserializeApplication(row.Account.ID, row.Account.FormType, row.Account.FormVersion, row.Body)
	if serializeErr != nil {
		return api.Application{}, errors.Wrap(serializeErr, "Couldn't unmarshal the loaded Application")
	}

	return app, nil
}

// LoadApplication loads an application from the DB, it will return a NotFound error if it does not exist.
func (s SimpleStore) LoadApplication(accountID int) (api.Application, error) {
	return runLoadApplication(s.db, s.serializer, accountID)
}
