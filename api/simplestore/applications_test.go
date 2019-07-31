package simplestore

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"os"
	"reflect"
	"testing"
	"time"

	"github.com/google/uuid"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/postgresql"
)

func getSimpleStore() SimpleStore {
	env := &env.Native{}
	os.Setenv(api.LogLevel, "info")
	env.Configure()

	log := &log.Service{Log: log.NewLogger()}

	dbConf := postgresql.DBConfig{
		User:     env.String(api.DatabaseUser),
		Password: env.String(api.DatabasePassword),
		Address:  env.String(api.DatabaseHost),
		DBName:   env.String(api.TestDatabaseName),
		SSLMode:  "disable",
	}

	connString := postgresql.PostgresConnectURI(dbConf)

	serializer := JSONSerializer{}

	store, storeErr := NewSimpleStore(connString, log, serializer)
	if storeErr != nil {
		fmt.Println("Unable to configure simple store", storeErr)
		os.Exit(1)
	}
	return store
}

// randomEmail an example.com email address with 10 random characters
func randomEmail() string {

	rand.Seed(time.Now().UTC().UnixNano())

	len := 10
	bytes := make([]byte, len)
	for i := 0; i < len; i++ {
		aint := int('a')
		zint := int('z')
		char := aint + rand.Intn(zint-aint)
		bytes[i] = byte(char)
	}

	email := string(bytes) + "@example.com"

	return email

}

func areEqualJSON(t *testing.T, s1, s2 []byte) bool {
	t.Helper()
	var o1 interface{}
	var o2 interface{}

	var err error
	err = json.Unmarshal(s1, &o1)
	if err != nil {
		t.Log("Unable to unmarshal tested JSON 1")
		t.Fail()
	}
	err = json.Unmarshal(s2, &o2)
	if err != nil {
		t.Log("Unable to unmarshal tested JSON 2")
		t.Fail()
	}

	return reflect.DeepEqual(o1, o2)
}

func createAccount(t *testing.T, store SimpleStore) api.Account {
	t.Helper()

	createQuery := `INSERT INTO accounts (username, email, status, form_type, form_version, external_id) VALUES ($1, $1, $2, $3, $4, $5) RETURNING id, username, email, form_type, form_version, external_id`

	email := randomEmail()

	result := api.Account{}

	externalID := uuid.New().String()

	createErr := store.db.Get(&result, createQuery, email, api.StatusIncomplete, "SF86", "2017-07", externalID)
	if createErr != nil {
		t.Log("Failed to create Account", createErr)
		t.Fatal()
	}

	return result
}

func TestSaveSection(t *testing.T) {

	store := getSimpleStore()
	account := CreateTestAccount(t, store)

	sectionFilename := "../testdata/identification/identification-name.json"

	rawSection, err := ioutil.ReadFile(sectionFilename)
	if err != nil {
		t.Fatal(err)
	}

	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	if err := payload.Unmarshal(rawSection); err != nil {
		t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", string(rawSection), err)
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		t.Fatalf("Failed to unpackage the payload for [%s]: %v", sectionFilename, err)
	}

	nameSection := entity.(*api.IdentificationName)

	accountID := account.ID

	newApplication := api.BlankApplication(account.ID, account.FormType, account.FormVersion)
	newApplication.SetSection(nameSection)

	createErr := store.CreateApplication(newApplication)
	if createErr != nil {
		t.Fatal(createErr)
	}

	createAgainErr := store.CreateApplication(newApplication)
	if createAgainErr != api.ErrApplicationAlreadyExists {
		t.Fatal("Should have gotten an already exists error", createAgainErr)
	}

	app, loadErr := store.LoadApplication(accountID)
	if loadErr != nil {
		t.Fatal(loadErr)
	}

	loadedSection := app.Section("identification.name")

	loadedPayload := loadedSection.Marshal()

	loadedJSON, encodeErr := json.Marshal(loadedPayload)
	if encodeErr != nil {
		t.Fatal(encodeErr)
	}

	equal := areEqualJSON(t, loadedJSON, rawSection)

	if !equal {
		t.Fatal("We didn't get the json plumb through", string(loadedJSON), string(rawSection))
	}

	nameSection.Name.First = "CHANGED"

	saveErr := store.SaveSection(nameSection, accountID)
	if saveErr != nil {
		t.Fatal(saveErr)
	}

	changedApp, loadErr := store.LoadApplication(accountID)
	if loadErr != nil {
		t.Fatal(loadErr)
	}
	changedName := changedApp.Section("identification.name").(*api.IdentificationName)

	if changedName.Name.First != "CHANGED" {
		t.Fatal("Didn't change the section, got: ", changedName.Name.First)
	}

}

func TestStoreErrors(t *testing.T) {

	store := getSimpleStore()
	account := CreateTestAccount(t, store)

	sectionFilename := "../testdata/identification/identification-name.json"

	rawSection, err := ioutil.ReadFile(sectionFilename)
	if err != nil {
		t.Fatal(err)
	}

	// Deserialize the initial payload from a JSON structure
	payload := &api.Payload{}
	if err := payload.Unmarshal(rawSection); err != nil {
		t.Fatalf("Failed to deserialize JSON: %v\n:Error: %v\n", string(rawSection), err)
	}

	// Extract the entity interface of the payload and validate it
	entity, err := payload.Entity()
	if err != nil {
		t.Fatalf("Failed to unpackage the payload for [%s]: %v", sectionFilename, err)
	}

	nameSection := entity.(*api.IdentificationName)

	newApplication := api.BlankApplication(account.ID, account.FormType, account.FormVersion)
	newApplication.SetSection(nameSection)

	createErr := store.CreateApplication(newApplication)
	if createErr != nil {
		t.Fatal(createErr)
	}

	createAgainErr := store.CreateApplication(newApplication)
	if createAgainErr == nil {
		t.Fatal("Should have gotten an error!")
	}

	_, loadErr := store.LoadApplication(-42)
	if loadErr != api.ErrApplicationDoesNotExist {
		t.Fatal("Should have gotten an ErrApplicationDoesNotExist")
	}

	newApplication.AccountID = -42
	updateErr := store.UpdateApplication(newApplication)
	if updateErr != api.ErrApplicationDoesNotExist {
		t.Fatal("should have got an ErrApplicationDoesNotExist")
	}

}
