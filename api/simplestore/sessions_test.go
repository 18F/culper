package simplestore

import (
	"database/sql"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/google/uuid"
)

func getDateAndUUID() (time.Time, string) {
	return time.Now().Add(time.Duration(5 * time.Minute)), uuid.New().String()
}

func getTestObjects(t *testing.T) (SimpleStore, api.Account, string, time.Time) {
	ss := getSimpleStore()
	account := createAccount(t, ss)
	date, UUID := getDateAndUUID()
	return ss, account, UUID, date
}

func TestCreateSessionOverwritesPreviousRecord(t *testing.T) {
	store, account, firstSessionKey, firstExpirationDate := getTestObjects(t)

	firstCreateErr := store.CreateOrUpdateSession(account.ID, firstSessionKey, firstExpirationDate)
	if firstCreateErr != nil {
		t.Fatal(firstCreateErr)
	}

	firstFetchedAccount, fetchErr := store.FetchSessionAccount(firstSessionKey)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	secondExpirationDate, secondSessionKey := getDateAndUUID()
	secondCreateErr := store.CreateOrUpdateSession(account.ID, secondSessionKey, secondExpirationDate)
	if secondCreateErr != nil {
		t.Fatal(secondCreateErr)
	}

	secondFetchedAccount, fetchErr := store.FetchSessionAccount(secondSessionKey)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if firstFetchedAccount != secondFetchedAccount {
		t.Fatal("both fetches should return the same account")
	}

	_, expectedFetchErr := store.FetchSessionAccount(firstSessionKey)
	if expectedFetchErr != api.ErrValidSessionNotFound {
		t.Fatal("using the first session key should cause an error to be thrown, since it has been overwritten")
	}
}

func TestFetchSessionReturnsAccountOnValidSession(t *testing.T) {
	store, account, sessionKey, expirationDate := getTestObjects(t)

	createErr := store.CreateOrUpdateSession(account.ID, sessionKey, expirationDate)
	if createErr != nil {
		t.Fatal(createErr)
	}

	actualAccount, err := store.FetchSessionAccount(sessionKey)
	if err != nil {
		t.Fatal(err)
	}

	if actualAccount != account {
		t.Fatal("actual returned account does not match expected returned account")
	}
}

func TestFetchSessionReturnsErrorOnExpiredSession(t *testing.T) {
	store, account, sessionKey, expirationDate := getTestObjects(t)
	expirationDate = expirationDate.Add(-10 * time.Minute)

	createErr := store.CreateOrUpdateSession(account.ID, sessionKey, expirationDate)
	if createErr != nil {
		t.Fatal(createErr)
	}

	_, err := store.FetchSessionAccount(sessionKey)
	if err != api.ErrValidSessionNotFound {
		t.Fatal(err)
	}
}

func TestDeleteSessionRemovesRecord(t *testing.T) {
	store, account, sessionKey, expirationDate := getTestObjects(t)
	store.CreateOrUpdateSession(account.ID, sessionKey, expirationDate)

	fetchQuery := `SELECT * FROM sessions WHERE session_key = $1`
	row := SessionRow{}
	store.db.Get(&row, fetchQuery, sessionKey)
	if row.SessionKey != sessionKey {
		t.Fatal("new session should have been created")
	}

	err := store.DeleteSession(sessionKey)
	if err != nil {
		t.Fatal("encountered issue when trinyg to delete session")
	}

	row = SessionRow{}
	expectedErr := store.db.Get(&row, fetchQuery, sessionKey)
	if expectedErr != sql.ErrNoRows {
		t.Fatal("session should not exist")
	}
}

func TestDeleteSessionReturnsErrIfSessionNotFound(t *testing.T) {
	store := getSimpleStore()
	sessionKeyWithNoAssociatedRecord := uuid.New().String()

	err := store.DeleteSession(sessionKeyWithNoAssociatedRecord)
	if err != api.ErrValidSessionNotFound {
		t.Fatal("session should not exist")
	}
}
