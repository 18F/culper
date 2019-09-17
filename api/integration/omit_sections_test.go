package integration

import (
	"bytes"
	"fmt"
	"net/http"
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

	scenarios := []string{
		"../testdata/complete-scenarios/SF85/test1.json",
		"../testdata/complete-scenarios/SF85/test2.json",
		"../testdata/complete-scenarios/SF85/test3.json",
	}

	for _, scenario := range scenarios {

		// provision an 85
		account := create85TestAccount(t, services.db)
		fmt.Println(account)

		// load a complete scenario
		form := readTestData(t, scenario)
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

		t.Log("Scenario: ", scenario, "validated sucessfully.")

	}
}

func Test85CleranceGranted(t *testing.T) {
	services := cleanTestServices(t)

	xmlTemplatePath := "../templates/"
	xmlsvc := xml.NewXMLService(xmlTemplatePath)
	pdfTemplatePath := "../pdf/templates/"
	pdfsvc := pdf.NewPDFService(pdfTemplatePath)
	submitter := admin.NewSubmitter(services.db, services.store, xmlsvc, pdfsvc)

	scenario := "../testdata/complete-scenarios/SF85/test3.json"

	// provision an 85
	account := create85TestAccount(t, services.db)
	fmt.Println(account)

	// load a complete scenario
	form := readTestData(t, scenario)
	saveFormJSON(t, services, form, account)

	// First try with a clearance granted:
	grantedJSON := readTestData(t, "../testdata/legal/legal-investigations-85-clerance-granted.json")
	grantedResp := saveJSON(services, grantedJSON, account)
	if grantedResp.StatusCode != http.StatusOK {
		t.Fatal("Didn't even save the granted clerance")
	}

	// convert to XML
	xml, _, xmlErr := submitter.FilesForSubmission(account.ID)
	if xmlErr != nil {
		t.Fatal(xmlErr)
	}

	if !bytes.Contains(xml, []byte("<ClearanceGranted")) {
		t.Log("Didn't put in CleranceGranted")
		t.Fail()
	}

	if !bytes.Contains(xml, []byte("<ClearanceLevel")) {
		t.Log("Didn't include ClearanceLevel")
		t.Fail()
	}

	// Next, try with clearance not granted
	notGrantedJSON := readTestData(t, "../testdata/legal/legal-investigations-85-clerance-not-granted.json")
	notGrantedResp := saveJSON(services, notGrantedJSON, account)
	if notGrantedResp.StatusCode != http.StatusOK {
		t.Fatal("Didn't even save the granted clerance")
	}

	// convert to XML
	notGrantedXML, _, xmlErr := submitter.FilesForSubmission(account.ID)
	if xmlErr != nil {
		t.Fatal(xmlErr)
	}

	if !bytes.Contains(notGrantedXML, []byte("<ClearanceGranted")) {
		t.Log("Didn't put in CleranceGranted")
		t.Fail()
	}

	if bytes.Contains(notGrantedXML, []byte("<ClearanceLevel")) {
		t.Log("Should have omitted CleranceLevel ClearanceLevel")
		t.Fail()
	}

}

func Test85PSectionsOmitted(t *testing.T) {
	t.Skip("Skipping until 85P releases are added")
	services := cleanTestServices(t)

	xmlTemplatePath := "../templates/"
	xmlsvc := xml.NewXMLService(xmlTemplatePath)
	pdfTemplatePath := "../pdf/templates/"
	pdfsvc := pdf.NewPDFService(pdfTemplatePath)
	submitter := admin.NewSubmitter(services.db, services.store, xmlsvc, pdfsvc)

	scenarios := []string{
		"../testdata/complete-scenarios/SF85P/test1.json",
		"../testdata/complete-scenarios/SF85P/test2.json",
	}

	for _, scenario := range scenarios {

		// provision an 85
		account := create85PTestAccount(t, services.db)
		fmt.Println(account)

		// load a complete scenario
		form := readTestData(t, scenario)
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

		if !bytes.Contains(xml, []byte("<ForeignTravels")) {
			t.Log("Didn't leave ForeignTravels")
			t.Fail()
		}

		// If a full complement of XSDs are present in the directory ./xsd, we attempt to use xmllint
		// to validate that the generated XML matches.
		_, statErr := os.Stat("xsds")
		if !os.IsNotExist(statErr) {
			filePath := "/tmp/sf85P_omitted.xml"
			f, createErr := os.Create(filePath)
			if createErr != nil {
				t.Fatal(createErr)
			}
			_, writeErr := f.Write(xml)
			if writeErr != nil {
				t.Fatal(writeErr)
			}
			f.Close()

			linterArgs := []string{"--schema", "xsds/Incoming/SF85P_2017-10-draft3_ImportFormat.xsd",
				"/tmp/sf85P_omitted.xml", "--noout"}
			fmt.Println(linterArgs)
			output, err := exec.Command("xmllint", linterArgs...).CombinedOutput()
			if err != nil {
				t.Fatal("XML does not validate: " + string(output))
			}
		}

		t.Log("Scenario: ", scenario, "validated sucessfully.")

	}
}
