package integration

import (
	"bytes"
	"encoding/base64"
	"errors"
	"io/ioutil"
	"mime/multipart"
	gohttp "net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gorilla/mux"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func postAttachmentRequest(t *testing.T, filename string, filebytes []byte, account api.Account) *gohttp.Request {
	t.Helper()

	body := &bytes.Buffer{}

	formWriter := multipart.NewWriter(body)
	pdfWriter, writeErr := formWriter.CreateFormFile("file", filename)
	if writeErr != nil {
		t.Fatal("Didn't get a file writer")
	}

	pdfWriter.Write(filebytes)
	formWriter.Close()

	req := httptest.NewRequest("POST", "/me/attachments", body)
	req.Header.Set("Content-Type", formWriter.FormDataContentType())

	authCtx := http.SetAccountAndSessionInRequestContext(req, account, api.Session{})
	req = req.WithContext(authCtx)

	return req
}

func TestSaveAttachment(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account)

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

	idBytes, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	attachmentID := string(idBytes)

	if attachmentID == "0" {
		t.Fatal("Should have gotten a real ID back instead of nothing")
	}

	// -- now get it back

	getW, getReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	getReq = mux.SetURLVars(getReq, map[string]string{
		"id": attachmentID,
	})

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
func TestSaveAttachmentDisabled(t *testing.T) {
	// Attachments not enabled
	os.Setenv(api.AttachmentsEnabled, "0")

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	saveAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	// Don't need real file to upload since we expect error first
	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	saveAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachments is not implemented")
}

func TestSaveAttachmentLockedAccount(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)
	// Lock account
	account.Status = api.StatusSubmitted

	saveAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	// Don't need file to upload since we expect to error first
	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	saveAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusForbidden {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusForbidden)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "The account is currently locked")
}

func TestSaveAttachmentNoFile(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	saveAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	saveAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusBadRequest)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "No attachment file found in multipart form data")
}

func TestSaveAttachmentTooBig(t *testing.T) {
	// Set FileMaximumSize very small
	os.Setenv(api.FileMaximumSize, "1")
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account)

	w := httptest.NewRecorder()

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	createAttachmentHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachment file size exceeded maximum allowed")
	// Set FileMaximumSize back to default
	os.Setenv(api.FileMaximumSize, "5000000")
}

type errorCreateAttachmentStore struct {
	mock.StorageService
}

func (s *errorCreateAttachmentStore) CreateAttachment(attachment *api.Attachment) error {
	return errors.New("attachment error")
}

func TestCreateAttachmentError(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	var mockStore errorCreateAttachmentStore
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account)

	w := httptest.NewRecorder()

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    &mockStore,
	}

	createAttachmentHandler.ServeHTTP(w, req)

	resp := w.Result()

	if resp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachment file failed to save in persistent storage")
}

func TestGetAttachmentsDisabled(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account)

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

	idBytes, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	attachmentID := string(idBytes)

	if attachmentID == "0" {
		t.Fatal("Should have gotten a real ID back instead of nothing")
	}

	// Now disable Attachments
	os.Setenv(api.AttachmentsEnabled, "0")
	// -- now try to get it back
	getW, getReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	getReq = mux.SetURLVars(getReq, map[string]string{
		"id": attachmentID,
	})

	getAttachmentHandler := http.AttachmentGetHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	getAttachmentHandler.ServeHTTP(getW, getReq)

	getResp := getW.Result()
	if getResp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			getResp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(getResp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachments is not implemented")
}

func TestGetAttachmentBadID(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/signature-form.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "signature-form.pdf", certificationBytes, account)

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

	_, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	// Use invalid number
	attachmentID := "NaN"

	// -- now try to get it back
	getW, getReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	getReq = mux.SetURLVars(getReq, map[string]string{
		"id": attachmentID,
	})

	getAttachmentHandler := http.AttachmentGetHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	getAttachmentHandler.ServeHTTP(getW, getReq)

	getResp := getW.Result()

	if getResp.StatusCode != gohttp.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusBadRequest)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(getResp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "No identifier for attachment provided")
}
