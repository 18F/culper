package integration

import (
	"fmt"
	"path"
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

func TestClearHistoryFederal(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	// TEST complete list

	historySection := readTestData(t, "../testdata/history/history-federal.json")

	resp := saveJSON(services, historySection, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistEducationDegrees", resp.StatusCode)
	}

	rejector := admin.NewRejector(services.db, services.store, nil)
	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp := getApplication(t, services, account)

	federal := resetApp.Section("history.federal").(*api.HistoryFederal)
	if federal == nil {
		t.Fatal("No history.federal section in the app")
	}

	if federal.List.Branch.Value != "" {
		t.Log("federal list was not reset")
		t.Fail()
	}

	if federal.HasFederalService.Value != "Yes" {
		t.Log("federal has service was changed")
		t.Fail()
	}

	historySectionNo := readTestData(t, "../testdata/history/history-federal-no.json")

	resp = saveJSON(services, historySectionNo, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistEducationDegrees", resp.StatusCode)
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetAppNo := getApplication(t, services, account)

	federalNo := resetAppNo.Section("history.federal").(*api.HistoryFederal)
	if federalNo == nil {
		t.Fatal("No history.federal section in the app")
	}

	if federalNo.HasFederalService.Value != "" {
		t.Log("federal has service was not reset")
		t.Fail()
	}

}

type sectionNoTest struct {
	path string
	name string
	test func(t *testing.T, section api.Section)
}

func TestClearRelationshipNos(t *testing.T) {
	services := cleanTestServices(t)

	tests := []sectionNoTest{
		{"../testdata/relationships/relationships-status-marital-not-separated.json", "relationships.status.marital", func(t *testing.T, section api.Section) {
			marital := section.(*api.RelationshipsMarital)

			if marital.CivilUnion.Separated.Value != "" {
				t.Log("Is Separated was not reset")
				t.Fail()
			}

			// This is a dumb way to call it
			if marital.CivilUnion.Divorced.Value != "" {
				t.Log("Has additional divorces was not reset")
				t.Fail()
			}

			if marital.DivorcedList.Branch.Value != "" {
				t.Log("Has Divorce was not reset")
				t.Fail()
			}

		}},
		{"../testdata/relationships/relationships-status-marital-annulled.json", "relationships.status.marital", func(t *testing.T, section api.Section) {
			marital := section.(*api.RelationshipsMarital)

			fmt.Println(marital.CivilUnion.Separated.Value)

			if marital.DivorcedList.Branch.Value != "" {
				t.Log("Has Divorce was not reset")
				t.Fail()
			}

			for _, divorcedItem := range marital.DivorcedList.Items {

				deceased, itemErr := divorcedItem.GetItemValue("Deceased")
				if itemErr != nil {
					t.Log("Got an error trying to figure out if they are dead", itemErr)
					t.Fail()
				}
				deceasedRadio := deceased.(*api.Radio)

				if deceasedRadio.Value != "" {
					t.Log("Didn't clear the deceased bit")
					t.Fail()
				}

			}

		}},
	}

	for _, clearTest := range tests {

		t.Run(path.Base(clearTest.path), func(t *testing.T) {

			account := createTestAccount(t, services.db)

			sectionJSON := readTestData(t, clearTest.path)

			resp := saveJSON(services, sectionJSON, account.ID)
			if resp.StatusCode != 200 {
				t.Fatal("Failed to save HistEducationDegrees", resp.StatusCode)
			}

			rejector := admin.NewRejector(services.db, services.store, nil)
			err := rejector.Reject(account)
			if err != nil {
				t.Fatal("Failed to reject account: ", err)
			}

			resetApp := getApplication(t, services, account)

			section := resetApp.Section(clearTest.name)
			if section == nil {
				t.Fatal(fmt.Sprintf("No %s  section in the app", clearTest.name))
			}

			clearTest.test(t, section)

		})

	}
}
