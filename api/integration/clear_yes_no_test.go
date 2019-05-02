package integration

import (
	"fmt"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
)

func TestClearEmptyAccount(t *testing.T) {
	// get a setup environment.
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	rejector := admin.NewRejector(services.db, services.store, nil)

	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

}

func TestClearInformation(t *testing.T) {

	// get a setup environment.
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	// Test top level no
	otherNo := readTestData(t, "../testdata/identification/identification-othernames-no.json")

	resp := saveJSON(services, otherNo, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save topLevelNoJSON", resp.StatusCode)
	}

	rejector := admin.NewRejector(services.db, services.store, nil)
	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp := getApplication(t, services, account)

	resetNames := resetApp.Section("identification.othernames").(*api.IdentificationOtherNames)
	if resetNames == nil {
		t.Fatal("No other names section in the app")
	}

	if resetNames.HasOtherNames.Value != "" {
		t.Fatal("OtherNames was not reset")
	}

	// Test list no
	listNo := readTestData(t, "../testdata/identification/identification-othernames.json")

	resp = saveJSON(services, listNo, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save listNoJSON", resp.StatusCode)
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp = getApplication(t, services, account)

	resetNames = resetApp.Section("identification.othernames").(*api.IdentificationOtherNames)
	if resetNames == nil {
		t.Fatal("No other names section in the app")
	}

	if resetNames.HasOtherNames.Value != "Yes" {
		t.Fatal("topLevel Yes was changed")
	}
	if resetNames.List.Branch.Value != "" {
		t.Fatal("List branch was not cleared")
	}

	// test list unset
	unifishedList := readTestData(t, "../testdata/identification/identification-othernames-unfinished.json")

	resp = saveJSON(services, unifishedList, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save unfinishedListJSON", resp.StatusCode)
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp = getApplication(t, services, account)

	resetNames = resetApp.Section("identification.othernames").(*api.IdentificationOtherNames)
	if resetNames == nil {
		t.Fatal("No other names section in the app")
	}

	if resetNames.HasOtherNames.Value != "Yes" {
		t.Fatal("topLevel Yes was changed")
	}
	if resetNames.List.Branch.Value != "" {
		t.Fatal("List branch did not remain unset")
	}

}

func TestClearHistoryResidence(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	residenceSingle := readTestData(t, "../testdata/history/history-residence.json")

	// TEST complete list
	resp := saveJSON(services, residenceSingle, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistResidenceSingle", resp.StatusCode)
	}

	rejector := admin.NewRejector(services.db, services.store, nil)
	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp := getApplication(t, services, account)
	fmt.Println("RESET", resetApp)

	resetResidences := resetApp.Section("history.residence").(*api.HistoryResidence)
	if resetResidences == nil {
		t.Fatal("No history section in the app")
	}

	if resetResidences.List.Branch.Value != "" {
		t.Fatal("residences was not reset")
	}

	residenceUnfinished := readTestData(t, "../testdata/history/history-residence-unfinished-list.json")

	// TEST incomplete list
	resp = saveJSON(services, residenceUnfinished, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistResidenceSingle", resp.StatusCode)
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp = getApplication(t, services, account)

	residence := resetApp.Section("history.residence").(*api.HistoryResidence)
	if residence == nil {
		t.Fatal("No history residence section in the app")
	}

	if residence.List.Branch.Value != "" {
		t.Fatal("residences was not reset")
	}
}

func TestClearHistoryEmployment(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	employmentSection := readTestData(t, "../testdata/history/history-employment-full.json")

	// TEST complete list
	resp := saveJSON(services, employmentSection, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save employmentSection", resp.StatusCode)
	}

	rejector := admin.NewRejector(services.db, services.store, nil)
	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp := getApplication(t, services, account)

	employment := resetApp.Section("history.employment").(*api.HistoryEmployment)
	if employment == nil {
		t.Fatal("No history.employment section in the app")
	}

	if employment.List.Branch.Value != "" {
		t.Log("employment list was not reset")
		t.Fail()
	}

	// check the record doublecheck is no longer set
	if employment.EmploymentRecord.Value != "" {
		t.Log("employment record was not reset")
		t.Fail()
	}

	// check that the reprimand is not set in the one entry
	safeway := employment.List.Items[0]
	reprimandEnt, repErr := safeway.GetItemValue("Reprimand")
	if repErr != nil {
		t.Fatal("couldn't get the reprimand", repErr)
	}

	reprimands := reprimandEnt.(*api.Collection)
	hasReprimandEnt, hasRepErr := reprimands.Items[0].GetItemValue("Has")
	if hasRepErr != nil {
		t.Fatal("couldn't get has rep", hasRepErr)
	}

	hasReprimand := hasReprimandEnt.(*api.Branch)
	if hasReprimand.Value != "" {
		t.Log("has reprimand has not been reset")
		t.Fail()
	}

}

func TestClearHistoryEducation(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	// TEST complete list

	employmentSection := readTestData(t, "../testdata/history/history-education.json")

	resp := saveJSON(services, employmentSection, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistEducationDegrees", resp.StatusCode)
	}

	rejector := admin.NewRejector(services.db, services.store, nil)
	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp := getApplication(t, services, account)

	education := resetApp.Section("history.education").(*api.HistoryEducation)
	if education == nil {
		t.Fatal("No history.education section in the app")
	}

	if education.List.Branch.Value != "" {
		t.Log("education list was not reset")
		t.Fail()
	}

	if education.HasAttended.Value != "" {
		t.Log("education has attended was not reset")
		t.Fail()
	}

	if education.HasDegree10.Value != "Yes" {
		t.Log("education has degree was changed")
		t.Fail()
	}

}
