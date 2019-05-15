package integration

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestSaveSection(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	tests := []struct {
		path       string
		section    string
		subSection string
	}{
		{"../testdata/identification/identification-name.json", "Identification", "ApplicantName"},
		{"../testdata/identification/identification-contacts.json", "Identification", "Contacts"},
		{"../testdata/identification/identification-othernames.json", "Identification", "OtherNames"},
		{"../testdata/identification/identification-othernames-no.json", "Identification", "OtherNames"},
		{"../testdata/identification/identification-othernames-unfinished.json", "Identification", "OtherNames"},
		{"../testdata/identification/identification-birthdate.json", "Identification", "ApplicantBirthDate"},
		{"../testdata/identification/identification-birthplace.json", "Identification", "ApplicantBirthPlace"},
		{"../testdata/identification/identification-birthplace-full.json", "Identification", "ApplicantBirthPlace"},
		{"../testdata/identification/identification-ssn.json", "Identification", "ApplicantSSN"},
		{"../testdata/identification/identification-physical.json", "Identification", "Physical"},

		{"../testdata/financial-bankruptcy.json", "Financial", "Bankruptcy"},
		{"../testdata/financial-gambling.json", "Financial", "Gambling"},
		{"../testdata/financial-taxes.json", "Financial", "Taxes"},
		{"../testdata/financial-card.json", "Financial", "Card"},
		{"../testdata/financial-credit.json", "Financial", "Credit"},
		{"../testdata/financial-delinquent.json", "Financial", "Delinquent"},
		{"../testdata/financial-nonpayment.json", "Financial", "Nonpayment"},

		{"../testdata/history/history-residence.json", "History", "Residence"},
		{"../testdata/history/history-residence-unfinished-list.json", "History", "Residence"},
		{"../testdata/history/history-employment.json", "History", "Employment"},
		{"../testdata/history/history-employment-full.json", "History", "Employment"},
		{"../testdata/history/history-education.json", "History", "Education"},
		{"../testdata/history/history-federal.json", "History", "Federal"},

		{"../testdata/relationships-status-marital.json", "Relationships", "Marital"},
		{"../testdata/relationships-status-cohabitant.json", "Relationships", "Cohabitants"},
		{"../testdata/relationships-people.json", "Relationships", "People"},
		{"../testdata/relationships-relatives.json", "Relationships", "Relatives"},

		{"../testdata/citizenship-status.json", "Citizenship", "Status"},
		{"../testdata/citizenship-multiple.json", "Citizenship", "Multiple"},
		{"../testdata/citizenship-passports.json", "Citizenship", "Passports"},
		{"../testdata/citizenship-passports-thin.json", "Citizenship", "Passports"},

		{"../testdata/military-selective.json", "Military", "Selective"},
		{"../testdata/military-history.json", "Military", "History"},
		{"../testdata/military-disciplinary.json", "Military", "Disciplinary"},
		{"../testdata/military-foreign.json", "Military", "Foreign"},

		{"../testdata/foreign-passport.json", "Foreign", "Passport"},
		{"../testdata/foreign-contacts.json", "Foreign", "Contacts"},
		{"../testdata/foreign-travel.json", "Foreign", "Travel"},
		{"../testdata/foreign-activities-benefits.json", "Foreign", "BenefitActivity"},
		{"../testdata/foreign-activities-direct.json", "Foreign", "DirectActivity"},
		{"../testdata/foreign-activities-indirect.json", "Foreign", "IndirectActivity"},
		{"../testdata/foreign-activities-realestate.json", "Foreign", "RealEstateActivity"},
		{"../testdata/foreign-business-advice.json", "Foreign", "Advice"},
		{"../testdata/foreign-business-conferences.json", "Foreign", "Conferences"},
		{"../testdata/foreign-business-contact.json", "Foreign", "Contact"},
		{"../testdata/foreign-business-employment.json", "Foreign", "Employment"},
		{"../testdata/foreign-business-family.json", "Foreign", "Family"},
		{"../testdata/foreign-business-political.json", "Foreign", "Political"},
		{"../testdata/foreign-business-sponsorship.json", "Foreign", "Sponsorship"},
		{"../testdata/foreign-business-ventures.json", "Foreign", "Ventures"},
		{"../testdata/foreign-business-voting.json", "Foreign", "Voting"},

		{"../testdata/substance-drug-clearance.json", "Substance", "DrugClearanceUses"},
		{"../testdata/substance-drug-misuse.json", "Substance", "PrescriptionUses"},
		{"../testdata/substance-drug-ordered.json", "Substance", "OrderedTreatments"},
		{"../testdata/substance-drug-publicsafety.json", "Substance", "DrugPublicSafetyUses"},
		{"../testdata/substance-drug-purchase.json", "Substance", "DrugInvolvements"},
		{"../testdata/substance-drug-usage.json", "Substance", "DrugUses"},
		{"../testdata/substance-drug-voluntary.json", "Substance", "VoluntaryTreatments"},
		{"../testdata/substance-alcohol-negative.json", "Substance", "NegativeImpacts"},
		{"../testdata/substance-alcohol-ordered.json", "Substance", "OrderedCounselings"},
		{"../testdata/substance-alcohol-voluntary.json", "Substance", "VoluntaryCounselings"},
		{"../testdata/substance-alcohol-additional.json", "Substance", "ReceivedCounselings"},

		{"../testdata/legal-associations-activities-to-overthrow.json", "Legal", "ActivitiesToOverthrow"},
		{"../testdata/legal-associations-advocating.json", "Legal", "Advocating"},
		{"../testdata/legal-associations-engaged-in-terrorism.json", "Legal", "EngagedInTerrorism"},
		{"../testdata/legal-associations-membership-overthrow.json", "Legal", "MembershipOverthrow"},
		{"../testdata/legal-associations-membership-violence-or-force.json", "Legal", "MembershipViolence"},
		{"../testdata/legal-associations-terrorism-association.json", "Legal", "TerrorismAssociation"},
		{"../testdata/legal-associations-terrorist-organization.json", "Legal", "TerroristOrganization"},
		{"../testdata/legal-court.json", "Legal", "NonCriminalCourtActions"},
		{"../testdata/legal-investigations-debarred.json", "Legal", "Debarred"},
		{"../testdata/legal-investigations-history.json", "Legal", "History"},
		{"../testdata/legal-investigations-revoked.json", "Legal", "Revoked"},
		{"../testdata/legal-police-additionaloffenses.json", "Legal", "PoliceOtherOffenses"},
		{"../testdata/legal-police-domesticviolence.json", "Legal", "PoliceDomesticViolence"},
		{"../testdata/legal-police-offenses.json", "Legal", "PoliceOffenses"},
		{"../testdata/legal-technology-manipulating.json", "Legal", "Manipulating"},
		{"../testdata/legal-technology-unauthorized.json", "Legal", "Unauthorized"},
		{"../testdata/legal-technology-unlawful.json", "Legal", "Unlawful"},

		{"../testdata/psychological-competence.json", "Psychological", "Competence"},
		{"../testdata/psychological-consultations.json", "Psychological", "Consultations"},
		{"../testdata/psychological-diagnoses.json", "Psychological", "Diagnoses"},
		{"../testdata/psychological-conditions.json", "Psychological", "ExistingConditions"},
		{"../testdata/psychological-hospitalizations.json", "Psychological", "Hospitalizations"},
	}

	for _, secTest := range tests {
		section := readTestData(t, secTest.path)

		resp := saveJSON(services, section, account.ID)
		if resp.StatusCode != 200 {
			t.Fatal(fmt.Sprintf("Failed to save %s %s", secTest.section, secTest.subSection), resp.StatusCode)
		}

		formResp := getForm(services, account.ID)
		if formResp.StatusCode != 200 {
			t.Fatal(fmt.Sprintf("Failed to load %s %s", secTest.section, secTest.subSection), resp.StatusCode)
		}
		body := readBody(t, formResp)

		var form map[string]map[string]json.RawMessage
		jsonErr := json.Unmarshal([]byte(body), &form)
		if jsonErr != nil {
			t.Fatal(jsonErr)
		}

		rawSection, ok := form[secTest.section][secTest.subSection]
		if !ok {
			t.Fatal(fmt.Sprintf("The %s %s section is not in the returned form", secTest.section, secTest.subSection), resp.StatusCode)
		}

		compareGoldenJSON(t, rawSection, secTest.path)
	}

}

// TestSaveSections makes sure that calls to /save are addative.
func TestSaveSections(t *testing.T) {
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
	jsonErr := json.Unmarshal([]byte(body), &form)
	if jsonErr != nil {
		t.Fatal(jsonErr)
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

	nameSection := readTestData(t, "../testdata/identification/identification-name.json")

	resp = saveJSON(services, nameSection, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save Name", resp.StatusCode)
	}

	formResp = getForm(services, account.ID)
	if formResp.StatusCode != 200 {
		t.Fatal("Failed to load Name", resp.StatusCode)
	}
	body = readBody(t, formResp)

	jsonErr = json.Unmarshal([]byte(body), &form)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	rawName, ok := form["Identification"]["ApplicantName"]
	if !ok {
		t.Fatal("The name section is not in the returned form", form)
	}

	if !areEqualJSON(t, rawName, []byte(nameSection)) {
		fmt.Println("Not Equal", string(rawEmployment), employmentSection)
		t.Fatal("Didn't get the same thing back.")
	}

	rawEmploymentAgain, ok := form["History"]["Employment"]
	if !ok {
		t.Fatal("The employment history section is not in the returned form", form)
	}

	if !areEqualJSON(t, rawEmploymentAgain, []byte(employmentSection)) {
		fmt.Println("Not Equal", string(rawEmploymentAgain), employmentSection)
		t.Fatal("Didn't get the same thing back.")
	}

}
