package simplestore

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/pkg/errors"
)

// CreateAccount creates a new account
func (s SimpleStore) CreateAccount(account *api.Account) error {

	validErr := account.CheckIsValid()
	if validErr != nil {
		return errors.Wrap(validErr, "failed to create invalid Account")
	}

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

var accountFields = []string{"id", "username", "email", "status", "form_type", "form_version", "external_id"}

// FetchAccountByUsername returns an account with the given username
func (s SimpleStore) FetchAccountByUsername(username string) (api.Account, error) {

	selectQuery := fmt.Sprintf(`SELECT %s FROM accounts WHERE username = $1`, strings.Join(accountFields, ","))

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

	selectQuery := fmt.Sprintf(`SELECT %s FROM accounts WHERE external_id = $1`, strings.Join(accountFields, ","))

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

// FetchAccountWithPasswordHash returns an account with the PasswordHash field filled out
// it raises an error if the given account has no password
func (s SimpleStore) FetchAccountWithPasswordHash(username string) (api.Account, error) {

	var prefixedFields []string
	for _, field := range accountFields {
		prefixedFields = append(prefixedFields, "accounts."+field)
	}

	selectQuery := fmt.Sprintf(`SELECT %s, basic_auth_memberships.password_hash 
										FROM accounts LEFT JOIN basic_auth_memberships 
										ON accounts.id = basic_auth_memberships.account_id
										WHERE accounts.username = $1`, strings.Join(prefixedFields, ","))

	var account api.Account

	selectErr := s.db.Get(&account, selectQuery, username)
	if selectErr != nil {
		if selectErr == sql.ErrNoRows {
			return api.Account{}, api.ErrAccountDoesNotExist
		}
		return api.Account{}, errors.Wrap(selectErr, "Couldn't find Account")
	}

	if !account.PasswordHash.Valid {
		return api.Account{}, api.ErrAccountHasNoPassword
	}

	return account, nil
}

// SetAccountPasswordHash sets the password hash for an account
func (s SimpleStore) SetAccountPasswordHash(account api.Account) error {

	// delete an existing one, if it exists
	deleteQuery := `DELETE FROM basic_auth_memberships WHERE account_id = $1`
	_, delErr := s.db.Exec(deleteQuery, account.ID)
	if delErr != nil {
		return errors.Wrap(delErr, "failed to delete old passwords")
	}

	// create a new one.
	insertQuery := `INSERT INTO basic_auth_memberships (account_id, password_hash, created) VALUES ($1, $2, $3)`

	_, insertErr := s.db.Exec(insertQuery, account.ID, account.PasswordHash, time.Now().UTC())
	if insertErr != nil {
		return errors.Wrap(insertErr, "Failed to create a new password")
	}

	return nil
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

// These functions are used by commands, and so are *not* part of the StorageService interface

// ListAccounts returns a list of all accounts. This is only used by Commands
func (s SimpleStore) ListAccounts() ([]api.Account, error) {

	fetchQuery := `SELECT * from accounts`

	var accounts []api.Account

	fetchErr := s.db.Select(&accounts, fetchQuery)
	if fetchErr != nil {
		return []api.Account{}, errors.Wrap(fetchErr, "Couldn't list Accounts")
	}

	return accounts, nil
}

// UpdateAccountInfo updates the FormType and FormVersion for an account
func (s SimpleStore) UpdateAccountInfo(account *api.Account) error {

	updateQuery := `UPDATE accounts SET form_type = $1, form_version = $2 WHERE id = $3`

	result, updateErr := s.db.Exec(updateQuery, account.FormType, account.FormVersion, account.ID)
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
