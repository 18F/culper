package simplestore

import (
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/pkg/errors"
)

// CreateOrUpdateSession returns session key or error
func (s SimpleStore) CreateOrUpdateSession(sessionKey string, accountID int, expiration_date time.Time) error {
	createQuery := `INSERT INTO Sessions (session_key, account_id, expiration_date)
		VALUES ($1, $2, $3)
		ON CONFLICT (account_id) DO UPDATE
		SET session_key = $1, expiration_date = $3`

	_, createErr := s.db.Exec(createQuery, sessionKey, accountID, expiration_date)
	if createErr != nil {
		return errors.Wrap(createErr, "Failed to create Application")
	}

	return nil
}

// DeleteSession removes a session record from the db
func (s SimpleStore) DeleteSession(sessionKey string) error {
	return nil
}

type sessionRow struct {
	SessionKey     string    `db:"session_key"`
	AccountID      int       `db:"account_id"`
	ExpirationDate time.Time `db:"expiration_date"`
}

// FetchSessionAccount fetches an account and session data from the db
func (s SimpleStore) FetchSessionAccount(sessionKey string) (api.Account, error) {

	fetchQuery := `SELECT session_key, account_id, expiration_date FROM Sessions WHERE session_key = $1`
	row := sessionRow{}
	selectErr := s.db.Get(&row, fetchQuery, sessionKey)
	if selectErr != nil {
		return api.Account{}, errors.Wrap(selectErr, "Couldn't find Session")
	}

	return api.Account{}, nil
}
