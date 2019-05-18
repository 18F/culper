package integration

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api/http"
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

		resp := saveJSON(services, body, account.ID)
		if resp.StatusCode != 200 {
			t.Fatal(fmt.Sprintf("Failed to save %s", section.path), resp.StatusCode)
		}
	}

	req := httptest.NewRequest("GET", "/me/status/", nil)

	authCtx := http.SetAccountIDInRequestContext(req, account.ID)
	req = req.WithContext(authCtx)

	w := httptest.NewRecorder()

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

	if status.Hash != "eee1ded7714837bd7270a8b34455a1d2d7de792dfa1511b3fe4da6471d005b12" {
		t.Log("The hash has changed.")
		t.Fail()
	}

	// If we save an additional section, the hash should change

	additionalSectionPath := "../testdata/financial-bankruptcy.json"
	additionalSection := readTestData(t, additionalSectionPath)

	addSecResp := saveJSON(services, additionalSection, account.ID)
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

func TestLockedStatus(t *testing.T) {

	services := cleanTestServices(t)
	account := createLockedTestAccount(t, services.db)

	req := httptest.NewRequest("GET", "/me/status/", nil)

	authCtx := http.SetAccountIDInRequestContext(req, account.ID)
	req = req.WithContext(authCtx)

	w := httptest.NewRecorder()

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

	if status.Locked != true {
		t.Log("The account should not be locked")
		t.Fail()
	}

	if status.Hash != "5320263745e203b513669ebf87bfd14210d6fd6b723fc88f14709cc81a39081b" {
		t.Log("The empty hash has changed.")
		t.Fail()
	}

}
