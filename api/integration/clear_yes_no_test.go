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

type sectionNoTest struct {
	path string
	name string
	test func(t *testing.T, section api.Section)
}

func TestClearRelationshipNos(t *testing.T) {
	services := cleanTestServices(t)

	tests := []sectionNoTest{
		// --- Identification ---
		{"../testdata/identification/identification-othernames-no.json", "identification.othernames", func(t *testing.T, section api.Section) {
			otherNames := section.(*api.IdentificationOtherNames)

			if otherNames.HasOtherNames.Value != "" {
				t.Fatal("OtherNames was not reset")
			}
		}},
		{"../testdata/identification/identification-othernames.json", "identification.othernames", func(t *testing.T, section api.Section) {
			otherNames := section.(*api.IdentificationOtherNames)

			if otherNames.HasOtherNames.Value != "Yes" {
				t.Fatal("topLevel Yes was changed")
			}
			if otherNames.List.Branch.Value != "" {
				t.Fatal("List branch was not cleared")
			}
		}},
		{"../testdata/identification/identification-othernames-unfinished.json", "identification.othernames", func(t *testing.T, section api.Section) {
			otherNames := section.(*api.IdentificationOtherNames)

			if otherNames.HasOtherNames.Value != "Yes" {
				t.Fatal("topLevel Yes was changed")
			}
			if otherNames.List.Branch.Value != "" {
				t.Fatal("List branch did not remain unset")
			}
		}},
		// --- History ---
		{"../testdata/history/history-residence.json", "history.residence", func(t *testing.T, section api.Section) {
			residences := section.(*api.HistoryResidence)

			if residences.List.Branch.Value != "" {
				t.Fatal("residences was not reset")
			}
		}},
		{"../testdata/history/history-residence-unfinished-list.json", "history.residence", func(t *testing.T, section api.Section) {
			residences := section.(*api.HistoryResidence)

			if residences.List.Branch.Value != "" {
				t.Fatal("residences was changed")
			}
		}},
		{"../testdata/history/history-employment-full.json", "history.employment", func(t *testing.T, section api.Section) {
			employment := section.(*api.HistoryEmployment)

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
		}},
		{"../testdata/history/history-education.json", "history.education", func(t *testing.T, section api.Section) {
			education := section.(*api.HistoryEducation)

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
		}},
		{"../testdata/history/history-federal.json", "history.federal", func(t *testing.T, section api.Section) {
			federal := section.(*api.HistoryFederal)

			if federal.List.Branch.Value != "" {
				t.Log("federal list was not reset")
				t.Fail()
			}
			if federal.HasFederalService.Value != "Yes" {
				t.Log("federal has service was changed")
				t.Fail()
			}
		}},
		{"../testdata/history/history-federal-no.json", "history.federal", func(t *testing.T, section api.Section) {
			federal := section.(*api.HistoryFederal)

			if federal.HasFederalService.Value != "" {
				t.Log("federal has service was not reset")
				t.Fail()
			}
		}},
		// --- Relationships ---
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
		{"../testdata/relationships/relationships-status-no-cohabitant.json", "relationships.status.cohabitant", func(t *testing.T, section api.Section) {
			cohabitant := section.(*api.RelationshipsCohabitants)

			if cohabitant.HasCohabitant.Value != "" {
				t.Log("Should have cleared HasCohabitant")
				t.Fail()
			}
		}},
		{"../testdata/relationships/relationships-status-cohabitant.json", "relationships.status.cohabitant", func(t *testing.T, section api.Section) {
			cohabitant := section.(*api.RelationshipsCohabitants)

			if cohabitant.HasCohabitant.Value != "Yes" {
				t.Log("Should not have cleared HasCohabitant")
				t.Fail()
			}

			if cohabitant.CohabitantList.Branch.Value != "" {
				t.Log("Should have cleared the cohabitant list")
				t.Fail()
			}
		}},
		{"../testdata/relationships/relationships-people.json", "relationships.people", func(t *testing.T, section api.Section) {
			people := section.(*api.RelationshipsPeople)

			if people.List.Branch.Value != "" {
				t.Log("Should have cleared the people list")
				t.Fail()
			}
		}},
		{"../testdata/relationships/relationships-relatives.json", "relationships.relatives", func(t *testing.T, section api.Section) {
			relatives := section.(*api.RelationshipsRelatives)

			for _, personItem := range relatives.List.Items {

				deceased, itemErr := personItem.GetItemValue("IsDeceased")
				if itemErr != nil {
					t.Log("Got an error trying to figure out if they are dead", itemErr)
					t.Fail()
				}
				deceasedBranch := deceased.(*api.Branch)

				if deceasedBranch.Value != "" {
					t.Log("Should have cleared the dead bit")
					t.Fail()
				}
			}

			if relatives.List.Branch.Value != "" {
				t.Log("Should have cleared the relatives list")
				t.Fail()
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
