package integration

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	gohttp "net/http"
	"os"
	"os/exec"
	"strconv"
	"testing"
	"time"

	"github.com/benbjohnson/clock"
	"github.com/gorilla/mux"

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
			fmt.Println("Does not match", referencePath, testXMLFile.Name())
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

	xmlService := xml.NewXMLServiceWithMockClock("../templates/", mockClock)
	pdfService := pdf.NewPDFService("../pdf/templates/")
	submitter := admin.NewSubmitter(services.db, services.store, xmlService, pdfService)

	submitHandler := http.SubmitHandler{
		Env:       services.env,
		Log:       services.log,
		Database:  services.db,
		Store:     services.store,
		Submitter: submitter,
	}

	// Setup a test scenario
	form := readTestData(t, "../testdata/complete-scenarios/test1.json")
	saveFormJSON(t, services, form, account)
	// in addition to the base form data, we need submission data to get the date signed
	submissionJSON := readTestData(t, "../testdata/submission-test1.json")
	resp := saveJSON(services, submissionJSON, account)
	if resp.StatusCode != 200 {
		t.Fatal("Didn't save the submission section")
	}

	// call the /form/submit handler. It's a dummy handler that just returns
	// the XML on success.
	w, req := standardResponseAndRequest("POST", "/me/form/submit", nil, account)
	submitHandler.ServeHTTP(w, req)

	submitResp := w.Result()

	if submitResp.StatusCode != 200 {
		t.Fatal("submit didn't succeed")
	}

	xml, readErr := ioutil.ReadAll(submitResp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	// Check that the XML is right
	checkXML(t, xml, "../testdata/complete-scenarios/test1.xml")

	// Check that the generated PDFs can be retrieved via the API
	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	// Enable Attachments
	os.Setenv(api.AttachmentsEnabled, "1")
	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)
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

	if len(retrievedAttachments) != 3 {
		t.Log("didn't get back the expected number of attachments!")
		t.Fail()
	}

	for _, attachment := range retrievedAttachments {
		if attachment.DocType == pdf.DocumentTypeInformationRelease {

			w, req := standardResponseAndRequest("GET", "/attachements/id", nil, account)
			req = mux.SetURLVars(req, map[string]string{
				"id": strconv.Itoa(attachment.ID),
			})

			getAttachmentHandler := http.AttachmentGetHandler{
				Env:      services.env,
				Log:      services.log,
				Database: services.db,
				Store:    services.store,
			}

			getAttachmentHandler.ServeHTTP(w, req)

			getResp := w.Result()

			if getResp.StatusCode != 200 {
				t.Fatal("Didn't successfully get the attachment")
			}

			attachmentBase64, readErr := ioutil.ReadAll(getResp.Body)
			if readErr != nil {
				t.Fatal(readErr)
			}

			attachmentBody, decodeErr := base64.StdEncoding.DecodeString(string(attachmentBase64))
			if decodeErr != nil {
				t.Fatal(decodeErr)
			}

			attachment.Raw = attachmentBody

			checkInfoRelease(t, attachment)
		}
	}
}

func TestLockedAccountSubmitter(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)
	account.Status = api.StatusSubmitted

	mockClock := clock.NewMock()
	const base = 1536570831 // Epoch seconds for September 10, 2018 PDT
	mockClock.Add(base * time.Second)

	xmlService := xml.NewXMLServiceWithMockClock("../templates/", mockClock)
	pdfService := pdf.NewPDFService("../pdf/templates/")
	submitter := admin.NewSubmitter(services.db, services.store, xmlService, pdfService)

	submitHandler := http.SubmitHandler{
		Env:       services.env,
		Log:       services.log,
		Database:  services.db,
		Store:     services.store,
		Submitter: submitter,
	}

	// call the /form/submit handler. It's a dummy handler that just returns
	// the XML on success.
	w, req := standardResponseAndRequest("POST", "/me/form/submit", nil, account)
	submitHandler.ServeHTTP(w, req)

	submitResp := w.Result()

	if submitResp.StatusCode != gohttp.StatusForbidden {
		t.Errorf("handler returned wrong status code: got %v want %v",
			submitResp.StatusCode, gohttp.StatusForbidden)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(submitResp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, api.AccountLocked)
}
