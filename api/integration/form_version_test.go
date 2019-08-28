package integration

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/18F/e-QIP-prototype/api/http"
)

func TestFormVersionReturned(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	w, r := standardResponseAndRequest("GET", "/me/form", nil, account)

	formHandler := http.FormHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
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
		parsedBody.Metadata.FormType != account.FormType ||
		parsedBody.Metadata.FormVersion != account.FormVersion {
		t.Fatal("Expected ", "metadata", account.FormType, account.FormVersion,
			" GOT: ", parsedBody.Metadata.Type, parsedBody.Metadata.FormType, parsedBody.Metadata.FormVersion)
	}

	fmt.Println(parsedBody)

}

func TestFormVersionSave(t *testing.T) {
	// The client cannot set the form version via the API, this test confirms it's an error.

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	fmt.Println("Account ID", account.ID)

	metadataBody := `
{
	"type": "metadata",
	"form_type": "SF86",
	"form_version": "2017-07"
}`

	resp := saveJSON(services, []byte(metadataBody), account)

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
