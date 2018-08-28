package eqip

import (
	"io/ioutil"
	"log"
	"net/http"
	"net/http/httptest"
	"path"
	"strings"
	"testing"
)

func newServer(t *testing.T, filepath string) *httptest.Server {
	return httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadFile(path.Join("testdata", filepath))
		if err != nil {
			t.Fatal(err)
		}
		w.WriteHeader(http.StatusOK)
		w.Write(b)
	}))
}

func TestImportRequestTls(t *testing.T) {
	ts := httptest.NewTLSServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	}))
	defer ts.Close()
	// Don't log TLS server errors to stderr
	ts.Config.ErrorLog = log.New(ioutil.Discard, "", 0)

	client := NewClient(ts.URL, testPrivateKeyPath)
	importReq := ImportRequest{}
	_, err := client.ImportRequest(&importReq)
	if err == nil || !strings.Contains(err.Error(), "x509") {
		t.Fatalf("Expected x509 error to be returned")
	}
}

func TestImportRequestHttp(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusInternalServerError)
	}))
	defer ts.Close()

	client := NewClient(ts.URL, testPrivateKeyPath)
	importReq := ImportRequest{}
	_, err := client.ImportRequest(&importReq)
	if err == nil || !strings.Contains(err.Error(), http.StatusText(http.StatusInternalServerError)) {
		t.Fatalf("Expected HTTP error to be returned")
	}
}

func TestMalformedResponse(t *testing.T) {
	ts := newServer(t, "malformedResponse.xml")
	defer ts.Close()

	client := NewClient(ts.URL, testPrivateKeyPath)
	importReq := ImportRequest{}
	_, err := client.ImportRequest(&importReq)
	if err == nil {
		t.Fatalf("Expected SOAP parsing error to be returned")
	}
}

func TestImportRequestResponse(t *testing.T) {
	ts := newServer(t, "validImportRequestResponse.xml")
	defer ts.Close()

	client := NewClient(ts.URL, testPrivateKeyPath)
	importReq := ImportRequest{}
	importResponse, err := client.ImportRequest(&importReq)
	if err != nil {
		t.Fatalf("Expected import request response but received %v", err)
	}
	resp := importResponse.ImportRequestResponse
	if resp.Return == nil {
		t.Fatal("Expected return element to be populated")
	}

	if resp.Return.RequestKey == nil {
		t.Fatal("Expected return.RequestKey element to be populated")
	}

	if resp.Return.RequestKey.RequestID != "reqid1234" {
		t.Fatalf("Expected RequestKey to be %v but got %v", "requid1234", resp.Return.RequestKey.RequestID)
	}

	if resp.Return.InitiatingAgency == nil {
		t.Fatal("Expected return.InitiatingAgency element to be populated")
	}

	if resp.Return.InitiatingAgency.AgencyID != 123 {
		t.Fatalf("Expected InitiatingAgency to be %v but got %v", 123, resp.Return.InitiatingAgency.AgencyID)
	}

	if !resp.Return.UserAleadyExisted {
		t.Fatal("Expected UserAleadyExisted to be true")
	}
}

func TestImportRequestEqipException(t *testing.T) {
	ts := newServer(t, "eqipWSException.xml")
	defer ts.Close()

	client := NewClient(ts.URL, testPrivateKeyPath)
	importResp, _ := client.ImportRequest(&ImportRequest{})
	err := importResp.Error()
	if err == nil {
		t.Fatal("Expected error to be returned")
	}
	wsErr, ok := err.(*ErrEqipWSException)
	if !ok {
		t.Fatal("Expected error to be of type EqipWSException")
	}
	expectedErr := ErrEqipWSException{
		Message:       "This is an EqipWSException",
		ErrorMessages: []string{"Error1", "Error2"},
	}

	if wsErr.Message != expectedErr.Message {
		t.Fatalf("Expected error to be %v but got %v", expectedErr.Message, wsErr.Message)
	}

	if len(wsErr.ErrorMessages) != len(expectedErr.ErrorMessages) {
		t.Fatal("Error Messages length does not match between expected and received")
	}

	for i := range wsErr.ErrorMessages {
		if wsErr.ErrorMessages[i] != expectedErr.ErrorMessages[i] {
			t.Fatalf("Expected error message at index %v to be %v but got %v",
				i,
				wsErr.ErrorMessages[i],
				expectedErr.ErrorMessages[i],
			)
		}
	}
}

func TestIsAlive(t *testing.T) {
	ts := newServer(t, "isAliveResponse.xml")
	defer ts.Close()

	client := NewClient(ts.URL, testPrivateKeyPath)
	err := client.IsAlive()
	if err != nil {
		t.Fatalf("Expected no errors but received %v", err)
	}
}
