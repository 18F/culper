package http

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

type saveStore struct {
	mock.StorageService
	saveCount int
}

func (s *saveStore) SaveSection(section api.Section, accountID int) error {
	s.saveCount = s.saveCount + 1
	return nil
}

func TestSaveHandler(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStore

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	requestJSON := `
    {
       "type":"identification.name",
       "props":{
          "Name":{
             "type":"name",
             "props":{
                "first":"MacRae",
                "firstInitialOnly":false,
                "last":"Fenton",
                "lastInitialOnly":false,
                "middle":"William",
                "middleInitialOnly":false,
                "noMiddleName":false,
                "suffix":"",
                "suffixOther":""
             }
          }
       }
    }`
	reqBody := strings.NewReader(requestJSON)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req := httptest.NewRequest("POST", "/me/save", reqBody)
	account := api.Account{
		ID: 1,
	}
	req = req.WithContext(SetAccountAndSessionInRequestContext(req, account, api.Session{}))
	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()
	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := ``
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}

	// Check that the db got called
	if mockStore.saveCount != 1 {
		t.Errorf("never called the mock store.")
	}
}

func TestSaveHandlerBadEntity(t *testing.T) {

	var mockDB mock.DatabaseService
	mockDB.SelectFn = func(query interface{}) error {
		return nil
	}

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
	}

	requestJSON := `
    {
       "hello": "there"
    }`
	reqBody := strings.NewReader(requestJSON)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req := httptest.NewRequest("POST", "/me/save", reqBody)
	account := api.Account{
		ID: 1,
	}
	req = req.WithContext(SetAccountAndSessionInRequestContext(req, account, api.Session{}))
	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()
	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.
	expected := `{"errors":[{"message":"Error converting payload into valid entity"}]}` + "\n"
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestSaveHandlerLockedAccount(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStore

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	requestJSON := `
    {
       "type":"identification.name",
       "props":{
          "Name":{
             "type":"name",
             "props":{
                "first":"MacRae",
                "firstInitialOnly":false,
                "last":"Fenton",
                "lastInitialOnly":false,
                "middle":"William",
                "middleInitialOnly":false,
                "noMiddleName":false,
                "suffix":"",
                "suffixOther":""
             }
          }
       }
    }`
	reqBody := strings.NewReader(requestJSON)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req := httptest.NewRequest("POST", "/me/save", reqBody)
	// This account has already has a submission
	account := api.Account{
		ID:     1,
		Status: api.StatusSubmitted,
	}
	req = req.WithContext(SetAccountAndSessionInRequestContext(req, account, api.Session{}))

	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()
	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusForbidden {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusForbidden)
	}
	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "The account is currently locked")
}
