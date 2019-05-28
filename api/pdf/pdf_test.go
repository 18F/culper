package pdf

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"io/ioutil"
	"path"
	"testing"
)

const (
	testdataDir   = "./testdata"
	fileExtension = ".pdf"
)

func TestPackage(t *testing.T) {

	application := applicationData(t)
	service := NewPDFService("./templates/")
	var fauxHash [sha256.Size]byte

	for _, p := range ReleasePDFs {
		_, ok := service.SignatureAvailable(application, p)
		if !ok {
			continue
		}

		created, err := service.CreatePdf(application, p, hex.EncodeToString(fauxHash[:]))
		if err != nil {
			t.Fatalf("Error creating PDF from %s: %s", p.Template, err.Error())
		}

		rpath := path.Join(testdataDir, "attachments", p.Name+fileExtension)
		reference, err := ioutil.ReadFile(rpath)
		if err != nil {
			t.Fatalf("Error reading reference PDF: %s", err.Error())
		}

		if !bytes.Equal(created, reference) {
			tmpfile, err := ioutil.TempFile(testdataDir, p.Name+fileExtension)
			if err != nil {
				t.Fatalf("Error creating generated PDF: %s", err.Error())
			}
			defer tmpfile.Close()

			_, err = tmpfile.Write(created)
			if err != nil {
				t.Fatalf("Error writing generated PDF: %s", err.Error())
			}

			t.Errorf("Generated PDF (%s) does not match reference PDF (%s)",
				tmpfile.Name(), rpath)
		}
	}
}

func applicationData(t *testing.T) map[string]interface{} {
	return map[string]interface{}{
		"Identification": map[string]interface{}{
			"ApplicantName":       readSectionData("identification/identification-name.json", t),
			"Contacts":            readSectionData("identification/identification-contacts.json", t),
			"OtherNames":          readSectionData("identification/identification-othernames.json", t),
			"ApplicantBirthDate":  readSectionData("identification/identification-birthdate.json", t),
			"ApplicantBirthPlace": readSectionData("identification/identification-birthplace.json", t),
			"ApplicantSSN":        readSectionData("identification/identification-ssn.json", t),
			"Physical":            readSectionData("identification/identification-physical.json", t),
		},
		"Submission": map[string]interface{}{
			"Releases": readSectionData("submission.json", t),
		},
		"History": map[string]interface{}{
			"Residence": readSectionData("history/history-residence.json", t),
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
