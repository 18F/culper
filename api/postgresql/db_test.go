package postgresql

import (
	"testing"

	"github.com/google/uuid"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestAccountPersistence(t *testing.T) {
	settings := env.Native{}
	settings.Configure()

	logger := &mock.LogService{Off: true}

	dbConf := DBConfig{
		User:     settings.String(api.DatabaseUser),
		Password: settings.String(api.DatabasePassword),
		Address:  settings.String(api.DatabaseHost),
		DBName:   settings.String(api.TestDatabaseName),
		SSLMode:  settings.String(api.DatabaseSSLMode),
	}

	service := NewPostgresService(dbConf, logger)

	api.Geocode = mock.Geocoder{}

	account := api.Account{
		Username:    "buzz1@example.com",
		Email:       "buzz1@example.com",
		FormType:    "SF86",
		FormVersion: "2016-11",
		ExternalID:  uuid.New().String(),
	}

	_, err := account.Get(service, -1)
	if err != nil {
		if api.IsDatabaseErrorNotFound(err) {
			_, err := account.Save(service, -1)
			if err != nil {
				t.Fatal(err)
			}
		} else {
			t.Fatal(err)
		}
	}

	fetchedAccount := api.Account{
		ID: account.ID,
	}

	_, getErr := fetchedAccount.Get(service, account.ID)
	if getErr != nil {
		t.Fatal(getErr)
	}

	if fetchedAccount.Username != account.Username {
		t.Log("Should have gotten matching Usernames", fetchedAccount.Username, account.Username)
		t.Fail()
	}

	if fetchedAccount.Email != account.Email {
		t.Log("Should have gotten matching Emails", fetchedAccount.Email, account.Email)
		t.Fail()
	}

	if fetchedAccount.FormType != account.FormType {
		t.Log("Should have gotten matching FormTypes", fetchedAccount.FormType, account.FormType)
		t.Fail()
	}

	if fetchedAccount.FormVersion != account.FormVersion {
		t.Log("Should have gotten matching FormVersions", fetchedAccount.FormVersion, account.FormVersion)
		t.Fail()
	}

	if fetchedAccount.ExternalID != account.ExternalID {
		t.Log("Should have gotten matching ExternalIDs", fetchedAccount.ExternalID, account.ExternalID)
		t.Fail()
	}

}
