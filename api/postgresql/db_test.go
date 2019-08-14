package postgresql

import (
	"database/sql"
	"testing"

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
		Email:       sql.NullString{"buzz1@example.com", true},
		FormType:    "SF86",
		FormVersion: "2017-07",
		Status:      api.StatusIncomplete,
		ExternalID:  "ccc21c9d-20c4-47fa-83ed-2f1bd26fac7d",
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

	// modify and save again to trigger the Update behavior
	account.Email = sql.NullString{"buzz2@example.com", true}

	_, saveAgainErr := account.Save(service, -1)
	if saveAgainErr != nil {
		t.Fatal(saveAgainErr)
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
