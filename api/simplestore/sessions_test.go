package simplestore

import (
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/google/uuid"
)

func TestSessionOverwritesPreviousRecord(t *testing.T) {
	store := getSimpleStore()
	account := createAccount(t, store)
	firstSessionKey := uuid.New().String()
	firstExpirationDate := time.Now().Add(time.Duration(5 * time.Minute))

	firstCreateErr := store.CreateOrUpdateSession(firstSessionKey, account.ID, firstExpirationDate)
	if firstCreateErr != nil {
		t.Fatal(firstCreateErr)
	}

	firstFetchedAccount, fetchErr := store.FetchSessionAccount(firstSessionKey)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	secondSessionKey := uuid.New().String()
	secondExpirationDate := time.Now().Add(time.Duration(25 * time.Minute))
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
	store := getSimpleStore()
	account := createAccount(t, store)

	sKey := uuid.New().String()
	sExpiry := time.Now().Add(time.Duration(25 * time.Minute))
	createErr := store.CreateOrUpdateSession(sKey, account.ID, sExpiry)
	if createErr != nil {
		t.Fatal(createErr)
	}

	actualAccount, err := store.FetchSessionAccount(sKey)
	if err != nil {
		t.Fatal(err)
	}

	if actualAccount != account {
		t.Fatal("actual returned account does not match expected returned account")
	}
}

func TestFetchSessionReturnsErrorOnExpiredSession(t *testing.T) {
	store := getSimpleStore()
	account := createAccount(t, store)

	sKey := uuid.New().String()
	sExpiry := time.Now().Add(time.Duration(-5 * time.Minute))
	createErr := store.CreateOrUpdateSession(sKey, account.ID, sExpiry)
	if createErr != nil {
		t.Fatal(createErr)
	}

	_, err := store.FetchSessionAccount(sKey)
	if err != api.ErrValidSessionNotFound {
		t.Fatal(err)
	}
}
