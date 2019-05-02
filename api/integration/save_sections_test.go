package integration

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestSaveSection(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	employmentSection := readTestData(t, "../testdata/history/history-employment-full.json")

	resp := saveJSON(services, employmentSection, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save Employment History", resp.StatusCode)
	}

	formResp := getForm(services, account.ID)
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
