package pdf

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"io/ioutil"
	"os"
	"path"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

const (
	packageDir  = "pdf"
	testdataDir = packageDir + "/testdata"
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

		created, err := service.CreatePdf(application, p, hex.EncodeToString(fauxHash[:]))
		if err != nil {
			t.Fatalf("Error creating PDF from %s: %s", p.Template, err.Error())
		}

		rpath := path.Join(testdataDir, p.Name+".pdf")
		reference, err := ioutil.ReadFile(rpath)
		if err != nil {
			t.Fatalf("Error reading reference PDF: %s", err.Error())
		}

		if !bytes.Equal(created, reference) {
			tmpfile, err := ioutil.TempFile("", p.Name)
			if err != nil {
				t.Fatalf("Error saving generated PDF: %s", err.Error())
			}

			t.Errorf("Generated PDF (%s) does not match reference PDF (%s)",
				tmpfile.Name(), rpath)
		}
	}

	// Restore working dir
	os.Chdir(packageDir)
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
	b, err := ioutil.ReadFile(path.Join(testdataDir, basename))
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
