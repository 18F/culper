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

// No errors just a counter
type saveStore struct {
	mock.StorageService
	saveCount int
}

func (s *saveStore) SaveSection(section api.Section, accountID int) error {
	s.saveCount = s.saveCount + 1
	return nil
}

// SaveSection throws ErrApplicationDoesNotExist then CreateApplication throws ErrApplicationAlreadyExists
// Aka race condition total failure nightmare
type saveStoreApplicationExistsError struct {
	mock.StorageService
	saveCount int
}

func (s *saveStoreApplicationExistsError) SaveSection(section api.Section, accountID int) error {
	s.saveCount = s.saveCount + 1
	return api.ErrApplicationDoesNotExist
}

func (s *saveStoreApplicationExistsError) CreateApplication(app api.Application) error {
	s.saveCount = s.saveCount + 1
	return api.ErrApplicationAlreadyExists
}

type saveStoreErrorResolves struct {
	mock.StorageService
	saveCount int
}

// SaveSection works once it has been called
func (s *saveStoreErrorResolves) SaveSection(section api.Section, accountID int) error {
	if s.saveCount >= 1 {
		s.saveCount = s.saveCount + 1
		return nil
	}
	s.saveCount = s.saveCount + 1
	return api.ErrApplicationDoesNotExist
}

func (s *saveStoreErrorResolves) CreateApplication(app api.Application) error {
	s.saveCount = s.saveCount + 1
	return api.ErrApplicationAlreadyExists
}

// This is for any error on SaveSection other than a ErrApplicationDoesNotExist
type saveStoreOtherSaveError struct {
	mock.StorageService
	saveCount int
}

func (s *saveStoreOtherSaveError) SaveSection(section api.Section, accountID int) error {
	s.saveCount = s.saveCount + 1
	return api.ErrApplicationAlreadyExists
}

// This is for any error on CreateApplication other than a ErrApplicationAlreadyExists
type saveStoreOtherCreateError struct {
	mock.StorageService
	saveCount int
}

func (s *saveStoreOtherCreateError) SaveSection(section api.Section, accountID int) error {
	s.saveCount = s.saveCount + 1
	return api.ErrApplicationDoesNotExist
}

func (s *saveStoreOtherCreateError) CreateApplication(app api.Application) error {
	s.saveCount = s.saveCount + 1
	return api.ErrApplicationDoesNotExist
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

	reqBody := strings.NewReader(validJSON)

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
			status, http.StatusBadRequest)
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Error converting payload into valid entity")
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

func TestSaveHandlerBadPayloadDeserialization(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStore

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}
	// Pass in bad JSON--undeserializeable
	requestJSON := `{[}`
	reqBody := strings.NewReader(requestJSON)

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
	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}
	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, api.PayloadDeserializeError)
}

func TestCreateApplicationExistsFailure(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStoreApplicationExistsError

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	reqBody := strings.NewReader(validJSON)

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
	if status := rr.Code; status != http.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusInternalServerError)
	}

	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}

	confirmErrorMsg(t, responseJSON, api.EntitySaveError)

	// Check that the db got called 3x
	if mockStore.saveCount != 3 {
		t.Errorf("didn't call the mock store 3 times.")
	}
}

func TestCreateApplicationAppDoesNotExistFailure(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStoreApplicationExistsError

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	reqBody := strings.NewReader(validJSON)

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
	if status := rr.Code; status != http.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusInternalServerError)
	}

	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}

	confirmErrorMsg(t, responseJSON, api.EntitySaveError)

	// Check that the db got called three times
	if mockStore.saveCount != 3 {
		t.Errorf("didn't call the mock store 3 times.")
	}
}

func TestSaveApplicationErrorResolves(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStoreErrorResolves

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	reqBody := strings.NewReader(validJSON)

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
	// Check that the db got called three times
	if mockStore.saveCount != 3 {
		t.Errorf("didn't call the mock store 3 times.")
	}
}

func TestOtherSaveAppFailure(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStoreOtherSaveError

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	reqBody := strings.NewReader(validJSON)

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
	if status := rr.Code; status != http.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusInternalServerError)
	}

	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}

	confirmErrorMsg(t, responseJSON, api.EntitySaveError)

	// Check that the db got called 1 times
	if mockStore.saveCount != 1 {
		t.Errorf("didn't call the mock store 1 time.")
	}
}

func TestOtherCreateApplicationFailure(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockStore saveStoreOtherCreateError

	var mockLog mock.LogService

	handler := SaveHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
		Store:    &mockStore,
	}

	reqBody := strings.NewReader(validJSON)

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
	if status := rr.Code; status != http.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusInternalServerError)
	}

	responseJSON, err := ioutil.ReadAll(rr.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}

	confirmErrorMsg(t, responseJSON, api.EntitySaveError)

	// Check that the db got called two times
	if mockStore.saveCount != 2 {
		t.Errorf("didn't call the mock store 2 times.")
	}
}
