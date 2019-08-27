package integration

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	gohttp "net/http"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestStatus(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	sections := []struct {
		path string
	}{
		{"../testdata/identification/identification-name.json"},
		{"../testdata/identification/identification-contacts.json"},
		{"../testdata/identification/identification-othernames.json"},
		{"../testdata/identification/identification-birthdate.json"},
		{"../testdata/identification/identification-birthplace-full.json"},
		{"../testdata/identification/identification-ssn.json"},
		{"../testdata/identification/identification-physical.json"},
	}

	// Create a bunch of sections so there is something to hash
	for _, section := range sections {
		body := readTestData(t, section.path)

		resp := saveJSON(services, body, account)
		if resp.StatusCode != 200 {
			t.Fatal(fmt.Sprintf("Failed to save %s", section.path), resp.StatusCode)
		}
	}

	w, req := standardResponseAndRequest("GET", "/me/status", nil, account)

	statusHandler := http.StatusHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	statusHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	var status struct {
		Locked bool
		Hash   string
	}

	jsonErr := json.Unmarshal(body, &status)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	if status.Locked != false {
		t.Log("The account should not be locked")
		t.Fail()
	}

	if status.Hash != "50b174251cce87a6d52f7049feb609034834b0084a8019974e2615a5e7ea9406" {
		t.Log("The hash has changed to " + status.Hash)
		t.Fail()
	}

	// If we save an additional section, the hash should change

	additionalSectionPath := "../testdata/financial/financial-bankruptcy.json"
	additionalSection := readTestData(t, additionalSectionPath)

	addSecResp := saveJSON(services, additionalSection, account)
	if addSecResp.StatusCode != 200 {
		t.Fatal(fmt.Sprintf("Failed to save %s", additionalSectionPath), addSecResp.StatusCode)
	}

	additionalW := httptest.NewRecorder()
	statusHandler.ServeHTTP(additionalW, req)

	additionalResp := additionalW.Result()

	if additionalResp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	additionalBody, readErr := ioutil.ReadAll(additionalResp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	jsonErr = json.Unmarshal(additionalBody, &status)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	if status.Locked != false {
		t.Log("The account should still not be locked")
		t.Fail()
	}

	if status.Hash == "eee1ded7714837bd7270a8b34455a1d2d7de792dfa1511b3fe4da6471d005b12" {
		t.Log("The hash should have changed.")
		t.Fail()
	}

}

type errorStatusStore struct {
	mock.StorageService
}

func (s errorStatusStore) LoadApplication(accountID int) (api.Application, error) {
	return api.Application{}, errors.New("unexpected error")
}

func TestStatusFetchError(t *testing.T) {
	var mockStore errorStatusStore
	services := cleanTestServices(t)
	account := createLockedTestAccount(t, services.db)

	w, req := standardResponseAndRequest("GET", "/me/status", nil, account)

	statusHandler := http.StatusHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    &mockStore,
	}

	statusHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, api.StatusError)

}

func TestLockedStatus(t *testing.T) {

	services := cleanTestServices(t)
	account := createLockedTestAccount(t, services.db)

	w, req := standardResponseAndRequest("GET", "/me/status", nil, account)

	statusHandler := http.StatusHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	statusHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	var status struct {
		Status string
		Hash   string
	}

	jsonErr := json.Unmarshal(body, &status)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	if status.Status != api.StatusSubmitted {
		t.Log("The account should be locked:", status.Status)
		t.Fail()
	}

	if status.Hash != "5320263745e203b513669ebf87bfd14210d6fd6b723fc88f14709cc81a39081b" {
		t.Log("The empty hash has changed.")
		t.Fail()
	}

}
