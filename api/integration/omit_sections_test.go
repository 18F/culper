package integration

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"testing"

	"github.com/18F/e-QIP-prototype/api/admin"
	"github.com/18F/e-QIP-prototype/api/pdf"
	"github.com/18F/e-QIP-prototype/api/xml"
)

func Test85SectionsOmitted(t *testing.T) {
	services := cleanTestServices(t)

	xmlTemplatePath := "../templates/"
	xmlsvc := xml.NewXMLService(xmlTemplatePath)
	pdfTemplatePath := "../pdf/templates/"
	pdfsvc := pdf.NewPDFService(pdfTemplatePath)
	submitter := admin.NewSubmitter(services.db, services.store, xmlsvc, pdfsvc)

	// provision an 85
	account := create85TestAccount(t, services.db)
	fmt.Println(account)

	// load a complete scenario
	form := readTestData(t, "../testdata/complete-scenarios/SF85/test3.json")
	saveFormJSON(t, services, form, account)

	// convert to XML
	xml, _, xmlErr := submitter.FilesForSubmission(account.ID)
	if xmlErr != nil {
		t.Fatal(xmlErr)
	}

	// test that section is missing
	// fmt.Println("OUT", string(xml))

	if bytes.Contains(xml, []byte("<ForeignContacts")) {
		t.Log("Didn't remove ForeignContacts")
		t.Fail()
	}

	if bytes.Contains(xml, []byte("<ForeignTravels")) {
		t.Log("Didn't remove ForeignTravels")
		t.Fail()
	}

	// If a full complement of XSDs are present in the directory ./xsd, we attempt to use xmllint
	// to validate that the generated XML matches.
	_, statErr := os.Stat("xsds")
	if !os.IsNotExist(statErr) {
		filePath := "/tmp/sf85_omitted.xml"
		f, createErr := os.Create(filePath)
		if createErr != nil {
			t.Fatal(createErr)
		}
		_, writeErr := f.Write(xml)
		if writeErr != nil {
			t.Fatal(writeErr)
		}
		f.Close()

		linterArgs := []string{"--schema", "xsds/Incoming/SF85_2017-12-draft7_ImportFormat.xsd",
			"/tmp/sf85_omitted.xml", "--noout"}
		fmt.Println(linterArgs)
		output, err := exec.Command("xmllint", linterArgs...).CombinedOutput()
		if err != nil {
			t.Fatal("XML does not validate: " + string(output))
		}
	}

	t.Fatal("NOPE")
}

// test you can't submit a missing section
// test that it says SF85 now
