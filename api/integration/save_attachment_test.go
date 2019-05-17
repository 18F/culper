package integration

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"io/ioutil"
	"mime/multipart"
	gohttp "net/http"
	"net/http/httptest"
	"path"
	"strconv"
	"testing"

	"github.com/gorilla/mux"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
)

func postAttachmentRequest(t *testing.T, filename string, filebytes []byte) *gohttp.Request {

	body := &bytes.Buffer{}

	formWriter := multipart.NewWriter(body)
	pdfWriter, writeErr := formWriter.CreateFormFile("file", filename)
	if writeErr != nil {
		t.Log("Didn't get a file writer")
		t.Fatal()
	}

	pdfWriter.Write(filebytes)
	formWriter.Close()

	req := httptest.NewRequest("POST", "/me/attachments", body)
	req.Header.Set("Content-Type", formWriter.FormDataContentType())

	return req
}

func TestSaveAttachment(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/certification.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "certification.pdf", certificationBytes)

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

func TestListAttachments(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	createAttachmentHandler := http.AttachmentSaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	createdAttachments := map[int]api.Attachment{}

	attachmentPaths := []string{"../testdata/attachments/certification.pdf", "../testdata/attachments/general_release.pdf"}

	for _, attachmentPath := range attachmentPaths {

		attachmentBytes := readTestData(t, attachmentPath)

		filename := path.Base(attachmentPath)
		req := postAttachmentRequest(t, filename, attachmentBytes)

		authCtx := http.SetAccountIDInRequestContext(req, account.ID)
		req = req.WithContext(authCtx)

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

	indexReq := httptest.NewRequest("GET", "/me/attachments/", nil)

	getAuthCtx := http.SetAccountIDInRequestContext(indexReq, account.ID)
	indexReq = indexReq.WithContext(getAuthCtx)

	// indexReq = mux.SetURLVars(indexReq, map[string]string{
	// 	"id": attachmentID,
	// })

	w := httptest.NewRecorder()

	listAttachmentHandler := http.AttachmentListHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	listAttachmentHandler.ServeHTTP(w, indexReq)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Log("Got an error back from ListApplications")
		t.Fail()
	}

	// comes back as JSON, leaving out the body

	body, readErr := ioutil.ReadAll(resp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

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

func TestDeleteAttachment(t *testing.T) {

	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	certificationPath := "../testdata/attachments/certification.pdf"

	certificationBytes := readTestData(t, certificationPath)

	req := postAttachmentRequest(t, "certification.pdf", certificationBytes)

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

	delReq := httptest.NewRequest("DELETE", "/me/attachments/"+attachmentID+"/delete", nil)
	delAuthCtx := http.SetAccountIDInRequestContext(delReq, account.ID)
	delReq = delReq.WithContext(delAuthCtx)
	delReq = mux.SetURLVars(delReq, map[string]string{
		"id": attachmentID,
	})

	delW := httptest.NewRecorder()

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

	if getResp.StatusCode != 404 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

}
