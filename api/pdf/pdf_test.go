package pdf

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestPackage(t *testing.T) {
	application := applicationData(t)
	logger := &mock.LogService{}
	service := Service{Log: logger}

	templates := []api.ArchivalPdf{
		Certification,
		MedicalRelease,
		GeneralRelease,
		CreditRelease,
	}

	for _, pdf := range templates {
		if !service.IsSignatureAvailable(application, pdf) {
			continue
		}

		dat, err := service.CreatePdf(application, pdf)
		if err != nil {
			t.Fatalf(fmt.Sprintf("Error creating PDF from %s: %s", pdf.Template, err.Error()))
		}
		_ = dat
	}
}

func applicationData(t *testing.T) map[string]interface{} {
	return map[string]interface{}{
		"Identification": map[string]interface{}{
			"ApplicantName":       readSectionData("testdata/identification-name.json", t),
			"Contacts":            readSectionData("testdata/identification-contacts.json", t),
			"OtherNames":          readSectionData("testdata/identification-othernames.json", t),
			"ApplicantBirthDate":  readSectionData("testdata/identification-birthdate.json", t),
			"ApplicantBirthPlace": readSectionData("testdata/identification-birthplace.json", t),
			"ApplicantSSN":        readSectionData("testdata/identification-ssn.json", t),
			"Physical":            readSectionData("testdata/identification-physical.json", t),
		},
		"Submission": map[string]interface{}{
			"Releases": readSectionData("testdata/submission.json", t),
		},
		"History": map[string]interface{}{
			"Residence": readSectionData("testdata/history-residence.json", t),
		},
	}
}

func readSectionData(file string, t *testing.T) map[string]interface{} {
	b, err := ioutil.ReadFile(file)
	if err != nil {
		t.Fatalf("Error message %s", err)
		return map[string]interface{}{}
	}

	var js map[string]interface{}
	if err := json.Unmarshal(b, &js); err != nil {
		t.Fatalf("Error message %s", err)
		return map[string]interface{}{}
	}
	return js
}
