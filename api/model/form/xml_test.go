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
	}

	for _, test := range tests {
		tmpl := defaultTemplate(test.Schema, test.Data)
		if tmpl == "" {
			t.Fatalf("XML template should not be empty")
		}
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
		"Foreign": map[string]interface{}{
			"Passport": readSectionData("testdata/foreign-passport.json"),
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
