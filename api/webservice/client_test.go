package webservice

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestImportRequestResponse(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadFile("./testdata/validImportRequestResponse.xml")
		if err != nil {
			t.Fatal(err)
		}
		w.Write(b)
	}))
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

//func TestWebservice(t *testing.T) {
//filename := os.Getenv("DEBUG_WS_FILENAME")
//b, err := ioutil.ReadFile(filename)
//if err != nil {
//t.Error(err)
//}

//var js map[string]interface{}
//if err := json.Unmarshal(b, &js); err != nil {
//t.Error(err)
//}

//xml := string(form.DefaultTemplate("application.xml", js))
//importRequest, err := newImportRequest(js, xml)
//if err != nil {
//t.Error(err)
//}

//url := os.Getenv("WS_URL")
//cert := os.Getenv("WS_CERT")
//client := NewClient(url, cert)

//importResp, err := client.ImportRequest(importRequest)
//if err != nil {
//t.Error(err)
//}
//wsErr := importResp.Error()
//if wsErr != nil {
//switch e := wsErr.(type) {
//case *ErrEqipWSException:
//for _, msg := range e.ErrorMessages {
//fmt.Println(msg)
//}
//fmt.Println("Total: ", len(e.ErrorMessages))
//}
//} else {
//fmt.Println(importResp.ImportRequestResponse.Keys())
//fmt.Println(string(importResp.ResponseBody))
//}
//}

//func newImportRequest(application map[string]interface{}, xmlContent string) (*ImportRequest, error) {
//var ciAgencyUserPseudoSSN bool
//ciAgencyIDEnv := os.Getenv("WS_CALLERINFO_AGENCY_ID")
//if ciAgencyIDEnv == "" {
//return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencyID)
//}
//ciAgencyUserSSNEnv := os.Getenv("WS_CALLERINFO_AGENCY_USER_SSN")
//if ciAgencyUserSSNEnv == "" {
//return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencySSN)
//}
//agencyIDEnv := os.Getenv("WS_AGENCY_ID")
//if agencyIDEnv == "" {
//return nil, fmt.Errorf(logmsg.WebserviceMissingAgencyID)
//}
//agencyGroupIDEnv := os.Getenv("WS_AGENCY_GROUP_ID")
//ciAgencyUserPseudoSSNEnv := os.Getenv("WS_CALLERINFO_AGENCY_USER_PSEUDOSSN")
//if ciAgencyUserPseudoSSNEnv == "" {
//return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencyPseudoSSN)
//}
//b, err := strconv.ParseBool(ciAgencyUserPseudoSSNEnv)
//if err != nil {
//return nil, fmt.Errorf(logmsg.WebserviceMissingCallerInfoAgencyPseudoSSN)
//}
//ciAgencyUserPseudoSSN = b

//ci := NewCallerInfo(ciAgencyIDEnv, ciAgencyUserPseudoSSN, ciAgencyUserSSNEnv)
//return NewImportRequest(ci, agencyIDEnv, agencyGroupIDEnv, application, xmlContent)
//}
