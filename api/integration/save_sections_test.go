package integration

import (
	"encoding/json"
	"fmt"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api/http"
)

func TestSaveSection(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	employmentSection := readTestData(t, "../testdata/history/history-employment-full.json")

	resp := saveJSON(services, employmentSection, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save Employment History", resp.StatusCode)
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
		Store:    services.store,
	}

	formHandler.ServeHTTP(w, r)

	formResp := w.Result()
	if formResp.StatusCode != 200 {
		t.Fatal("Failed to load Employment History", resp.StatusCode)
	}

	body := readBody(t, formResp)

	var form map[string]map[string]json.RawMessage
	err := json.Unmarshal([]byte(body), &form)
	if err != nil {
		t.Fatal(err)
	}

	rawEmployment, ok := form["History"]["Employment"]
	if !ok {
		t.Log("The employment history section is not in the returned form", form)
		t.Fail()
	}

	if !areEqualJSON(t, rawEmployment, []byte(employmentSection)) {
		fmt.Println("Not Equal", string(rawEmployment), employmentSection)
		t.Log("Didn't get the same thing back.")
		t.Fail()
	}

}
