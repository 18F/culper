package simplestore

import (
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/google/uuid"
)

func getDateAndUUID() (string, time.Time) {
	return uuid.New().String(), time.Now().Add(time.Duration(5 * time.Minute))
}

func getTestObjects(t *testing.T) (ss SimpleStore, account api.Account, UUID string, date time.Time) {
	ss = getSimpleStore()
	account = createAccount(t, ss)
	UUID, date = getDateAndUUID()
	return
}

func TestCreateSessionOverwritesPreviousRecord(t *testing.T) {
	store, account, firstSessionKey, firstExpirationDate := getTestObjects(t)

	firstCreateErr := store.CreateOrUpdateSession(firstSessionKey, account.ID, firstExpirationDate)
	if firstCreateErr != nil {
		t.Fatal(firstCreateErr)
	}

	firstFetchedAccount, fetchErr := store.FetchSessionAccount(firstSessionKey)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	secondSessionKey, secondExpirationDate := getDateAndUUID()
	secondCreateErr := store.CreateOrUpdateSession(secondSessionKey, account.ID, secondExpirationDate)
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
		t.Fatal("using the first session key should cause an error to be thrown")
	}
}

func TestFetchSessionReturnAccountOnValidSession(t *testing.T) {
	store, account, sessionKey, expirationDate := getTestObjects(t)

	createErr := store.CreateOrUpdateSession(sessionKey, account.ID, expirationDate)
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

	createErr := store.CreateOrUpdateSession(sessionKey, account.ID, expirationDate)
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

	createErr := store.CreateOrUpdateSession(sessionKey, account.ID, expirationDate)
	if createErr != nil {
		t.Fatal(createErr)
	}

	// TODO: since operating on DB, use SQL verify record

	err := store.DeleteSession(sessionKey)
	if err != nil {
		t.Fatal("unable to delete session")
	}

	// TODO: since operating on DB, use SQL to verify no record

	t.Fatal("not implemented")
}

func TestDeleteSessionReturnsErrIfSessionNotFound(t *testing.T) {
	store := getSimpleStore()
	sessionKeyWithNoAssociatedRecord := uuid.New().String()

	err := store.DeleteSession(sessionKeyWithNoAssociatedRecord)
	if err != api.ErrValidSessionNotFound {
		t.Fatal("session should not exist")
	}
}
