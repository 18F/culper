package simplestore

import (
	"database/sql"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/pkg/errors"
)

// CreateAccount creates a new account
func (s SimpleStore) CreateAccount(account *api.Account) error {

	createQuery := `INSERT INTO accounts (username, email, status, form_type, form_version, external_id) 
							VALUES ($1, $2, $3, $4, $5, $6) 
							RETURNING id`

	var newID int

	createErr := s.db.Get(&newID, createQuery, account.Username, account.Email, account.Status, account.FormType, account.FormVersion, account.ExternalID)
	if createErr != nil {
		return errors.Wrap(createErr, "Failed to create Account")
	}

	account.ID = newID

	return nil
}

var selectProlouge = `SELECT id, username, email, status, form_type, form_version, external_id FROM accounts `

// FetchAccountByUsername returns an account with the given username
func (s SimpleStore) FetchAccountByUsername(username string) (api.Account, error) {

	selectQuery := selectProlouge + `WHERE username = $1`

	var account api.Account

	selectErr := s.db.Get(&account, selectQuery, username)
	if selectErr != nil {
		if selectErr == sql.ErrNoRows {
			return api.Account{}, api.ErrAccountDoesNotExist
		}
		return api.Account{}, errors.Wrap(selectErr, "Couldn't find Account")
	}

	return account, nil
}

//FetchAccountByExternalID fetches an account with the given external id
func (s SimpleStore) FetchAccountByExternalID(externalID string) (api.Account, error) {

	selectQuery := selectProlouge + `WHERE external_id = $1`

	var account api.Account

	selectErr := s.db.Get(&account, selectQuery, externalID)
	if selectErr != nil {
		if selectErr == sql.ErrNoRows {
			return api.Account{}, api.ErrAccountDoesNotExist
		}
		return api.Account{}, errors.Wrap(selectErr, "Couldn't find Account")
	}

	return account, nil
}

// UpdateAccountStatus updates the status of an account. That should be the only thing we update post creation.
func (s SimpleStore) UpdateAccountStatus(account *api.Account) error {

	updateQuery := `UPDATE accounts SET status = $1 WHERE id = $2`

	result, updateErr := s.db.Exec(updateQuery, account.Status, account.ID)
	if updateErr != nil {
		return errors.Wrap(updateErr, "Couldn't update Account")
	}

	rows, affectedErr := result.RowsAffected()
	if affectedErr != nil {
		return errors.Wrap(affectedErr, "Bizzarely unable to read affected rows")
	}

	if rows != 1 {
		return api.ErrAccountDoesNotExist
	}

	return nil
}
