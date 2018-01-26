package form

import (
	"encoding/json"
	"io/ioutil"
	"testing"
)

func TestPackage(t *testing.T) {
	application := applicationData()
	tests := []struct {
		Schema string
		Data   map[string]interface{}
	}{
		{Schema: "identification.xml", Data: application},
		{Schema: "identification-name.xml", Data: readSectionData("testdata/identification-name.json")},
		{Schema: "identification-birth.xml", Data: readSectionData("testdata/identification-birth.json")},
		{Schema: "identification-eyecolor.xml", Data: readSectionData("testdata/identification-eyecolor.json")},
		{Schema: "identification-height.xml", Data: readSectionData("testdata/identification-height.json")},
		{Schema: "identification-othernames.xml", Data: readSectionData("testdata/identification-othernames.json")},
		{Schema: "identification-ssn.xml", Data: readSectionData("testdata/identification-ssn.json")},
		{Schema: "identification-sex.xml", Data: readSectionData("testdata/identification-sex.json")},
		{Schema: "identification-weight.xml", Data: readSectionData("testdata/identification-weight.json")},
		{Schema: "financial.xml", Data: application},
		{Schema: "financial-bankruptcy.xml", Data: readSectionData("testdata/financial-bankruptcy.json")},
		{Schema: "financial-card.xml", Data: readSectionData("testdata/financial-card.json")},
		{Schema: "financial-credit.xml", Data: readSectionData("testdata/financial-credit.json")},
		{Schema: "financial-delinquent.xml", Data: readSectionData("testdata/financial-delinquent.json")},
		{Schema: "financial-gambling.xml", Data: readSectionData("testdata/financial-gambling.json")},
		{Schema: "financial-nonpayment.xml", Data: readSectionData("testdata/financial-nonpayment.json")},
		{Schema: "financial-taxes.xml", Data: readSectionData("testdata/financial-taxes.json")},
		{Schema: "history.xml", Data: application},
		{Schema: "history-education.xml", Data: readSectionData("testdata/history-education.json")},
		{Schema: "history-employment.xml", Data: readSectionData("testdata/history-employment.json")},
		{Schema: "history-federal.xml", Data: readSectionData("testdata/history-federal.json")},
		{Schema: "history-residence.xml", Data: readSectionData("testdata/history-residence.json")},
		{Schema: "relationships.xml", Data: application},
		{Schema: "relatives-and-associates.xml", Data: readSectionData("testdata/relationships-relatives.json")},
		{Schema: "spouse-cohabitants.xml", Data: readSectionData("testdata/relationships-status-cohabitant.json")},
		{Schema: "spouse-former.xml", Data: readSectionData("testdata/spouse-former.json")},
		{Schema: "spouse-have-former.xml", Data: readSectionData("testdata/spouse-former.json")},
		{Schema: "spouse-marital-status.xml", Data: readSectionData("testdata/spouse-marital-status.json")},
		{Schema: "spouse-present-marriage.xml", Data: readSectionData("testdata/spouse-present-marriage.json")},
		{Schema: "personal-references.xml", Data: readSectionData("testdata/relationships-people.json")},
		{Schema: "citizenship.xml", Data: application},
		{Schema: "citizenship-status.xml", Data: application},
		{Schema: "citizenship-multiple.xml", Data: readSectionData("testdata/citizenship-multiple.json")},
		{Schema: "military.xml", Data: application},
		{Schema: "military-disciplinary.xml", Data: readSectionData("testdata/military-disciplinary.json")},
		{Schema: "military-foreign.xml", Data: readSectionData("testdata/military-foreign.json")},
		{Schema: "military-history.xml", Data: readSectionData("testdata/military-history.json")},
		{Schema: "military-selective.xml", Data: readSectionData("testdata/military-selective.json")},
		{Schema: "foreign.xml", Data: application},
		{Schema: "foreign-contacts.xml", Data: readSectionData("testdata/foreign-contacts.json")},
		{Schema: "foreign-direct-interests.xml", Data: readSectionData("testdata/foreign-activities-direct.json")},
		{Schema: "foreign-indirect-interests.xml", Data: readSectionData("testdata/foreign-activities-indirect.json")},
		{Schema: "foreign-realestate-holdings.xml", Data: readSectionData("testdata/foreign-activities-realestate.json")},
		{Schema: "foreign-financial-benefits.xml", Data: readSectionData("testdata/foreign-activities-benefits.json")},
		{Schema: "foreign-national-support.xml", Data: readSectionData("testdata/foreign-activities-support.json")},
		{Schema: "foreign-business-support-activities.xml", Data: readSectionData("testdata/foreign-business-advice.json")},
		{Schema: "foreign-business-consultancies.xml", Data: readSectionData("testdata/foreign-business-family.json")},
		{Schema: "foreign-business-job-offers.xml", Data: readSectionData("testdata/foreign-business-employment.json")},
		{Schema: "foreign-business-other-employment.xml", Data: readSectionData("testdata/foreign-business-ventures.json")},
		{Schema: "foreign-business-meetings.xml", Data: readSectionData("testdata/foreign-business-conferences.json")},
		{Schema: "foreign-business-government-contacts.xml", Data: readSectionData("testdata/foreign-business-contact.json")},
		{Schema: "foreign-business-sponsored-visits.xml", Data: readSectionData("testdata/foreign-business-sponsorship.json")},
		{Schema: "foreign-business-political-office.xml", Data: readSectionData("testdata/foreign-business-political.json")},
		{Schema: "foreign-business-voted.xml", Data: readSectionData("testdata/foreign-business-voting.json")},
		{Schema: "substance.xml", Data: application},
		{Schema: "substance-alcohol-additional.xml", Data: readSectionData("testdata/substance-alcohol-additional.json")},
		{Schema: "substance-alcohol-negative.xml", Data: readSectionData("testdata/substance-alcohol-negative.json")},
		{Schema: "substance-alcohol-ordered.xml", Data: readSectionData("testdata/substance-alcohol-ordered.json")},
		{Schema: "substance-alcohol-voluntary.xml", Data: readSectionData("testdata/substance-alcohol-voluntary.json")},
		{Schema: "substance-drug-clearance.xml", Data: readSectionData("testdata/substance-drug-clearance.json")},
		{Schema: "substance-drug-misuse.xml", Data: readSectionData("testdata/substance-drug-misuse.json")},
		{Schema: "substance-drug-ordered.xml", Data: readSectionData("testdata/substance-drug-ordered.json")},
		{Schema: "substance-drug-publicsafety.xml", Data: readSectionData("testdata/substance-drug-publicsafety.json")},
		{Schema: "substance-drug-purchase.xml", Data: readSectionData("testdata/substance-drug-purchase.json")},
		{Schema: "substance-drug-usage.xml", Data: readSectionData("testdata/substance-drug-usage.json")},
		{Schema: "substance-drug-voluntary.xml", Data: readSectionData("testdata/substance-drug-voluntary.json")},
	}

	for _, test := range tests {
		tmpl := defaultTemplate(test.Schema, test.Data)
		if tmpl == "" {
			t.Fatalf("XML template (%s) should not be empty", test.Schema)
		}
		//fmt.Println(tmpl)

	}
}

func applicationData() map[string]interface{} {
	return map[string]interface{}{
		"Identification": map[string]interface{}{
			"ApplicantName":       readSectionData("testdata/identification-name.json"),
			"Contacts":            readSectionData("testdata/identification-contacts.json"),
			"OtherNames":          readSectionData("testdata/identification-othernames.json"),
			"ApplicantBirthDate":  readSectionData("testdata/identification-birthdate.json"),
			"ApplicantBirthPlace": readSectionData("testdata/identification-birthplace.json"),
			"ApplicantSSN":        readSectionData("testdata/identification-ssn.json"),
			"Physical":            readSectionData("testdata/identification-physical.json"),
		},
		"Relationships": map[string]interface{}{
			"Marital":     readSectionData("testdata/relationships-status-marital.json"),
			"Cohabitants": readSectionData("testdata/relationships-status-cohabitant.json"),
			"People":      readSectionData("testdata/relationships-people.json"),
			"Relatives":   readSectionData("testdata/relationships-relatives.json"),
		},
		"History": map[string]interface{}{
			"Education":  readSectionData("testdata/history-education.json"),
			"Employment": readSectionData("testdata/history-employment.json"),
			"Federal":    readSectionData("testdata/history-federal.json"),
			"Residence":  readSectionData("testdata/history-residence.json"),
		},
		"Citizenship": map[string]interface{}{
			"Status":    readSectionData("testdata/citizenship-status.json"),
			"Multiple":  readSectionData("testdata/citizenship-multiple.json"),
			"Passports": readSectionData("testdata/citizenship-passports.json"),
		},
		"Military": map[string]interface{}{
			"Disciplinary": readSectionData("testdata/military-disciplinary.json"),
			"Foreign":      readSectionData("testdata/military-foreign.json"),
			"History":      readSectionData("testdata/military-history.json"),
			"Selective":    readSectionData("testdata/military-selective.json"),
		},
		"Foreign": map[string]interface{}{
			"Contacts":           readSectionData("testdata/foreign-contacts.json"),
			"DirectActivity":     readSectionData("testdata/foreign-activities-direct.json"),
			"IndirectActivity":   readSectionData("testdata/foreign-activities-indirect.json"),
			"RealEstateActivity": readSectionData("testdata/foreign-activities-realestate.json"),
			"BenefitActivity":    readSectionData("testdata/foreign-activities-benefits.json"),
			"Support":            readSectionData("testdata/foreign-activities-support.json"),
			"Advice":             readSectionData("testdata/foreign-business-advice.json"),
			"Family":             readSectionData("testdata/foreign-business-family.json"),
			"Employment":         readSectionData("testdata/foreign-business-employment.json"),
			"Ventures":           readSectionData("testdata/foreign-business-ventures.json"),
			"Conferences":        readSectionData("testdata/foreign-business-conferences.json"),
			"Contact":            readSectionData("testdata/foreign-business-contact.json"),
			"Sponsorship":        readSectionData("testdata/foreign-business-sponsorship.json"),
			"Political":          readSectionData("testdata/foreign-business-political.json"),
			"Voting":             readSectionData("testdata/foreign-business-voting.json"),
			"Passport":           readSectionData("testdata/foreign-passport.json"),
		},
		"Substance": map[string]interface{}{
			"ReceivedCounselings":  readSectionData("testdata/substance-alcohol-additional.json"),
			"NegativeImpacts":      readSectionData("testdata/substance-alcohol-negative.json"),
			"OrderedCounselings":   readSectionData("testdata/substance-alcohol-ordered.json"),
			"VoluntaryCounselings": readSectionData("testdata/substance-alcohol-voluntary.json"),
			"DrugClearanceUse":     readSectionData("testdata/substance-drug-clearance.json"),
			"PrescriptionUses":     readSectionData("testdata/substance-drug-misuse.json"),
			"OrderedTreatments":    readSectionData("testdata/substance-drug-ordered.json"),
			"DrugPublicSafetyUses": readSectionData("testdata/substance-drug-publicsafety.json"),
			"DrugInvolvements":     readSectionData("testdata/substance-drug-purchase.json"),
			"DrugUses":             readSectionData("testdata/substance-drug-usage.json"),
			"VoluntaryTreatments":  readSectionData("testdata/substance-drug-voluntary.json"),
		},
	}
}

func readSectionData(file string) map[string]interface{} {
	b, err := ioutil.ReadFile(file)
	if err != nil {
		return map[string]interface{}{}
	}

	var js map[string]interface{}
	if err := json.Unmarshal(b, &js); err != nil {
		return map[string]interface{}{}
	}
	return js
}
