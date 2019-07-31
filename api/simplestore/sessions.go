package simplestore

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/pkg/errors"
)

// CreateOrUpdateSession returns session key or error
func (s SimpleStore) CreateOrUpdateSession(accountID int, sessionKey string, sessionIndex sql.NullString, expirationDuration time.Duration) error {
	expirationDate := time.Now().UTC().Add(expirationDuration)

	createQuery := `INSERT INTO Sessions (session_key, account_id, session_index, expiration_date)
		VALUES ($1, $2, $3, $4)
		ON CONFLICT (account_id) DO UPDATE
		SET session_key = $1, session_index = $3, expiration_date = $4`

	_, createErr := s.db.Exec(createQuery, sessionKey, accountID, sessionIndex, expirationDate)
	if createErr != nil {
		return errors.Wrap(createErr, "Failed to create or update session")
	}

	return nil
}

// DeleteSession removes a session record from the db
func (s SimpleStore) DeleteSession(sessionKey string) error {
	deleteQuery := "DELETE FROM sessions WHERE session_key = $1"

	sqlResult, deleteErr := s.db.Exec(deleteQuery, sessionKey)
	if deleteErr != nil {
		return errors.Wrap(deleteErr, "Failed to delete session")
	}

	rowsAffected, _ := sqlResult.RowsAffected()
	if rowsAffected == 0 {
		return api.ErrValidSessionNotFound
	}

	return nil
}

// Helper methods for sql.NullString

// NonNullString returns a valid sql.NullString
func NonNullString(value string) sql.NullString {
	return sql.NullString{Valid: true, String: value}
}

// NullString returns an invalid sql.NullString
func NullString() sql.NullString {
	return sql.NullString{}
}

type sessionAccountRow struct {
	api.Session
	api.Account
}

// ExtendAndFetchSessionAccount fetches an account and session data from the db
// On success it returns the account and the session
// On failure, it can return ErrValidSessionNotFound, ErrSessionExpired, or an unexpected error
func (s SimpleStore) ExtendAndFetchSessionAccount(sessionKey string, expirationDuration time.Duration) (api.Account, api.Session, error) {

	expirationDate := time.Now().UTC().Add(expirationDuration)

	// We update the session expiration date to be $DURATION from now and fetch the account and the session.
	fetchQuery := `UPDATE sessions
					SET expiration_date = $1
				FROM accounts
				WHERE
					sessions.account_id = accounts.id
					AND sessions.session_key = $2
					AND sessions.expiration_date > $3
				RETURNING
					sessions.session_key, sessions.account_id, sessions.expiration_date, sessions.session_index,
					accounts.id, accounts.form_version, accounts.form_type, accounts.username,
					accounts.email, accounts.external_id`

	row := sessionAccountRow{}
	selectErr := s.db.Get(&row, fetchQuery, expirationDate, sessionKey, time.Now().UTC())
	if selectErr != nil {
		if selectErr != sql.ErrNoRows {
			return api.Account{}, api.Session{}, errors.Wrap(selectErr, "Unexpected error looking for valid session")
		}

		// If the above query returns no rows, either the session is expired, or it does not exist.
		// To determine which and return an appropriate error, we do a second query to see if it exists
		existsQuery := `SELECT sessions.* FROM sessions, accounts WHERE sessions.account_id = accounts.id AND sessions.session_key = $1`

		session := api.Session{}
		selectAgainErr := s.db.Get(&session, existsQuery, sessionKey)
		if selectAgainErr != nil {
			if selectAgainErr == sql.ErrNoRows {
				return api.Account{}, api.Session{}, api.ErrValidSessionNotFound
			}
			return api.Account{}, api.Session{}, errors.Wrap(selectAgainErr, "Unexpected error fetching single invalid session")
		}

		// quick sanity check:
		if session.ExpirationDate.After(time.Now()) {
			errors.New(fmt.Sprintf("For some reason, this session we could not find was not actually expired: %s", session.SessionKey))
		}
		// The session must have been expired, not deleted.
		return api.Account{}, api.Session{}, api.ErrSessionExpired
	}

	// time.Times come back from the db with no tz info, so let's set it to UTC to be safe and consistent.
	row.Session.ExpirationDate = row.Session.ExpirationDate.UTC()

	return row.Account, row.Session, nil
}
