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

		created, err := service.CreatePdf(application, p, hex.EncodeToString(fauxHash[:]), "SF86")
		if err != nil {
			t.Fatalf("Error creating PDF from %s: %s", p.Name, err.Error())
		}

		referenceName := p.Name + "-SF86" + fileExtension

		rpath := path.Join(testdataDir, "attachments", referenceName)
		reference, err := ioutil.ReadFile(rpath)
		if err != nil {
			t.Fatalf("Error reading reference PDF: %s", err.Error())
		}

		if !bytes.Equal(created, reference) {
			tmpfile, err := ioutil.TempFile(path.Join(testdataDir, "attachments"), referenceName)
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

func Test85Package(t *testing.T) {

	application := applicationData(t)
	service := NewPDFService("./templates/")
	var fauxHash [sha256.Size]byte

	for _, p := range ReleasePDFs {
		if p.DocType == DocumentTypeMedicalRelease {
			continue
		}

		_, ok := service.SignatureAvailable(application, p)
		if !ok {
			continue
		}

		created, err := service.CreatePdf(application, p, hex.EncodeToString(fauxHash[:]), "SF85")
		if err != nil {
			t.Fatalf("Error creating PDF from %s: %s", p.Name, err.Error())
		}

		referenceName := p.Name + "-SF85" + fileExtension

		rpath := path.Join(testdataDir, "attachments", referenceName)
		reference, err := ioutil.ReadFile(rpath)
		if err != nil {
			t.Fatalf("Error reading reference PDF: %s", err.Error())
		}

		if !bytes.Equal(created, reference) {
			tmpfile, err := ioutil.TempFile(path.Join(testdataDir, "attachments"), referenceName)
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
