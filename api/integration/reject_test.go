package integration

import (
	"encoding/json"
	"io/ioutil"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/admin"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/pdf"
	"github.com/18F/e-QIP-prototype/api/xml"
)

func TestDeleteSingaturePDFs(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	xmlService := xml.NewXMLService("../templates/")
	pdfService := pdf.NewPDFService("../pdf/templates/")
	submitter := admin.NewSubmitter(services.db, services.store, xmlService, pdfService)

	submitHandler := http.SubmitHandler{
		Env:       services.env,
		Log:       services.log,
		Database:  services.db,
		Store:     services.store,
		Submitter: submitter,
	}

	// First, upload an attachment.
	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account.ID)

	w := httptest.NewRecorder()

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	createAttachmentHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Fatal("Got an error back from CreateAttachment")
	}

	// Created an uploaded attachment.

	// Now submit, which will generate signatures.
	// Setup a test scenario
	form := readTestData(t, "../testdata/complete-scenarios/test1.json")
	saveFormJSON(t, services, form, account.ID)
	// in addition to the base form data, we need submission data to get the date signed
	submissionJSON := readTestData(t, "../testdata/submission-test1.json")
	saveResp := saveJSON(services, submissionJSON, account.ID)
	if saveResp.StatusCode != 200 {
		t.Fatal("Didn't save the submission section")
	}

	// call the /form/submit handler. It's a dummy handler that just returns
	// the XML on success.
	w, submitReq := standardResponseAndRequest("POST", "/me/form/submit", nil, account.ID)
	submitHandler.ServeHTTP(w, submitReq)

	submitResp := w.Result()

	if submitResp.StatusCode != 200 {
		t.Fatal("submit didn't succeed")
	}

	// Reject this submission
	rejector := admin.NewRejecter(services.db, services.store, nil)
	err := rejector.Reject(account)
	if err != nil {
		t.Fatal("Failed to reject account: ", err)
	}

	// Finally, check that only the orignally uploaded attachment remains
	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account.ID)

	listAttachmentHandler.ServeHTTP(w, indexReq)

	indexResp := w.Result()

	if indexResp.StatusCode != 200 {
		t.Log("Got an error back from ListAttachments")
		t.Fail()
	}

	body, readErr := ioutil.ReadAll(indexResp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	retrievedAttachments := []api.Attachment{}

	jsonErr := json.Unmarshal(body, &retrievedAttachments)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	if len(retrievedAttachments) != 1 {
		t.Fatal("Got back too many attachments: ", len(retrievedAttachments))
	}

}
