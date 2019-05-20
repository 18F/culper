package integration

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http/httptest"
	"os"
	"os/exec"
	"testing"
	"time"

	"github.com/benbjohnson/clock"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/pdf"
	"github.com/18F/e-QIP-prototype/api/xml"
)

// checkXML compares xml against the reference
func checkXML(t *testing.T, testXML []byte, referencePath string) {
	// convert the test to a tmp file with xmllint --format
	testLintCmd := exec.Command("xmllint", "--format", "-")
	testLintCmd.Stdin = bytes.NewReader(testXML)
	var testLintOut bytes.Buffer
	testLintCmd.Stdout = &testLintOut
	testCmdErr := testLintCmd.Run()
	if testCmdErr != nil {
		t.Fatal(testCmdErr)
	}

	testXMLFile, tmpErr := ioutil.TempFile("", "")
	if tmpErr != nil {
		t.Fatal(tmpErr)
	}

	testXMLFile.Write(testLintOut.Bytes())
	testXMLFile.Close()

	// run diff against them.
	diffCmd := exec.Command("diff", "-w", testXMLFile.Name(), referencePath)
	var diffOut bytes.Buffer
	diffCmd.Stdout = &diffOut
	diffErr := diffCmd.Run()
	if diffErr != nil {
		_, badExit := diffErr.(*exec.ExitError)
		if badExit {
			fmt.Println("Does not match", referencePath)
			fmt.Println(string(diffOut.Bytes()))
		}
		t.Fatal(diffErr)
	}

	rmErr := os.Remove(testXMLFile.Name())
	if rmErr != nil {
		t.Fatal(rmErr)
	}

}

func checkInfoRelease(t *testing.T, release api.Attachment) {
	t.Helper()

	refrenceBytes := readTestData(t, "../testdata/attachments/release-info-test1.pdf")

	if !bytes.Equal(release.Raw, refrenceBytes) {
		t.Log("Didn't get the exact same thing back!")
		t.Fail()

		releaseFile, tmpErr := ioutil.TempFile("", "")
		if tmpErr != nil {
			t.Fatal(tmpErr)
		}

		releaseFile.Write(release.Raw)
		releaseFile.Close()

		fmt.Println("Generated Release PDF: ", releaseFile.Name())
	}

}

func TestSubmitter(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	mockClock := clock.NewMock()
	const base = 1536570831 // Epoch seconds for September 10, 2018 PDT
	mockClock.Add(base * time.Second)

	fmt.Println("HIHIHIH", mockClock.Now())

	xmlService := xml.NewXMLServiceWithMockClock(mockClock)
	pdfService := pdf.NewPDFService()

	form := readTestData(t, "../testdata/complete-scenarios/test1.json")
	saveFormJSON(t, services, form, account.ID)
	// in addition to the base form data, we need submission data to get the date signed
	submissionJSON := readTestData(t, "../testdata/submission.json")
	resp := saveJSON(services, submissionJSON, account.ID)
	if resp.StatusCode != 200 {
		t.Fatal("Didn't save the submission section")
	}

	submitter := admin.NewSubmitter(services.db, services.store, xmlService, pdfService)

	// Make the Call to generate files/xml
	xml, attachments, submitErr := submitter.FilesForSubmission(account.ID)
	if submitErr != nil {
		t.Fatal("Failed to prep the submission materials", submitErr)
	}

	// Check that the XML is right
	checkXML(t, xml, "../testdata/complete-scenarios/test1.xml")

	// check that the attachments are right
	if len(attachments) != 4 {
		t.Log("Should have gotten 4 attachments")
		t.Fail()
	}

	for _, attachment := range attachments {
		if attachment.DocType == "REL" {
			checkInfoRelease(t, attachment)
		}
	}

	// Check that the generated PDFs can be retrieved via the API
	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	indexReq := httptest.NewRequest("GET", "/me/attachments/", nil)

	getAuthCtx := http.SetAccountIDInRequestContext(indexReq, account.ID)
	indexReq = indexReq.WithContext(getAuthCtx)

	w := httptest.NewRecorder()

	listAttachmentHandler.ServeHTTP(w, indexReq)

	indexResp := w.Result()

	if indexResp.StatusCode != 200 {
		t.Log("Got an error back from ListAttachments")
		t.Fail()
	}

	// comes back as JSON, leaving out the body

	body, readErr := ioutil.ReadAll(indexResp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	retrievedAttachments := []api.Attachment{}

	jsonErr := json.Unmarshal(body, &retrievedAttachments)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	if len(retrievedAttachments) != 4 {
		t.Fatal("didn't get back the same number of attachments!")
	}

}
