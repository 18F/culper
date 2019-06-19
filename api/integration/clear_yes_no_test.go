package integration

import (
	"bytes"
	"fmt"
	"path"
	"reflect"
	"testing"
	"text/template"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
)

// Note: These tests are broken up into two table tests.
// The "Basic" tests test the standard Branch/List.Branch that most of the
// Sections have. For everything else, the tests are in the Complex test.

func TestClearEmptyAccount(t *testing.T) {
	// get a setup environment.
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	rejector := admin.NewRejecter(services.db, services.store, nil)

	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}
}

// Helpers for the Basic tests.

type basicNoData struct {
	BranchName string
	Type       string
}

const basicNoTemplate = `{
    "props": {
        "{{.BranchName}}": {
            "props": {
                "value": "No"
            },
            "type": "branch"
        },
        "List": {
            "props": {
                "branch": {
                    "props": {
                        "value": ""
                    },
                    "type": "branch"
                },
                "items": []
            },
            "type": "collection"
        }
    },
    "type": "{{.Type}}"
}
`

func makeNoJSON(t *testing.T, data basicNoData) []byte {
	noTemplate, parseErr := template.New("no").Parse(basicNoTemplate)
	if parseErr != nil {
		t.Fatal(parseErr)
	}

	var noBytes bytes.Buffer
	execErr := noTemplate.Execute(&noBytes, data)
	if execErr != nil {
		t.Fatal(execErr)
	}

	return noBytes.Bytes()
}

func getBasicBranches(t *testing.T, section api.Section, branchName string) (*api.Branch, *api.Branch) {
	t.Helper()
	// The section will have a Branch called BranchName on it. and a List called List on it.
	sectionPointerValue := reflect.ValueOf(section)
	sectionValue := sectionPointerValue.Elem()

	noBranchPointer := sectionValue.FieldByName(branchName)
	if !noBranchPointer.IsValid() {
		t.Fatal("TEST ERROR: Section does not have field", branchName)
		return &api.Branch{}, &api.Branch{}
	}
	noBranch := noBranchPointer.Interface().(*api.Branch)

	listPointer := sectionValue.FieldByName("List")
	if !listPointer.IsValid() {
		t.Fatal("TEST ERROR: Section does not have a List", section)
		return &api.Branch{}, &api.Branch{}
	}
	list := listPointer.Interface().(*api.Collection)

	return noBranch, list.Branch
}

func rejectSection(t *testing.T, services serviceSet, json []byte, sectionName string) api.Section {
	account := createTestAccount(t, services.db)

	resp := saveJSON(services, json, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save JSON", resp.StatusCode)
	}

	rejector := admin.NewRejecter(services.db, services.store, nil)
	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	resetApp := getApplication(t, services, account)

	section := resetApp.Section(sectionName)
	if section == nil {
		t.Fatal(fmt.Sprintf("No %s  section in the app", sectionName))
	}

	return section
}

func TestClearBasicSectionNos(t *testing.T) {
	services := cleanTestServices(t)

	basicTests := []struct {
		path       string
		name       string
		branchName string
	}{

		{"../testdata/identification/identification-othernames.json", "identification.othernames", "HasOtherNames"},

		{"../testdata/history/history-federal.json", "history.federal", "HasFederalService"},

		{"../testdata/citizenship/citizenship-multiple-renounced.json", "citizenship.multiple", "HasMultiple"},

		{"../testdata/military/military-history.json", "military.history", "HasServed"},
		{"../testdata/military/military-disciplinary.json", "military.disciplinary", "HasDisciplinary"},

		{"../testdata/foreign/foreign-contacts.json", "foreign.contacts", "HasForeignContacts"},
		{"../testdata/foreign/foreign-activities-direct.json", "foreign.activities.direct", "HasInterests"},
		{"../testdata/foreign/foreign-activities-indirect.json", "foreign.activities.indirect", "HasInterests"},
		{"../testdata/foreign/foreign-activities-realestate.json", "foreign.activities.realestate", "HasInterests"},
		{"../testdata/foreign/foreign-activities-benefits.json", "foreign.activities.benefits", "HasBenefits"},
		{"../testdata/foreign/foreign-activities-support.json", "foreign.activities.support", "HasForeignSupport"},
		{"../testdata/foreign/foreign-business-advice.json", "foreign.business.advice", "HasForeignAdvice"},
		{"../testdata/foreign/foreign-business-family.json", "foreign.business.family", "HasForeignFamily"},
		{"../testdata/foreign/foreign-business-employment.json", "foreign.business.employment", "HasForeignEmployment"},
		{"../testdata/foreign/foreign-business-ventures.json", "foreign.business.ventures", "HasForeignVentures"},
		{"../testdata/foreign/foreign-business-conferences.json", "foreign.business.conferences", "HasForeignConferences"},
		{"../testdata/foreign/foreign-business-contact.json", "foreign.business.contact", "HasForeignContact"},
		{"../testdata/foreign/foreign-business-sponsorship.json", "foreign.business.sponsorship", "HasForeignSponsorship"},
		{"../testdata/foreign/foreign-business-political.json", "foreign.business.political", "HasForeignPolitical"},
		{"../testdata/foreign/foreign-business-voting.json", "foreign.business.voting", "HasForeignVoting"},

		{"../testdata/financial/financial-bankruptcy.json", "financial.bankruptcy", "HasBankruptcy"},
		{"../testdata/financial/financial-gambling.json", "financial.gambling", "HasGamblingDebt"},
		{"../testdata/financial/financial-taxes.json", "financial.taxes", "HasTaxes"},
		{"../testdata/financial/financial-card.json", "financial.card", "HasCardAbuse"},
		{"../testdata/financial/financial-credit.json", "financial.credit", "HasCreditCounseling"},
		{"../testdata/financial/financial-delinquent.json", "financial.delinquent", "HasDelinquent"},
		{"../testdata/financial/financial-nonpayment.json", "financial.nonpayment", "HasNonpayment"},

		{"../testdata/substance/substance-drug-usage.json", "substance.drugs.usage", "UsedDrugs"},
		{"../testdata/substance/substance-drug-purchase.json", "substance.drugs.purchase", "Involved"},
		{"../testdata/substance/substance-drug-clearance.json", "substance.drugs.clearance", "UsedDrugs"},
		{"../testdata/substance/substance-drug-publicsafety.json", "substance.drugs.publicsafety", "UsedDrugs"},
		{"../testdata/substance/substance-drug-ordered.json", "substance.drugs.ordered", "TreatmentOrdered"},
		{"../testdata/substance/substance-drug-voluntary.json", "substance.drugs.voluntary", "TreatmentVoluntary"},
		{"../testdata/substance/substance-alcohol-negative.json", "substance.alcohol.negative", "HasImpacts"},
		{"../testdata/substance/substance-alcohol-ordered.json", "substance.alcohol.ordered", "HasBeenOrdered"},
		{"../testdata/substance/substance-alcohol-voluntary.json", "substance.alcohol.voluntary", "SoughtTreatment"},
		{"../testdata/substance/substance-alcohol-additional.json", "substance.alcohol.additional", "ReceivedTreatment"},

		{"../testdata/legal/legal-police-offenses.json", "legal.police.offenses", "HasOffenses"},
		{"../testdata/legal/legal-police-additionaloffenses.json", "legal.police.additionaloffenses", "HasOtherOffenses"},
		{"../testdata/legal/legal-police-domesticviolence.json", "legal.police.domesticviolence", "HasDomesticViolence"},
		{"../testdata/legal/legal-police-domesticviolence.json", "legal.police.domesticviolence", "HasDomesticViolence"},
		{"../testdata/legal/legal-investigations-history.json", "legal.investigations.history", "HasHistory"},
		{"../testdata/legal/legal-investigations-revoked.json", "legal.investigations.revoked", "HasRevocations"},
		{"../testdata/legal/legal-investigations-debarred.json", "legal.investigations.debarred", "HasDebarment"},
		{"../testdata/legal/legal-court.json", "legal.court", "HasCourtActions"},
		{"../testdata/legal/legal-technology-unauthorized.json", "legal.technology.unauthorized", "HasUnauthorized"},
		{"../testdata/legal/legal-technology-manipulating.json", "legal.technology.manipulating", "HasManipulating"},
		{"../testdata/legal/legal-technology-unlawful.json", "legal.technology.unlawful", "HasUnlawful"},
		{"../testdata/legal/legal-associations-terrorist-organization.json", "legal.associations.terrorist-organization", "HasTerrorist"},
		{"../testdata/legal/legal-associations-engaged-in-terrorism.json", "legal.associations.engaged-in-terrorism", "HasEngaged"},
		{"../testdata/legal/legal-associations-advocating.json", "legal.associations.advocating", "HasAdvocated"},
		{"../testdata/legal/legal-associations-membership-overthrow.json", "legal.associations.membership-overthrow", "HasOverthrow"},
		{"../testdata/legal/legal-associations-membership-violence-or-force.json", "legal.associations.membership-violence-or-force", "HasViolence"},
		{"../testdata/legal/legal-associations-activities-to-overthrow.json", "legal.associations.activities-to-overthrow", "HasActivities"},
	}

	for _, basicTest := range basicTests {

		t.Run(path.Base(basicTest.path), func(t *testing.T) {

			sectionJSON := readTestData(t, basicTest.path)

			section := rejectSection(t, services, sectionJSON, basicTest.name)
			noBranch, listBranch := getBasicBranches(t, section, basicTest.branchName)

			if noBranch.Value != "Yes" {
				t.Log("We should not have unset the Yes")
				t.Fail()
			}

			if listBranch.Value != "" {
				t.Log("We should have unset the last No")
				t.Fail()
			}

			// NEXT, check it again with the no template.
			templateData := basicNoData{
				BranchName: basicTest.branchName,
				Type:       basicTest.name,
			}
			noBytes := makeNoJSON(t, templateData)

			noSection := rejectSection(t, services, noBytes, basicTest.name)
			noNoBranch, _ := getBasicBranches(t, noSection, basicTest.branchName)

			if noNoBranch.Value != "" {
				t.Log("We should have unset the No")
				t.Fail()
			}

		})
	}
}

func TestClearComplexSectionNos(t *testing.T) {
	services := cleanTestServices(t)

	tests := []struct {
		path string
		name string
		test func(t *testing.T, section api.Section)
	}{

		// ---
		// --- Identification ---
		// ---

		{"../testdata/identification/identification-othernames-unfinished.json", "identification.othernames", func(t *testing.T, section api.Section) {
			otherNames := section.(*api.IdentificationOtherNames)

			if otherNames.HasOtherNames.Value != "Yes" {
				t.Fatal("topLevel Yes was changed")
			}
			if otherNames.List.Branch.Value != "" {
				t.Fatal("List branch did not remain unset")
			}
		}},

		// ---
		// --- History ---
		// ---

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

			hasReprimand := getBranchItemValue(t, reprimands.Items[0], "Has")
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

		{"../testdata/history/history-education-no.json", "history.education", func(t *testing.T, section api.Section) {
			education := section.(*api.HistoryEducation)

			if education.HasAttended.Value != "" {
				t.Log("education has attended was not reset")
				t.Fail()
			}
			if education.HasDegree10.Value != "" {
				t.Log("education has degree was changed")
				t.Fail()
			}
		}},

		// ---
		// --- Relationships ---
		// ---

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

				deceasedBranch := getBranchItemValue(t, personItem, "IsDeceased")

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

		// ---
		// --- Citizenship ---
		// ---

		{"../testdata/citizenship/citizenship-status-alien.json", "citizenship.status", func(t *testing.T, section api.Section) {
			status := section.(*api.CitizenshipStatus)

			if status.CitizenshipStatus.Value != "" {
				t.Log("Should have cleared the citizenship status")
				t.Fail()
			}
			if status.HasAlienRegistration.Value != "" {
				t.Log("Should have cleared the alien reg")
				t.Fail()
			}
		}},
		{"../testdata/citizenship/citizenship-multiple-renounced.json", "citizenship.multiple", func(t *testing.T, section api.Section) {
			multiple := section.(*api.CitizenshipMultiple)

			for _, foreignItem := range multiple.List.Items {

				renouncedBranch := getBranchItemValue(t, foreignItem, "Renounced")

				if renouncedBranch.Value != "" {
					t.Log("Should have cleared the renounced bit")
					t.Fail()
				}
			}
		}},
		{"../testdata/citizenship/citizenship-passports-no.json", "citizenship.passports", func(t *testing.T, section api.Section) {
			passports := section.(*api.CitizenshipPassports)

			// for none, there is a single empty passport
			hasBranch := getBranchItemValue(t, passports.Passports.Items[0], "Has")

			if hasBranch.Value != "" {
				t.Log("Should have cleared the passport list")
				t.Fail()
			}
		}},
		{"../testdata/citizenship/citizenship-passports-two.json", "citizenship.passports", func(t *testing.T, section api.Section) {
			passports := section.(*api.CitizenshipPassports)

			// For a list, it's the last one that will be no
			firstHasBranch := getBranchItemValue(t, passports.Passports.Items[0], "Has")
			if firstHasBranch.Value != "Yes" {
				t.Log("Should not have cleared the first passport has")
				t.Fail()
			}

			usedBranch := getBranchItemValue(t, passports.Passports.Items[0], "Used")
			if usedBranch.Value != "" {
				t.Log("Should have cleared the used field")
				t.Fail()
			}

			lastHasBranch := getBranchItemValue(t, passports.Passports.Items[2], "Has")
			if lastHasBranch.Value != "" {
				t.Log("Should have cleared the last passport has")
				t.Fail()
			}
		}},

		// ---
		// --- Military History ---
		// ---

		{"../testdata/military/military-selective.json", "military.selective", func(t *testing.T, section api.Section) {
			selective := section.(*api.MilitarySelective)

			if selective.WasBornAfter.Value != "Yes" {
				t.Log("Should not have cleared born after")
				t.Fail()
			}
			if selective.HasRegistered.Value != "" {
				t.Log("Should have cleared the didn't register")
				t.Fail()
			}
		}},
		{"../testdata/military/military-selective-no.json", "military.selective", func(t *testing.T, section api.Section) {
			selective := section.(*api.MilitarySelective)

			if selective.WasBornAfter.Value != "No" {
				t.Log("Should not have cleared born after")
				t.Fail()
			}
			if selective.HasRegistered.Value != "" {
				t.Log("Should have cleared the didn't register")
				t.Fail()
			}
		}},
		{"../testdata/military/military-history.json", "military.history", func(t *testing.T, section api.Section) {
			history := section.(*api.MilitaryHistory)

			discharged := getBranchItemValue(t, history.List.Items[0], "HasBeenDischarged")

			if discharged.Value != "Yes" {
				t.Log("Should not have cleared discharged")
				t.Fail()
			}
		}},
		{"../testdata/military/military-history-no-discharge.json", "military.history", func(t *testing.T, section api.Section) {
			history := section.(*api.MilitaryHistory)

			discharged := getBranchItemValue(t, history.List.Items[0], "HasBeenDischarged")

			if discharged.Value != "" {
				t.Log("Should have cleared discharged")
				t.Fail()
			}
		}},

		{"../testdata/military/military-foreign-two.json", "military.foreign", func(t *testing.T, section api.Section) {
			foreign := section.(*api.MilitaryForeign)

			// For a list, it's the last one that will be no
			firstHasBranch := getBranchItemValue(t, foreign.List.Items[0], "Has")
			if firstHasBranch.Value != "Yes" {
				t.Log("Should not have cleared the first has")
				t.Fail()
			}

			usedBranch := getBranchItemValue(t, foreign.List.Items[0], "MaintainsContact")
			if usedBranch.Value != "" {
				t.Log("Should have cleared the MaintainsContact field")
				t.Fail()
			}

			lastHasBranch := getBranchItemValue(t, foreign.List.Items[2], "Has")
			if lastHasBranch.Value != "" {
				t.Log("Should have cleared the last foreign has")
				t.Fail()
			}

		}},
		{"../testdata/military/military-foreign-no.json", "military.foreign", func(t *testing.T, section api.Section) {
			foreign := section.(*api.MilitaryForeign)

			// for none, there is a single empty item
			hasBranch := getBranchItemValue(t, foreign.List.Items[0], "Has")

			if hasBranch.Value != "" {
				t.Log("Should have cleared the foreign list")
				t.Fail()
			}
		}},

		// ---
		// --- Foreign ---
		// ---

		{"../testdata/foreign/foreign-passport.json", "foreign.passport", func(t *testing.T, section api.Section) {
			passport := section.(*api.ForeignPassport)

			if passport.HasPassports.Value != "Yes" {
				t.Log("Should not have cleared the has passport")
				t.Fail()
			}
		}},

		{"../testdata/foreign/foreign-passport-no.json", "foreign.passport", func(t *testing.T, section api.Section) {
			passport := section.(*api.ForeignPassport)

			if passport.HasPassports.Value != "" {
				t.Log("Should have cleared the has passport")
				t.Fail()
			}
		}},

		{"../testdata/foreign/foreign-contacts.json", "foreign.contacts", func(t *testing.T, section api.Section) {
			contacts := section.(*api.ForeignContacts)

			for _, contactItem := range contacts.List.Items {

				hasAffiliations := getBranchItemValue(t, contactItem, "HasAffiliations")
				if hasAffiliations.Value != "Yes" {
					t.Log("Should not have cleared the affiliation")
					t.Fail()
				}
			}

		}},

		{"../testdata/foreign/foreign-contacts-no-affiliation.json", "foreign.contacts", func(t *testing.T, section api.Section) {
			contacts := section.(*api.ForeignContacts)

			for _, contactItem := range contacts.List.Items {

				hasAffiliations := getBranchItemValue(t, contactItem, "HasAffiliations")
				if hasAffiliations.Value != "" {
					t.Log("Should have cleared the affiliation")
					t.Fail()
				}
			}

		}},

		{"../testdata/foreign/foreign-activities-direct.json", "foreign.activities.direct", func(t *testing.T, section api.Section) {
			directActivities := section.(*api.ForeignActivitiesDirect)

			for _, activityItem := range directActivities.List.Items {

				coownersList, listErr := activityItem.GetItemValue("CoOwners")
				if listErr != nil {
					t.Fatal(listErr)
				}

				coowners := coownersList.(*api.CoOwners)

				lastItem := coowners.List.Items[len(coowners.List.Items)-1]

				lastHas := getBranchItemValue(t, lastItem, "Has")

				if lastHas.Value != "" {
					t.Log("Should have cleared the Has marker")
					t.Fail()
				}
			}
		}},

		{"../testdata/foreign/foreign-activities-benefits.json", "foreign.activities.benefits", func(t *testing.T, section api.Section) {
			benefits := section.(*api.ForeignActivitiesBenefits)

			megaItem := benefits.List.Items[0]
			futureBenefitItem, futureErr := megaItem.GetItemValue("FutureBenefit")
			if futureErr != nil {
				t.Fatal(futureErr)
			}

			futureBenefit := futureBenefitItem.(*api.Benefit)
			if futureBenefit.Obligated.Value != "" {
				t.Log("Should have cleared the future benefit obligation")
			}

			continuingBenefitItem, futureErr := megaItem.GetItemValue("ContinuingBenefit")
			if futureErr != nil {
				t.Fatal(futureErr)
			}

			continuingBenefit := continuingBenefitItem.(*api.Benefit)
			if continuingBenefit.Obligated.Value != "Yes" {
				t.Log("Should have cleared the future benefit obligation")
			}

		}},

		{"../testdata/foreign/foreign-business-conferences.json", "foreign.business.conferences", func(t *testing.T, section api.Section) {
			conferences := section.(*api.ForeignBusinessConferences)

			for _, eventItem := range conferences.List.Items {
				contactsItem, getErr := eventItem.GetItemValue("Contacts")
				if getErr != nil {
					t.Fatal(getErr)
				}
				contacts := contactsItem.(*api.Contacts)
				for _, contactItem := range contacts.List.Items {
					has := getBranchItemValue(t, contactItem, "Has")
					if has.Value == "No" {
						t.Log("Didn't clear has")
						t.Fail()
					}
				}
			}

		}},

		{"../testdata/foreign/foreign-business-contact.json", "foreign.business.contact", func(t *testing.T, section api.Section) {
			contact := section.(*api.ForeignBusinessContact)

			for _, subsequentItem := range contact.List.Items {
				contactsItem, getErr := subsequentItem.GetItemValue("SubsequentContacts")
				if getErr != nil {
					t.Fatal(getErr)
				}
				contacts := contactsItem.(*api.Contacts)
				for _, contactItem := range contacts.List.Items {
					has := getBranchItemValue(t, contactItem, "Has")
					if has.Value == "No" {
						t.Log("Didn't clear has")
						t.Fail()
					}
				}
			}
		}},

		{"../testdata/foreign/foreign-travel.json", "foreign.travel", func(t *testing.T, section api.Section) {
			travel := section.(*api.ForeignTravel)

			if travel.HasForeignTravelOutside.Value != "Yes" {
				t.Log("Shouldn't have cleared this Yes")
				t.Fail()
			}

			if travel.HasForeignTravelOfficial.Value != "No" {
				t.Log("Shouldn't have cleard this No!!")
				t.Fail()
			}

			travelItem := travel.List.Items[1]

			questioned := getBranchItemValue(t, travelItem, "Questioned")
			if questioned.Value != "" {
				t.Log("questioned should have been reset")
				t.Fail()
			}

			encounter := getBranchItemValue(t, travelItem, "Encounter")
			if encounter.Value != "" {
				t.Log("encounter should have been reset")
				t.Fail()
			}

			contacted := getBranchItemValue(t, travelItem, "Contacted")
			if contacted.Value != "" {
				t.Log("contacted should have been reset")
				t.Fail()
			}

			counter := getBranchItemValue(t, travelItem, "Counter")
			if counter.Value != "" {
				t.Log("counter should have been reset")
				t.Fail()
			}

			interest := getBranchItemValue(t, travelItem, "Interest")
			if interest.Value != "" {
				t.Log("interest should have been reset")
				t.Fail()
			}

			sensitive := getBranchItemValue(t, travelItem, "Sensitive")
			if sensitive.Value != "" {
				t.Log("sensitive should have been reset")
				t.Fail()
			}

			threat := getBranchItemValue(t, travelItem, "Threatened")
			if threat.Value != "" {
				t.Log("threat should have been reset")
				t.Fail()
			}

			if travel.List.Branch.Value != "" {
				t.Log("Should have clared the list No")
				t.Fail()
			}
		}},

		{"../testdata/financial/financial-bankruptcy-not-discharged.json", "financial.bankruptcy", func(t *testing.T, section api.Section) {
			bankruptcy := section.(*api.FinancialBankruptcy)

			for _, subsequentItem := range bankruptcy.List.Items {
				wasDischarged := getBranchItemValue(t, subsequentItem, "HasDischargeExplanation")
				if wasDischarged.Value != "" {
					t.Log("Didn't clear the discharge")
					t.Fail()
				}
			}
		}},

		{"../testdata/substance/substance-drug-purchase.json", "substance.drugs.purchase", func(t *testing.T, section api.Section) {
			purchase := section.(*api.SubstanceDrugPurchase)

			for _, purchaseItem := range purchase.List.Items {
				employed := getBranchItemValue(t, purchaseItem, "InvolvementWhileEmployed")
				if employed.Value != "" {
					t.Log("Didn't clear the employed")
					t.Fail()
				}

				clearance := getBranchItemValue(t, purchaseItem, "InvolvementWithClearance")
				if clearance.Value != "" {
					t.Log("Didn't clear the clearance")
					t.Fail()
				}

				future := getBranchItemValue(t, purchaseItem, "InvolvementInFuture")
				if future.Value != "" {
					t.Log("Didn't clear the future")
					t.Fail()
				}
			}
		}},
		// Misuse uses a different name for the serialized key and the struct prop name so we can't use the standard
		{"../testdata/substance/substance-drug-misuse.json", "substance.drugs.misuse", func(t *testing.T, section api.Section) {
			misuse := section.(*api.SubstanceDrugMisuse)

			if misuse.UsedDrugs.Value != "Yes" {
				t.Log("We should not have unset the Yes")
				t.Fail()
			}

			if misuse.List.Branch.Value != "" {
				t.Log("We should have unset the last No")
				t.Fail()
			}

		}},
		{"../testdata/substance/substance-drug-misuse-no.json", "substance.drugs.misuse", func(t *testing.T, section api.Section) {
			misuse := section.(*api.SubstanceDrugMisuse)

			if misuse.UsedDrugs.Value != "" {
				t.Log("We should have unset the No")
				t.Fail()
			}

		}},

		{"../testdata/substance/substance-drug-ordered.json", "substance.drugs.ordered", func(t *testing.T, section api.Section) {
			ordered := section.(*api.SubstanceDrugOrdered)

			for _, orderedItem := range ordered.List.Items {
				wasDischarged := getBranchItemValue(t, orderedItem, "ActionTaken")
				if wasDischarged.Value != "" {
					t.Log("Didn't clear the order")
					t.Fail()
				}
			}
		}},

		{"../testdata/substance/substance-drug-voluntary.json", "substance.drugs.voluntary", func(t *testing.T, section api.Section) {
			voluntary := section.(*api.SubstanceDrugVoluntary)

			for _, voluntaryItem := range voluntary.List.Items {
				wasDischarged := getBranchItemValue(t, voluntaryItem, "TreatmentCompleted")
				if wasDischarged.Value != "" {
					t.Log("Didn't clear the competion")
					t.Fail()
				}
			}
		}},

		{"../testdata/substance/substance-alcohol-ordered.json", "substance.alcohol.ordered", func(t *testing.T, section api.Section) {
			ordered := section.(*api.SubstanceAlcoholOrdered)

			incompleteItem := ordered.List.Items[0]
			actionTaken := getBranchItemValue(t, incompleteItem, "ActionTaken")
			if actionTaken.Value != "Yes" {
				t.Log("Should not have cleared the action taken")
				t.Fail()
			}

			completedTreatment := getBranchItemValue(t, incompleteItem, "CompletedTreatment")
			if completedTreatment.Value != "" {
				t.Log("Didn't clear the completed treatment")
				t.Fail()
			}

			actionNotTakenItem := ordered.List.Items[1]
			actionTaken = getBranchItemValue(t, actionNotTakenItem, "ActionTaken")
			if actionTaken.Value != "" {
				t.Log("Didn't clear the action taken")
				t.Fail()
			}
		}},

		{"../testdata/substance/substance-alcohol-voluntary.json", "substance.alcohol.voluntary", func(t *testing.T, section api.Section) {
			voluntary := section.(*api.SubstanceAlcoholVoluntary)

			completedTreatment := getBranchItemValue(t, voluntary.List.Items[0], "CompletedTreatment")
			if completedTreatment.Value != "" {
				t.Log("Didn't clear the completed treatment")
				t.Fail()
			}
		}},

		{"../testdata/substance/substance-alcohol-additional.json", "substance.alcohol.additional", func(t *testing.T, section api.Section) {
			additional := section.(*api.SubstanceAlcoholAdditional)

			completedTreatment := getBranchItemValue(t, additional.List.Items[0], "CompletedTreatment")
			if completedTreatment.Value != "" {
				t.Log("Didn't clear the completed treatment")
				t.Fail()
			}
		}},

		// ---
		// --- Investigative and Criminal History ---
		// ---

		{"../testdata/legal/legal-police-offenses.json", "legal.police.offenses", func(t *testing.T, section api.Section) {
			offenses := section.(*api.LegalPoliceOffenses)

			wasCharged := getBranchItemValue(t, offenses.List.Items[0], "WasCharged")
			if wasCharged.Value != "Yes" {
				t.Log("shouldn't clear WasCharged")
				t.Fail()
			}

			wasCharged = getBranchItemValue(t, offenses.List.Items[1], "WasCharged")
			if wasCharged.Value != "" {
				t.Log("should clear WasCharged")
				t.Fail()
			}
		}},

		{"../testdata/legal/legal-police-additionaloffenses.json", "legal.police.additionaloffenses", func(t *testing.T, section api.Section) {
			offenses := section.(*api.LegalPoliceAdditionalOffenses)

			wasCharged := getBranchItemValue(t, offenses.List.Items[0], "WasSentenced")
			if wasCharged.Value != "Yes" {
				t.Log("shouldn't clear WasSentenced")
				t.Fail()
			}

			wasCharged = getBranchItemValue(t, offenses.List.Items[1], "WasSentenced")
			if wasCharged.Value != "" {
				t.Log("should clear WasSentenced")
				t.Fail()
			}
		}},

		{"../testdata/legal/legal-associations-terrorism-association-no.json", "legal.associations.terrorism-association", func(t *testing.T, section api.Section) {
			association := section.(*api.LegalAssociationsTerrorismAssociation)

			if association.HasTerrorism.Value != "" {
				t.Log("Should have cleared the lone no")
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
				t.Fatal("Failed to save JSON", resp.StatusCode)
			}

			rejector := admin.NewRejecter(services.db, services.store, nil)
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
