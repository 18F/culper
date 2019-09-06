package simplestore

import (
	"database/sql"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/pkg/errors"
)

func TestFetchAccountEmail(t *testing.T) {

	store := getSimpleStore()
	defer store.Close()

	newAccount := CreateTestAccount(t, store)

	if newAccount.ID <= 0 {
		t.Fatal("didn't get a valid ID")
	}

	// Can we fetch the same newAccount?
	fetchedAccount, fetchErr := store.FetchAccountByUsername(newAccount.Username)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if newAccount.Username != fetchedAccount.Username {
		t.Log("Should have got back the same Username")
		t.Fail()
	}

	if newAccount.ID != fetchedAccount.ID {
		t.Log("Should have got back the same ID")
		t.Fail()
	}

	if newAccount.Email != fetchedAccount.Email {
		t.Log("Should have got back the same Email")
		t.Fail()
	}

	if newAccount.ExternalID != fetchedAccount.ExternalID {
		t.Log("Should have got back the same ExternalID")
		t.Fail()
	}

	if newAccount.FormVersion != fetchedAccount.FormVersion {
		t.Log("Should have got back the same FormVersion")
		t.Fail()
	}

	if newAccount.FormType != fetchedAccount.FormType {
		t.Log("Should have got back the same FormType")
		t.Fail()
	}

	if newAccount.Status != fetchedAccount.Status {
		t.Log("Should have got back the same Status")
		t.Fail()
	}

}

func TestFetchAccountExternalID(t *testing.T) {

	store := getSimpleStore()
	defer store.Close()

	newAccount := CreateTestAccount(t, store)

	if newAccount.ID <= 0 {
		t.Fatal("didn't get a valid ID")
	}

	// Can we fetch the same newAccount?
	fetchedAccount, fetchErr := store.FetchAccountByExternalID(newAccount.ExternalID)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if newAccount.Username != fetchedAccount.Username {
		t.Log("Should have got back the same Username")
		t.Fail()
	}

	if newAccount.ID != fetchedAccount.ID {
		t.Log("Should have got back the same ID")
		t.Fail()
	}

	if newAccount.Email != fetchedAccount.Email {
		t.Log("Should have got back the same Email")
		t.Fail()
	}

	if newAccount.ExternalID != fetchedAccount.ExternalID {
		t.Log("Should have got back the same ExternalID")
		t.Fail()
	}

	if newAccount.FormVersion != fetchedAccount.FormVersion {
		t.Log("Should have got back the same FormVersion")
		t.Fail()
	}

	if newAccount.FormType != fetchedAccount.FormType {
		t.Log("Should have got back the same FormType")
		t.Fail()
	}

	if newAccount.Status != fetchedAccount.Status {
		t.Log("Should have got back the same Status")
		t.Fail()
	}

}

func TestUpdateAccountStatus(t *testing.T) {

	store := getSimpleStore()
	defer store.Close()

	newAccount := CreateTestAccount(t, store)

	success := newAccount.Submit()
	if !success {
		t.Fatal("Should have been able to submit from starting.")
	}

	updateErr := store.UpdateAccountStatus(&newAccount)
	if updateErr != nil {
		t.Fatal(updateErr)
	}

	// Can we fetch the same newAccount?
	fetchedAccount, fetchErr := store.FetchAccountByUsername(newAccount.Username)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if fetchedAccount.Status != api.StatusSubmitted {
		t.Log("Should have got back the new Status")
		t.Fail()
	}

}

func TestCreateErr(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	newAccount := api.Account{
		Username: "joe",
	}

	// There is a unique constraint on username, so we can trigger an error there.
	createErr := store.CreateAccount(&newAccount)
	if createErr == nil {
		// try again in case this is the first time this has been run on this db
		createErr = store.CreateAccount(&newAccount)
		if createErr == nil {
			t.Fatal("Should have errored creating an incomplete account.")
		}
	}

}

func TestFetchUnknownError(t *testing.T) {
	store := getErrorStore()

	_, fetchErr := store.FetchAccountByUsername("foo")
	if fetchErr == nil && fetchErr != api.ErrAccountDoesNotExist {
		t.Fatal("Should have gotten an unknown error")
	}

	_, fetchErr = store.FetchAccountByExternalID("foo")
	if fetchErr == nil && fetchErr != api.ErrAccountDoesNotExist {
		t.Fatal("Should have gotten an unknown error")
	}
}

func TestDoesntExist(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	// Can we fetch the same newAccount?
	_, fetchErr := store.FetchAccountByUsername("NONSENSE")
	if fetchErr != api.ErrAccountDoesNotExist {
		t.Fatal(fetchErr)
	}

	_, fetchErr = store.FetchAccountByExternalID("NONSENSE")
	if fetchErr != api.ErrAccountDoesNotExist {
		t.Fatal(fetchErr)
	}

	account := api.Account{
		ID:       -9000,
		Username: "NONSENSE",
	}

	updateErr := store.UpdateAccountStatus(&account)
	if updateErr != api.ErrAccountDoesNotExist {
		t.Fatal(updateErr)
	}
}

type badResult struct {
}

func (r badResult) LastInsertId() (int64, error) {
	return 0, errors.New("BAD RESULT")
}

func (r badResult) RowsAffected() (int64, error) {
	return 0, errors.New("BAD RESULT")
}

type badResultDB struct {
	errorDB
}

func (db *badResultDB) Exec(query string, args ...interface{}) (sql.Result, error) {
	return badResult{}, nil
}

func TestUpdateErrors(t *testing.T) {
	store := getErrorStore()

	updateErr := store.UpdateAccountStatus(&api.Account{})
	if updateErr == nil {
		t.Fatal("Should have gotten an error")
	}

	store.db = &badResultDB{}

	badResultErr := store.UpdateAccountStatus(&api.Account{})
	if badResultErr == nil || badResultErr == updateErr {
		t.Fatal("Should have gotten a different error. ")
	}

}
