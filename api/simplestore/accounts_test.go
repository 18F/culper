package simplestore

import (
	"database/sql"
	"fmt"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/pkg/errors"
)

func TestFetchAccountEmail(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	newAccount := createTestAccount(t, store)

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

func TestFetchAccountWithPassword(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	// Can we fetch the same newAccount?
	fetchedAccount, fetchErr := store.FetchAccountWithPasswordHash("test01")
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if !fetchedAccount.PasswordHash.Valid {
		t.Fatal("Invalid password hash!")
	}

	fmt.Println(fetchedAccount.PasswordHash.String)
}

func TestAccountPasswordHash(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	account := createTestAccount(t, store)

	firstPasswordHash := "deadbeef"
	account.PasswordHash = api.NonNullString(firstPasswordHash)

	setErr := store.SetAccountPasswordHash(account)
	if setErr != nil {
		t.Fatal(setErr)
	}

	// Can we fetch the same account?
	fetchedAccount, fetchErr := store.FetchAccountWithPasswordHash(account.Username)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if !fetchedAccount.PasswordHash.Valid {
		t.Fatal("Invalid password hash!")
	}

	if fetchedAccount.PasswordHash.String != firstPasswordHash {
		t.Fatal("wrong password hash", fetchedAccount.PasswordHash.String)
	}

	secondPasswordHash := "beefbaby"
	account.PasswordHash = api.NonNullString(secondPasswordHash)

	setAgainErr := store.SetAccountPasswordHash(account)
	if setAgainErr != nil {
		t.Fatal(setAgainErr)
	}

	// Can we fetch the same account?
	fetchedAgainAccount, fetchAgainErr := store.FetchAccountWithPasswordHash(account.Username)
	if fetchAgainErr != nil {
		t.Fatal(fetchAgainErr)
	}

	if !fetchedAgainAccount.PasswordHash.Valid {
		t.Fatal("Invalid password hash!")
	}

	if fetchedAgainAccount.PasswordHash.String != secondPasswordHash {
		t.Fatal("wrong password hash", fetchedAgainAccount.PasswordHash.String)
	}

}

func TestFetchAccountExternalID(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	newAccount := createTestAccount(t, store)

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

func TestFetchNoPassword(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	newAccount := createTestAccount(t, store)

	if newAccount.ID <= 0 {
		t.Fatal("didn't get a valid ID")
	}

	// Can we fetch the same newAccount?
	_, fetchErr := store.FetchAccountWithPasswordHash(newAccount.Username)
	if fetchErr != api.ErrAccountHasNoPassword {
		t.Fatal(fetchErr)
	}
}

func TestUpdateAccountStatus(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	newAccount := createTestAccount(t, store)

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

func TestUpdateAccountInfo(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	newAccount := createTestAccount(t, store)

	newAccount.FormType = "SF85"
	newAccount.FormVersion = "2017-12-draft7"

	updateErr := store.UpdateAccountInfo(&newAccount)
	if updateErr != nil {
		t.Fatal(updateErr)
	}

	// Can we fetch the same newAccount?
	fetchedAccount, fetchErr := store.FetchAccountByUsername(newAccount.Username)
	if fetchErr != nil {
		t.Fatal(fetchErr)
	}

	if fetchedAccount.FormType != "SF85" {
		t.Log("Should have got back the new FormType")
		t.Fail()
	}

	if fetchedAccount.FormVersion != "2017-12-draft7" {
		t.Log("Should have got back the new FormVersion")
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

	_, fetchErr = store.FetchAccountWithPasswordHash("foo")
	if fetchErr == nil && fetchErr != api.ErrAccountDoesNotExist {
		t.Fatal("Should have gotten an unknown error")
	}

	_, fetchErr = store.ListAccounts()
	if fetchErr == nil {
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

	_, fetchErr = store.FetchAccountWithPasswordHash("NONSENSE")
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

	updateErr = store.UpdateAccountInfo(&account)
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

	updateStatusErr := store.UpdateAccountStatus(&api.Account{})
	if updateStatusErr == nil {
		t.Fatal("Should have gotten an error")
	}

	updateInfoErr := store.UpdateAccountInfo(&api.Account{})
	if updateInfoErr == nil {
		t.Fatal("Should have gotten an error")
	}

	store.db = &badResultDB{}

	badResultErr := store.UpdateAccountStatus(&api.Account{})
	if badResultErr == nil || badResultErr == updateStatusErr {
		t.Fatal("Should have gotten a different error. ")
	}

	badResultErr = store.UpdateAccountInfo(&api.Account{})
	if badResultErr == nil || badResultErr == updateInfoErr {
		t.Fatal("Should have gotten a different error. ")
	}

}

type goodDelDB struct {
	errorDB
}

func (db *goodDelDB) Exec(query string, args ...interface{}) (sql.Result, error) {
	if strings.HasPrefix(query, "DELETE") {
		return nil, nil
	}
	return db.errorDB.Exec(query, args...)
}
func TestPasswordErrors(t *testing.T) {
	store := getErrorStore()

	delErr := store.SetAccountPasswordHash(api.Account{})
	if delErr == nil {
		t.Fatal("Should have gotten an error")
	}

	store.db = &goodDelDB{}

	insertErr := store.SetAccountPasswordHash(api.Account{})
	if insertErr == nil || insertErr == delErr {
		t.Fatal("Should have gotten a different error")
	}

}

func TestListAccounts(t *testing.T) {
	store := getSimpleStore()
	defer store.Close()

	accountOne := createTestAccount(t, store)
	accountTwo := createTestAccount(t, store)

	byAllAccounts, listErr := store.ListAccounts()
	if listErr != nil {
		t.Fatal(listErr)
	}

	foundAccount1 := false
	foundAccount2 := false

	for _, account := range byAllAccounts {
		if account == accountOne {
			foundAccount1 = true
		}

		if account == accountTwo {
			foundAccount2 = true
		}
	}

	if !(foundAccount1 && foundAccount2) {
		t.Fatal("didn't get back both accounts")
	}
}
