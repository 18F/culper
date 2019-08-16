package http

import (
	"errors"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestFormHandlerLockedAccount(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore mock.StorageService

	var mockLog mock.LogService

	handler := FormHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	reqBody := strings.NewReader(validJSON)

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

type errorFormStore struct {
	mock.StorageService
	savedApplication api.Application
}

func (s errorFormStore) LoadApplication(accountID int) (api.Application, error) {
	return api.Application{}, errors.New("unexpected error")
}

func TestFormHandlerUnexpectedStoreErr(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore errorFormStore

	var mockLog mock.LogService

	handler := FormHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	reqBody := strings.NewReader(validJSON)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req := httptest.NewRequest("POST", "/me/save", reqBody)
	// This account has already has a submission
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
	if status := rr.Code; status != http.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusInternalServerError)
	}
	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Error serializing form")
}
