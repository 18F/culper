package simplestore

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"reflect"
	"testing"
	"time"

	"github.com/google/uuid"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/log"
)

func getSimpleStore() SimpleStore {
	env := &env.Native{}
	os.Setenv(api.LogLevel, "info")
	env.Configure()

	log := &log.Service{Log: log.NewLogger()}

	dbConf := DBConfig{
		User:     env.String(api.DatabaseUser),
		Password: env.String(api.DatabasePassword),
		Address:  env.String(api.DatabaseHost),
		DBName:   env.String(api.TestDatabaseName),
		SSLMode:  "disable",
	}

	connString := PostgresConnectURI(dbConf)

	serializer := JSONSerializer{}

	store, storeErr := NewSimpleStore(connString, log, serializer)
	if storeErr != nil {
		fmt.Println("Unable to configure simple store", storeErr)
		os.Exit(1)
	}
	return store
}

func getErrorStore() SimpleStore {
	env := &env.Native{}
	os.Setenv(api.LogLevel, "info")
	env.Configure()

	logger := &log.Service{Log: log.NewLogger()}

	serializer := JSONSerializer{}

	db := &errorDB{}

	store := SimpleStore{
		db,
		serializer,
		logger,
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

// createTestAccount is exported for now because there is no simplestore way
// of creating an account yet. Once the db stuff is ripped out I bet we can un-export this again
func createTestAccount(t *testing.T, store SimpleStore) api.Account {
	t.Helper()

	email := randomEmail()
	externalID := uuid.New().String()

	account := api.Account{
		Username:    email,
		Email:       api.NonNullString(email),
		Status:      api.StatusIncomplete,
		FormType:    "SF86",
		FormVersion: "2017-07",
		ExternalID:  externalID,
	}

	createErr := store.CreateAccount(&account)
	if createErr != nil {
		t.Log("Failed to create Account", createErr)
		t.Fatal()
	}

	return account
}
