package integration

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	gohttp "net/http"
	"net/http/httptest"
	"os"
	"path"
	"strconv"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/mock"
)

type errorListAttachmentStore struct {
	mock.StorageService
}

func (s *errorListAttachmentStore) ListAttachmentsMetadata(accountID int) ([]api.Attachment, error) {
	return []api.Attachment{}, errors.New("attachment error")
}

func TestListAttachments(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	services := cleanTestServices(t)
	defer services.closeDB()
	account := createTestAccount(t, services.store)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:   services.env,
		Log:   services.log,
		Store: services.store,
	}

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:   services.env,
		Log:   services.log,
		Store: services.store,
	}

	createdAttachments := map[int]api.Attachment{}

	attachmentPaths := []string{"../testdata/attachments/signature-form-SF86.pdf", "../testdata/attachments/release-medical-SF86.pdf"}

	for _, attachmentPath := range attachmentPaths {

		attachmentBytes := readTestData(t, attachmentPath)

		filename := path.Base(attachmentPath)
		req := postAttachmentRequest(t, filename, attachmentBytes, account)
		w := httptest.NewRecorder()

		createAttachmentHandler.ServeHTTP(w, req)

		resp := w.Result()

		if resp.StatusCode != 200 {
			t.Fatal("Got an error back from CreateAttachment")
		}

		idBytes, readErr := ioutil.ReadAll(resp.Body)
		if readErr != nil {
			t.Fatal(readErr)
		}

		attachmentID, atoiErr := strconv.Atoi(string(idBytes))
		if atoiErr != nil {
			t.Fatal("Didn't get a number back", string(idBytes))
		}

		if attachmentID == 0 {
			t.Fatal("Should have gotten a real ID back instead of nothing")
		}

		createdAttachments[attachmentID] = api.Attachment{
			Filename: filename,
			Size:     int64(len(attachmentBytes)),
		}

	}

	// -- now get it back

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	listAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	if resp.StatusCode != 200 {
		t.Fatal("Got an error back from ListAttachments", string(body))
	}

	// comes back as JSON, leaving out the body

	retrievedAttachments := []api.Attachment{}

	jsonErr := json.Unmarshal(body, &retrievedAttachments)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	if len(retrievedAttachments) != len(createdAttachments) {
		t.Fatal("didn't get back the same number of attachments!")
	}

	for _, attachment := range retrievedAttachments {
		createdAttachment, ok := createdAttachments[attachment.ID]

		if !ok {
			t.Fatal("Got back an attachment with a different ID than one we created")
		}

		if createdAttachment.Filename != attachment.Filename {
			t.Log("We didn't get back matching filenames", createdAttachment.Filename, attachment.Filename)
			t.Fail()
		}

		if createdAttachment.Size != attachment.Size {
			t.Log("We didn't get back matching sizes", createdAttachment.Size, attachment.Size)
			t.Fail()
		}
	}

}

func TestListAttachmentDisabled(t *testing.T) {
	// Attachments not enabled
	os.Setenv(api.AttachmentsEnabled, "0")
	services := cleanTestServices(t)
	defer services.closeDB()
	account := createTestAccount(t, services.store)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:   services.env,
		Log:   services.log,
		Store: services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	listAttachmentHandler.ServeHTTP(w, indexReq)

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

func TestListAttachmentError(t *testing.T) {
	var mockStore errorListAttachmentStore
	services := cleanTestServices(t)
	defer services.closeDB()
	account := createTestAccount(t, services.store)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:   services.env,
		Log:   services.log,
		Store: &mockStore,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	listAttachmentHandler.ServeHTTP(w, indexReq)

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
	confirmErrorMsg(t, responseJSON, "Attachment file not found")
}

func TestListNoAttachments(t *testing.T) {
	// Attachments enabled
	os.Setenv(api.AttachmentsEnabled, "1")
	services := cleanTestServices(t)
	defer services.closeDB()
	account := createTestAccount(t, services.store)

	listAttachmentHandler := http.AttachmentListHandler{
		Env:   services.env,
		Log:   services.log,
		Store: services.store,
	}

	w, indexReq := standardResponseAndRequest("GET", "/me/attachments/", nil, account)

	listAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Log("Got an error back from ListAttachments")
		t.Fail()
	}

	// comes back as JSON, leaving out the body

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	if string(body) != "[]\n" {
		t.Log("Should have returned an empty array, got", string(body))
		t.Fail()
	}

}
