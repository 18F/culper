package integration

import (
	"fmt"
	"strings"
	"testing"
)

func TestAddEmptyValue(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	section := readTestData(t, "../testdata/history/history-employment-no-value.json")

	resp := saveJSON(services, section, account)
	if resp.StatusCode != 200 {
		t.Fatal(fmt.Sprintf("Failed to save %s %s", "history", " nonsense"), resp.StatusCode)
	}

	formResp := getForm(services, account)
	if formResp.StatusCode != 200 {
		t.Fatal(fmt.Sprintf("Failed to load %s %s", "history", "Nonsense"), resp.StatusCode)
	}
	body := readBody(t, formResp)

	fmt.Println("GOT", body)

	if strings.Contains(body, `"Status":{"type":"radio","props":{}}`) {
		t.Fatal("still giving it")
	}

	if !strings.Contains(body, `"Status":{"type":"radio","props":{"value":""}}`) {
		t.Fatal("Not doing it right")
	}
}
