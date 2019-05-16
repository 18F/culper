package integration

import (
	"bytes"
	"encoding/base64"
	"io/ioutil"
	"mime/multipart"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"

	"github.com/18F/e-QIP-prototype/api/http"
)

func TestSaveAttachment(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/certification.pdf"

	certificationBytes := readTestData(t, certificationPath)

	body := &bytes.Buffer{}

	formWriter := multipart.NewWriter(body)
	pdfWriter, writeErr := formWriter.CreateFormFile("file", "certification.pdf")
	if writeErr != nil {
		t.Log("Didn't get a file writer")
		t.Fatal()
	}

	pdfWriter.Write(certificationBytes)
	formWriter.Close()

	req := httptest.NewRequest("POST", "/me/attachments", body)
	req.Header.Set("Content-Type", formWriter.FormDataContentType())

	authCtx := http.SetAccountIDInRequestContext(req, account.ID)
	req = req.WithContext(authCtx)

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
		t.Fatal("Got an error back from CreateApplicaiton")
	}

	idBytes, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	attachmentID := string(idBytes)

	if attachmentID == "0" {
		t.Fatal("Should have gotten a real ID back instead of nothing")
	}

	// -- now get it back

	getReq := httptest.NewRequest("GET", "/me/attachments/"+attachmentID, nil)

	getAuthCtx := http.SetAccountIDInRequestContext(getReq, account.ID)
	getReq = getReq.WithContext(getAuthCtx)

	getReq = mux.SetURLVars(getReq, map[string]string{
		"id": attachmentID,
	})

	getW := httptest.NewRecorder()

	getAttachmentHandler := http.AttachmentGetHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	getAttachmentHandler.ServeHTTP(getW, getReq)

	getResp := getW.Result()

	if getResp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	// comes back as base64 encoded.

	attachment64, readErr := ioutil.ReadAll(getResp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	returnedAttachment, decodeErr := base64.StdEncoding.DecodeString(string(attachment64))
	if decodeErr != nil {
		t.Fatal(decodeErr)
	}

	if !bytes.Equal(returnedAttachment, certificationBytes) {
		t.Fatal("The returned attachment is not the same as the sent one")
	}
}
