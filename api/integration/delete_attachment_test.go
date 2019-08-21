package integration

import (
	"errors"
	"io/ioutil"
	gohttp "net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/mock"
	"github.com/gorilla/mux"
)

type errorDeleteAttachmentStore struct {
	mock.StorageService
}

func (s *errorDeleteAttachmentStore) DeleteAttachment(accountID int, attachmentID int) error {
	return errors.New("attachment error")
}

func TestDeleteAttachment(t *testing.T) {
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

	// -- now delete it
	delW, delReq := standardResponseAndRequest("DELETE", "/me/attachments/"+attachmentID+"/delete", nil, account)
	delReq = mux.SetURLVars(delReq, map[string]string{
		"id": attachmentID,
	})

	delAttachmentHandler := http.AttachmentDeleteHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	delAttachmentHandler.ServeHTTP(delW, delReq)

	delResp := delW.Result()

	if delResp.StatusCode != 200 {
		t.Fatal("Got an error back from DelApplication")
	}

	// -- deleting again should return an error.

	delAgainW := httptest.NewRecorder()

	delAttachmentHandler.ServeHTTP(delAgainW, delReq)

	delAgainResp := delAgainW.Result()

	if delAgainResp.StatusCode != 404 {
		t.Fatal("Got an error back from DelApplication")
	}

	// -- now fail to get it back

	getW, getReq := standardResponseAndRequest("GET", "/me/attachments/"+attachmentID, nil, account)
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

	if getResp.StatusCode != 404 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}
}

func TestDeleteAttachmentDisabled(t *testing.T) {
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

	// Disable attachments
	os.Setenv(api.AttachmentsEnabled, "0")
	// -- now try to delete it
	delW, delReq := standardResponseAndRequest("DELETE", "/me/attachments/"+attachmentID+"/delete", nil, account)
	delReq = mux.SetURLVars(delReq, map[string]string{
		"id": attachmentID,
	})

	delAttachmentHandler := http.AttachmentDeleteHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	delAttachmentHandler.ServeHTTP(delW, delReq)

	delResp := delW.Result()

	if delResp.StatusCode != gohttp.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			delResp.StatusCode, gohttp.StatusInternalServerError)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(delResp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Attachments is not implemented")
}

func TestDeleteAttachmentLockedAccount(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)
	// Lock account
	account.Status = api.StatusSubmitted

	delAttachmentHandler := http.AttachmentDeleteHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	delAttachmentHandler.ServeHTTP(w, indexReq)

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

func TestDeleteAttachmentError(t *testing.T) {
	var mockStore errorDeleteAttachmentStore
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	delAttachmentHandler := http.AttachmentDeleteHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    &mockStore,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	delAttachmentHandler.ServeHTTP(w, indexReq)

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
	confirmErrorMsg(t, responseJSON, "No identifier for attachment provided")
}
