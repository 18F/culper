package integration

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api/http"
)

func TestFormVersionReturned(t *testing.T) {

	services := cleanTestServices()

	account, err := createTestAccount(services.db)
	if err != nil {
		t.Fatal("bad account", err)
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

	account, err := createTestAccount(services.db)
	if err != nil {
		t.Fatal("bad account", err)
	}

	fmt.Println("Account ID", account.ID)

	metadataBody := `
{
	"type": "metadata",
	"form_type": "SF86",
	"form_version": "2016-11"
}`

	resp := saveJSON(services, metadataBody, account.ID)

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
