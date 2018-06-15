package pdf

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestPackage(t *testing.T) {
	// Change working dir to parent so code under test is
	// executed in same working directory as in production.
	os.Chdir("..")

	application := applicationData(t)
	logger := &mock.LogService{}
	service := Service{Log: logger}
	var fauxHash [sha256.Size]byte

	for _, p := range DocumentTypes {
		_, ok := service.SignatureAvailable(application, p)
		if !ok {
			continue
		}

		dat, err := service.CreatePdf(application, p, api.FormatShaSum(fauxHash))
		if err != nil {
			t.Fatalf(fmt.Sprintf("Error creating PDF from %s: %s", p.Template, err.Error()))
		}
		_ = dat
	}

	// Restore working dir
	os.Chdir("pdf")
}

func applicationData(t *testing.T) map[string]interface{} {
	return map[string]interface{}{
		"Identification": map[string]interface{}{
			"ApplicantName":       readSectionData("identification-name.json", t),
			"Contacts":            readSectionData("identification-contacts.json", t),
			"OtherNames":          readSectionData("identification-othernames.json", t),
			"ApplicantBirthDate":  readSectionData("identification-birthdate.json", t),
			"ApplicantBirthPlace": readSectionData("identification-birthplace.json", t),
			"ApplicantSSN":        readSectionData("identification-ssn.json", t),
			"Physical":            readSectionData("identification-physical.json", t),
		},
		"Submission": map[string]interface{}{
			"Releases": readSectionData("submission.json", t),
		},
		"History": map[string]interface{}{
			"Residence": readSectionData("history-residence.json", t),
		},
	}
}

func readSectionData(basename string, t *testing.T) map[string]interface{} {
	b, err := ioutil.ReadFile(path.Join("pdf/testdata", basename))
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
