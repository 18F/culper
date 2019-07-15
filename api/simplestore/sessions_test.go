package simplestore

import (
	"testing"
	"time"

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
	// confirm first expiration date

	secondSessionKey := uuid.New().String()
	secondExpirationDate := time.Now().Add(time.Duration(25 * time.Minute))
	secondCreateErr := store.CreateOrUpdateSession(secondSessionKey, account.ID, secondExpirationDate)
	if secondCreateErr != nil {
		t.Fatal(secondCreateErr)
	}
	// confirm record updated via second exp date
}

func TestFetchSession(t *testing.T) {
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
