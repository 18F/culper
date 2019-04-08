package integration

import (
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
	"github.com/18F/e-QIP-prototype/api/integration/sections"
)

func TestClearEmptyAccount(t *testing.T) {
	// get a setup environment.
	services := cleanTestServices()

	account, err := createTestAccount(services.db)
	if err != nil {
		t.Fatal("couldn't create account", err)
	}

	rejector := admin.Rejector{
		DB: services.db,
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

}

func TestClearInformation(t *testing.T) {

	// get a setup environment.
	services := cleanTestServices()

	account, err := createTestAccount(services.db)
	if err != nil {
		t.Fatal("couldn't create account", err)
	}

	// Test top level no
	resp := saveJSON(services, sections.IDOtherNamesNo, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save topLevelNoJSON", resp.StatusCode)
	}

	rejector := admin.Rejector{
		DB: services.db,
	}
	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	// check that the no is no longer set.
	resetNames := api.IdentificationOtherNames{}
	_, err = resetNames.Get(services.db, account.ID)
	if err != nil {
		t.Fatal("couldn't reload other names", err)
	}
	if resetNames.HasOtherNames.Value != "" {
		t.Fatal("OtherNames was not reset")
	}

	// Test list no
	resp = saveJSON(services, sections.IDOtherNamesYes, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save listNoJSON", resp.StatusCode)
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	// check that the no is no longer set.
	resetNames = api.IdentificationOtherNames{}
	_, err = resetNames.Get(services.db, account.ID)
	if err != nil {
		t.Fatal("couldn't reload other names", err)
	}
	if resetNames.HasOtherNames.Value != "Yes" {
		t.Fatal("topLevel Yes was changed")
	}
	if resetNames.List.Branch.Value != "" {
		t.Fatal("List branch was not cleared")
	}

	// test list unset

	resp = saveJSON(services, sections.IDOtherNamesUnfinishedList, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save unfinishedListJSON", resp.StatusCode)
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	// check that the no is no longer set.
	resetNames = api.IdentificationOtherNames{}
	_, err = resetNames.Get(services.db, account.ID)
	if err != nil {
		t.Fatal("couldn't reload other names", err)
	}
	if resetNames.HasOtherNames.Value != "Yes" {
		t.Fatal("topLevel Yes was changed")
	}
	if resetNames.List.Branch.Value != "" {
		t.Fatal("List branch did not remain unset")
	}

}

func TestClearHistoryResidence(t *testing.T) {
	services := cleanTestServices()

	account, err := createTestAccount(services.db)
	if err != nil {
		t.Fatal("couldn't create account", err)
	}

	// TEST complete list
	resp := saveJSON(services, sections.HistResidenceSingle, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistResidenceSingle", resp.StatusCode)
	}

	rejector := admin.Rejector{
		DB: services.db,
	}
	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	// check that the no is no longer set.
	residence := api.HistoryResidence{}
	_, err = residence.Get(services.db, account.ID)
	if err != nil {
		t.Fatal("couldn't reload residences")
	}
	if residence.List.Branch.Value != "" {
		t.Fatal("residences was not reset")
	}

	// TEST incomplete list
	resp = saveJSON(services, sections.HistResidenceUnfinishedList, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistResidenceSingle", resp.StatusCode)
	}

	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	// check that the no is no longer set.
	residence = api.HistoryResidence{}
	_, err = residence.Get(services.db, account.ID)
	if err != nil {
		t.Fatal("couldn't reload residences")
	}
	if residence.List.Branch.Value != "" {
		t.Fatal("residences was not reset")
	}
}

func TestClearHistoryEmployment(t *testing.T) {
	services := cleanTestServices()

	account, err := createTestAccount(services.db)
	if err != nil {
		t.Fatal("couldn't create account", err)
	}

	// TEST complete list
	resp := saveJSON(services, sections.HistEmployment, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistResidenceSingle", resp.StatusCode)
	}

	rejector := admin.Rejector{
		DB: services.db,
	}
	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	// check that the no is no longer set.
	employment := api.HistoryEmployment{}
	_, err = employment.Get(services.db, account.ID)
	if err != nil {
		t.Fatal("couldn't reload employment")
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
	services := cleanTestServices()

	account, err := createTestAccount(services.db)
	if err != nil {
		t.Fatal("couldn't create account", err)
	}

	// TEST complete list
	resp := saveJSON(services, sections.HistEducationDegrees, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save HistEducationDegrees", resp.StatusCode)
	}

	rejector := admin.Rejector{
		DB: services.db,
	}
	err = rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	education := api.HistoryEducation{}
	_, err = education.Get(services.db, account.ID)
	if err != nil {
		t.Fatal("couldn't reload education")
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
