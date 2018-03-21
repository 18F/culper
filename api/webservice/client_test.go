package webservice

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

//func TestImportRequestResponse(t *testing.T) {
//ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//b, err := ioutil.ReadFile("./testdata/validImportRequestResponse.xml")
//if err != nil {
//t.Fatal(err)
//}
//w.Write(b)
//}))
//defer ts.Close()

//client := NewClient(ts.URL, testPrivateKeyPath)
//importReq := ImportRequest{}
//importResponse, err := client.ImportRequest(&importReq)
//if err != nil {
//t.Fatalf("Expected import request response but received %v", err)
//}
//if importResponse.Return == nil {
//t.Fatal("Expected return element to be populated")
//}

//if importResponse.Return.RequestKey == nil {
//t.Fatal("Expected return.RequestKey element to be populated")
//}

//if importResponse.Return.RequestKey.RequestID != "reqid1234" {
//t.Fatalf("Expected RequestKey to be %v but got %v", "requid1234", importResponse.Return.RequestKey.RequestID)
//}

//if importResponse.Return.InitiatingAgency == nil {
//t.Fatal("Expected return.InitiatingAgency element to be populated")
//}

//if importResponse.Return.InitiatingAgency.AgencyID != 123 {
//t.Fatalf("Expected InitiatingAgency to be %v but got %v", 123, importResponse.Return.InitiatingAgency.AgencyID)
//}

//if !importResponse.Return.UserAleadyExisted {
//t.Fatal("Expected UserAleadyExisted to be true")
//}
//}

func TestImportRequestEqipException(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadFile("./testdata/eqipWSException.xml")
		if err != nil {
			t.Fatal(err)
		}
		w.Write(b)
	}))
	defer ts.Close()

	client := NewClient(ts.URL, testPrivateKeyPath)
	_, err := client.ImportRequest(&ImportRequest{})
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
		t.Fatal("Expected error to be %v but got %v", expectedErr.Message, wsErr.Message)
	}

	if len(wsErr.ErrorMessages) != len(expectedErr.ErrorMessages) {
		t.Fatal("Error Messages length does not match between expected and received")
	}

	for i, _ := range wsErr.ErrorMessages {
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
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadFile("./testdata/isAliveResponse.xml")
		if err != nil {
			t.Fatal(err)
		}
		w.Write(b)
	}))
	defer ts.Close()

	client := NewClient(ts.URL, testPrivateKeyPath)
	err := client.IsAlive()
	if err != nil {
		t.Fatal("Expected no errors but received %v", err)
	}
}
