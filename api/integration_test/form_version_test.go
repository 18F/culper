package integration_test

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/mock"
	"github.com/18F/e-QIP-prototype/api/postgresql"
)

type serviceSet struct {
	env api.Settings
	log api.LogService
	// token    api.TokenService
	db api.DatabaseService
}

func cleanTestServices() serviceSet {
	env := &mock.Native{}
	os.Setenv(api.LogLevel, "info")
	env.Configure()

	log := &log.Service{Log: log.NewLogger()}

	db := &postgresql.Service{
		Log: log,
		Env: env,
	}

	db.Configure()

	return serviceSet{
		env,
		log,
		db,
	}
}

func TestFormVersionReturned(t *testing.T) {

	services := cleanTestServices()

	// create/find test account (wow this should be in its own db)
	account := api.Account{
		Username:  "buzz1@example.com",
		Email:     "buzz1@example.com",
		SFType:    "SF86",
		SFVersion: "2016-11",
	}

	_, err := account.Get(services.db, -1)
	if err != nil {
		if err.Error() == "pg: no rows in result set" {
			_, err := account.Save(services.db, -1)
			if err != nil {
				t.Fatal(err)
			}
		} else {
			t.Fatal(err)
		}
	}

	// create request/response
	r := httptest.NewRequest("GET", "/me/form", nil)
	// authenticate user.
	authCtx := http.SetAccountIDInRequestContext(r, account.ID)
	r = r.WithContext(authCtx)

	w := httptest.NewRecorder()

	formHandler := http.FormHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
	}

	formHandler.ServeHTTP(w, r)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Log(fmt.Sprintf("Status should have been 200: %d", resp.StatusCode))
		t.Fail()
	}

	parsedBody := struct {
		Metadata struct {
			Type        string `json:"type"`
			FormType    string `json:"form_type"`
			FormVersion string `json:"form_version"`
		}
	}{}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatal("Couldn't read", err)
	}

	err = json.Unmarshal(body, &parsedBody)
	if err != nil {
		t.Fatal("Couldn't unmarhsal", err)
	}

	if parsedBody.Metadata.Type != "metadata" ||
		parsedBody.Metadata.FormType != account.SFType ||
		parsedBody.Metadata.FormVersion != account.SFVersion {
		t.Fatal("Expected ", "metadata", account.SFType, account.SFVersion,
			" GOT: ", parsedBody.Metadata.Type, parsedBody.Metadata.FormType, parsedBody.Metadata.FormVersion)
	}

	fmt.Println(parsedBody)

}

func TestFormVersionSave(t *testing.T) {

	services := cleanTestServices()

	// create/find test account (wow this should be in its own db)
	account := api.Account{
		Username:  "buzz1@example.com",
		Email:     "buzz1@example.com",
		SFType:    "SF86",
		SFVersion: "2016-11",
	}

	_, err := account.Get(services.db, -1)
	if err != nil {
		if err.Error() == "pg: no rows in result set" {
			_, err := account.Save(services.db, -1)
			if err != nil {
				t.Fatal(err)
			}
		} else {
			t.Fatal(err)
		}
	}

	fmt.Println("Account ID", account.ID)

	metadataBody := `
{
	"type": "metadata",
	"form_type": "SF86",
	"form_version": "2016-11"
}`

	// create request/response
	r := httptest.NewRequest("POST", "/me/save", strings.NewReader(metadataBody))
	// authenticate user.
	authCtx := http.SetAccountIDInRequestContext(r, account.ID)
	r = r.WithContext(authCtx)

	w := httptest.NewRecorder()

	saveHandler := http.SaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
	}

	saveHandler.ServeHTTP(w, r)

	resp := w.Result()

	if resp.StatusCode != 400 {
		t.Log(fmt.Sprintf("Status should have been 400: %d", resp.StatusCode))
		t.Fail()
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatal("Couldn't read", err)
	}

	parsedBody := struct {
		Errors []struct {
			Message string `json:"message"`
		} `json:"errors"`
	}{}

	err = json.Unmarshal(body, &parsedBody)
	if err != nil {
		t.Fatal("Couldn't unmarhsal", err)
	}

	if len(parsedBody.Errors) != 1 {
		t.Fatal("There should have been one error.", string(body))
	}

	bodyErr := parsedBody.Errors[0]

	if bodyErr.Message != "Error converting payload into valid entity" {
		t.Fatal("We got the wrong error message: ", bodyErr.Message)
	}
}
