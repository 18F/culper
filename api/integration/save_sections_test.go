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
		{"../testdata/identification/identification-othernames-unfinished.json", "Identification", "OtherNames"},
		{"../testdata/identification/identification-birthdate.json", "Identification", "ApplicantBirthDate"},
		{"../testdata/identification/identification-birthplace.json", "Identification", "ApplicantBirthPlace"},
		{"../testdata/identification/identification-birthplace-full.json", "Identification", "ApplicantBirthPlace"},
		{"../testdata/identification/identification-ssn.json", "Identification", "ApplicantSSN"},
		{"../testdata/identification/identification-physical.json", "Identification", "Physical"},

		{"../testdata/financial/financial-bankruptcy.json", "Financial", "Bankruptcy"},
		{"../testdata/financial/financial-gambling.json", "Financial", "Gambling"},
		{"../testdata/financial/financial-taxes.json", "Financial", "Taxes"},
		{"../testdata/financial/financial-card.json", "Financial", "Card"},
		{"../testdata/financial/financial-credit.json", "Financial", "Credit"},
		{"../testdata/financial/financial-delinquent.json", "Financial", "Delinquent"},
		{"../testdata/financial/financial-nonpayment.json", "Financial", "Nonpayment"},

		{"../testdata/history/history-residence.json", "History", "Residence"},
		{"../testdata/history/history-residence-unfinished-list.json", "History", "Residence"},
		{"../testdata/history/history-employment.json", "History", "Employment"},
		{"../testdata/history/history-employment-full.json", "History", "Employment"},
		{"../testdata/history/history-education.json", "History", "Education"},
		{"../testdata/history/history-federal.json", "History", "Federal"},

		{"../testdata/relationships/relationships-status-marital.json", "Relationships", "Marital"},
		{"../testdata/relationships/relationships-status-cohabitant.json", "Relationships", "Cohabitants"},
		{"../testdata/relationships/relationships-people.json", "Relationships", "People"},
		{"../testdata/relationships/relationships-relatives.json", "Relationships", "Relatives"},

		{"../testdata/citizenship/citizenship-status.json", "Citizenship", "Status"},
		{"../testdata/citizenship/citizenship-multiple.json", "Citizenship", "Multiple"},
		{"../testdata/citizenship/citizenship-passports.json", "Citizenship", "Passports"},
		{"../testdata/citizenship/citizenship-passports-thin.json", "Citizenship", "Passports"},

		{"../testdata/military/military-selective.json", "Military", "Selective"},
		{"../testdata/military/military-history.json", "Military", "History"},
		{"../testdata/military/military-disciplinary.json", "Military", "Disciplinary"},
		{"../testdata/military/military-foreign.json", "Military", "Foreign"},

		{"../testdata/foreign/foreign-passport.json", "Foreign", "Passport"},
		{"../testdata/foreign/foreign-contacts.json", "Foreign", "Contacts"},
		{"../testdata/foreign/foreign-travel.json", "Foreign", "Travel"},
		{"../testdata/foreign/foreign-activities-benefits.json", "Foreign", "BenefitActivity"},
		{"../testdata/foreign/foreign-activities-direct.json", "Foreign", "DirectActivity"},
		{"../testdata/foreign/foreign-activities-indirect.json", "Foreign", "IndirectActivity"},
		{"../testdata/foreign/foreign-activities-realestate.json", "Foreign", "RealEstateActivity"},
		{"../testdata/foreign/foreign-business-advice.json", "Foreign", "Advice"},
		{"../testdata/foreign/foreign-business-conferences.json", "Foreign", "Conferences"},
		{"../testdata/foreign/foreign-business-contact.json", "Foreign", "Contact"},
		{"../testdata/foreign/foreign-business-employment.json", "Foreign", "Employment"},
		{"../testdata/foreign/foreign-business-family.json", "Foreign", "Family"},
		{"../testdata/foreign/foreign-business-political.json", "Foreign", "Political"},
		{"../testdata/foreign/foreign-business-sponsorship.json", "Foreign", "Sponsorship"},
		{"../testdata/foreign/foreign-business-ventures.json", "Foreign", "Ventures"},
		{"../testdata/foreign/foreign-business-voting.json", "Foreign", "Voting"},

		{"../testdata/substance/substance-drug-clearance.json", "Substance", "DrugClearanceUses"},
		{"../testdata/substance/substance-drug-misuse.json", "Substance", "PrescriptionUses"},
		{"../testdata/substance/substance-drug-ordered.json", "Substance", "OrderedTreatments"},
		{"../testdata/substance/substance-drug-publicsafety.json", "Substance", "DrugPublicSafetyUses"},
		{"../testdata/substance/substance-drug-purchase.json", "Substance", "DrugInvolvements"},
		{"../testdata/substance/substance-drug-usage.json", "Substance", "DrugUses"},
		{"../testdata/substance/substance-drug-voluntary.json", "Substance", "VoluntaryTreatments"},
		{"../testdata/substance/substance-alcohol-negative.json", "Substance", "NegativeImpacts"},
		{"../testdata/substance/substance-alcohol-ordered.json", "Substance", "OrderedCounselings"},
		{"../testdata/substance/substance-alcohol-voluntary.json", "Substance", "VoluntaryCounselings"},
		{"../testdata/substance/substance-alcohol-additional.json", "Substance", "ReceivedCounselings"},

		{"../testdata/legal/legal-associations-activities-to-overthrow.json", "Legal", "ActivitiesToOverthrow"},
		{"../testdata/legal/legal-associations-advocating.json", "Legal", "Advocating"},
		{"../testdata/legal/legal-associations-engaged-in-terrorism.json", "Legal", "EngagedInTerrorism"},
		{"../testdata/legal/legal-associations-membership-overthrow.json", "Legal", "MembershipOverthrow"},
		{"../testdata/legal/legal-associations-membership-violence-or-force.json", "Legal", "MembershipViolence"},
		{"../testdata/legal/legal-associations-terrorism-association.json", "Legal", "TerrorismAssociation"},
		{"../testdata/legal/legal-associations-terrorist-organization.json", "Legal", "TerroristOrganization"},
		{"../testdata/legal/legal-court.json", "Legal", "NonCriminalCourtActions"},
		{"../testdata/legal/legal-investigations-debarred.json", "Legal", "Debarred"},
		{"../testdata/legal/legal-investigations-history.json", "Legal", "History"},
		{"../testdata/legal/legal-investigations-revoked.json", "Legal", "Revoked"},
		{"../testdata/legal/legal-police-additionaloffenses.json", "Legal", "PoliceOtherOffenses"},
		{"../testdata/legal/legal-police-domesticviolence.json", "Legal", "PoliceDomesticViolence"},
		{"../testdata/legal/legal-police-offenses.json", "Legal", "PoliceOffenses"},
		{"../testdata/legal/legal-technology-manipulating.json", "Legal", "Manipulating"},
		{"../testdata/legal/legal-technology-unauthorized.json", "Legal", "Unauthorized"},
		{"../testdata/legal/legal-technology-unlawful.json", "Legal", "Unlawful"},

		{"../testdata/psychological/psychological-competence.json", "Psychological", "Competence"},
		{"../testdata/psychological/psychological-consultations.json", "Psychological", "Consultations"},
		{"../testdata/psychological/psychological-diagnoses.json", "Psychological", "Diagnoses"},
		{"../testdata/psychological/psychological-conditions.json", "Psychological", "ExistingConditions"},
		{"../testdata/psychological/psychological-hospitalizations.json", "Psychological", "Hospitalizations"},

		{"../testdata/submission.json", "Submission", "Releases"},
	}

	for _, secTest := range tests {

		t.Run(fmt.Sprintf("%s:%s", secTest.section, secTest.subSection), func(t *testing.T) {
			section := readTestData(t, secTest.path)

			resp := saveJSON(services, section, account)
			if resp.StatusCode != 200 {
				t.Fatal(fmt.Sprintf("Failed to save %s %s", secTest.section, secTest.subSection), resp.StatusCode)
			}

			formResp := getForm(services, account)
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
		})
	}

}

// TestSaveMultipleSections makes sure that calls to /save are addative.
func TestSaveMultipleSections(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	employmentSection := readTestData(t, "../testdata/history/history-employment-full.json")

	resp := saveJSON(services, employmentSection, account)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save Employment History", resp.StatusCode)
	}

	formResp := getForm(services, account)
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

	resp = saveJSON(services, nameSection, account)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save Name", resp.StatusCode)
	}

	formResp = getForm(services, account)
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

func TestDeleteApplication(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	section := readTestData(t, "../testdata/identification/identification-birthplace-full.json")

	resp := saveJSON(services, section, account)
	if resp.StatusCode != 200 {
		t.Fatal("Failed to save a section", resp.StatusCode)
	}

	delErr := services.store.DeleteApplication(account.ID)
	if delErr != nil {
		t.Fatal(delErr)
	}

	formResp := getForm(services, account)
	if formResp.StatusCode != 200 {
		t.Fatal(fmt.Sprintf("Failed to load form"), resp.StatusCode)
	}
	body := readBody(t, formResp)

	if string(body) != `{"Metadata":{"form_type":"SF86","form_version":"2017-07","type":"metadata"}}` {
		t.Fatal("Should have just got back the metadata")
	}

}
