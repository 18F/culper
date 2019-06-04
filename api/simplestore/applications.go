package simplestore

import (
	"database/sql"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
)

func runCreateApplication(conn simpleConnection, serializer api.Serializer, app api.Application) error {
	serializedApp, serializeErr := serializer.SerializeApplication(app)
	if serializeErr != nil {
		return errors.Wrap(serializeErr, "Failed to serialize Application.")
	}

	saveQuery := "INSERT INTO applications (account_id, body) VALUES ($1, $2)"

	_, saveErr := conn.Exec(saveQuery, app.AccountID, serializedApp)
	if saveErr != nil {
		if saveErr.Error() == "pq: duplicate key value violates unique constraint \"applications_pkey\"" {
			return api.ErrApplicationAlreadyExists
		}
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

	app, loadErr := runLoadApplication(tx, s.serializer, accountID, true)
	if loadErr != nil {
		s.logger.WarnError("Unable to load the application before saving", loadErr, api.LogFields{"accountID": accountID})
		rollErr := tx.Rollback()
		if rollErr != nil {
			s.logger.WarnError("DB error trying to roll back the transaction", rollErr, api.LogFields{"accountID": accountID})
		}
		return loadErr
	}

	app.SetSection(section)

	updateErr := runUpdateApplication(tx, s.serializer, app)
	if updateErr != nil {
		rollErr := tx.Rollback()
		if rollErr != nil {
			s.logger.WarnError("DB error trying to roll back the transaction", rollErr, api.LogFields{"accountID": accountID})
		}
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
	Body      []byte `db:"body"`
}

type applicationAccountRow struct {
	applicationRow
	api.Account
}

func runLoadApplication(conn simpleConnection, serializer api.Serializer, accountID int, forUpdate bool) (api.Application, error) {

	selectQuery := `SELECT applications.account_id, applications.body,
					accounts.id, accounts.form_version, accounts.form_type
				FROM applications, accounts
				WHERE applications.account_id = accounts.id AND accounts.id = $1`

	// Adding FOR UPDATE to a select query acquires a row lock for the rest of the transaction
	// This row lock allows other selects to run *but* doesn't allow other SELECT FOR UPDATEs
	// to run. This ensures that our SaveSection calls continue to be atomic without blocking
	// concurrent LoadApplication calls.
	if forUpdate {
		selectQuery = selectQuery + " FOR UPDATE"
	}

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
	return runLoadApplication(s.db, s.serializer, accountID, false)
}

// DeleteApplication deletes an application from the database
func (s SimpleStore) DeleteApplication(accountID int) error {

	deleteQuery := "DELETE FROM applications WHERE account_id = $1"

	result, delErr := s.db.Exec(deleteQuery, accountID)
	if delErr != nil {
		return errors.Wrap(delErr, "Failed to delete Application")
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
