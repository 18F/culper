package integration

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	gohttp "net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/mock"
	"github.com/18F/e-QIP-prototype/api/session"
)

type errorDeleteApplicationStore struct {
	mock.StorageService
}

func (s *errorDeleteApplicationStore) DeleteApplication(accountID int) error {
	return errors.New("delete application error")
}

func TestBasicAuthDisabled(t *testing.T) {
	// Basic Auth not enabled
	os.Setenv(api.BasicEnabled, "0")
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	account := createTestAccount(t, services.db)

	authMembership := api.BasicAuthMembership{
		AccountID: account.ID,
	}

	password := "so-basic"
	authMembership.HashPassword(password)

	_, saveErr := authMembership.Save(services.db, 0)
	if saveErr != nil {
		t.Fatal(saveErr)
	}

	loginRequestHandler := http.BasicAuthHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
		Session:  sessionService,
		Cookie:   http.NewSessionCookieService(true),
	}

	responseWriter := httptest.NewRecorder()

	reqBodyDict := map[string]string{
		"Username": account.Username,
		"Password": password,
	}

	json, jsonErr := json.Marshal(reqBodyDict)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	req := httptest.NewRequest("POST", "/basic", strings.NewReader(string(json)))

	loginRequestHandler.ServeHTTP(responseWriter, req)

	// confirm response succeeds
	resp := responseWriter.Result()

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
	confirmErrorMsg(t, responseJSON, api.BasicAuthNotImplemented)
}

func TestBasicNoPassword(t *testing.T) {
	// Basic Auth enabled
	os.Setenv(api.BasicEnabled, "1")
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	account := createTestAccount(t, services.db)

	authMembership := api.BasicAuthMembership{
		AccountID: account.ID,
	}

	password := ""
	authMembership.HashPassword(password)

	_, saveErr := authMembership.Save(services.db, 0)
	if saveErr != nil {
		t.Fatal(saveErr)
	}

	loginRequestHandler := http.BasicAuthHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
		Session:  sessionService,
		Cookie:   http.NewSessionCookieService(true),
	}

	responseWriter := httptest.NewRecorder()

	reqBodyDict := map[string]string{
		"Username": account.Username,
		"Password": password,
	}

	json, jsonErr := json.Marshal(reqBodyDict)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	req := httptest.NewRequest("POST", "/basic", strings.NewReader(string(json)))

	loginRequestHandler.ServeHTTP(responseWriter, req)

	// confirm response succeeds
	resp := responseWriter.Result()

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
	confirmErrorMsg(t, responseJSON, api.BasicAuthMissingPassword)
}
func TestBasicNoUsername(t *testing.T) {
	// Basic Auth enabled
	os.Setenv(api.BasicEnabled, "1")
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	account := createTestAccount(t, services.db)

	authMembership := api.BasicAuthMembership{
		AccountID: account.ID,
	}

	password := "sekrit"
	authMembership.HashPassword(password)

	_, saveErr := authMembership.Save(services.db, 0)
	if saveErr != nil {
		t.Fatal(saveErr)
	}

	loginRequestHandler := http.BasicAuthHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
		Session:  sessionService,
		Cookie:   http.NewSessionCookieService(true),
	}

	responseWriter := httptest.NewRecorder()

	reqBodyDict := map[string]string{
		"Username": "",
		"Password": password,
	}

	json, jsonErr := json.Marshal(reqBodyDict)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	req := httptest.NewRequest("POST", "/basic", strings.NewReader(string(json)))

	loginRequestHandler.ServeHTTP(responseWriter, req)

	// confirm response succeeds
	resp := responseWriter.Result()

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
	confirmErrorMsg(t, responseJSON, api.BasicAuthMissingUsername)
}
func TestBasicAccountError(t *testing.T) {
	// Basic Auth enabled
	os.Setenv(api.BasicEnabled, "1")
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	account := createTestAccount(t, services.db)

	authMembership := api.BasicAuthMembership{
		AccountID: account.ID,
	}

	password := "sekrit"
	authMembership.HashPassword(password)

	_, saveErr := authMembership.Save(services.db, 0)
	if saveErr != nil {
		t.Fatal(saveErr)
	}

	loginRequestHandler := http.BasicAuthHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
		Session:  sessionService,
		Cookie:   http.NewSessionCookieService(true),
	}

	responseWriter := httptest.NewRecorder()

	// pass in the wrong username
	reqBodyDict := map[string]string{
		"Username": "wronguser",
		"Password": password,
	}

	json, jsonErr := json.Marshal(reqBodyDict)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	req := httptest.NewRequest("POST", "/basic", strings.NewReader(string(json)))

	loginRequestHandler.ServeHTTP(responseWriter, req)

	// confirm response succeeds
	resp := responseWriter.Result()

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
	confirmErrorMsg(t, responseJSON, api.AccountUpdateError)
}

func TestBasicWrongPassword(t *testing.T) {
	// Basic Auth enabled
	os.Setenv(api.BasicEnabled, "1")
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	account := createTestAccount(t, services.db)

	authMembership := api.BasicAuthMembership{
		AccountID: account.ID,
	}

	password := "sekrit"
	authMembership.HashPassword(password)

	_, saveErr := authMembership.Save(services.db, 0)
	if saveErr != nil {
		t.Fatal(saveErr)
	}

	loginRequestHandler := http.BasicAuthHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
		Session:  sessionService,
		Cookie:   http.NewSessionCookieService(true),
	}

	responseWriter := httptest.NewRecorder()

	// pass in the wrong password
	reqBodyDict := map[string]string{
		"Username": account.Username,
		"Password": "wrong_password",
	}

	json, jsonErr := json.Marshal(reqBodyDict)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	req := httptest.NewRequest("POST", "/basic", strings.NewReader(string(json)))

	loginRequestHandler.ServeHTTP(responseWriter, req)

	// confirm response succeeds
	resp := responseWriter.Result()

	if resp.StatusCode != gohttp.StatusUnauthorized {
		t.Errorf("handler returned wrong status code: got %v want %v",
			resp.StatusCode, gohttp.StatusUnauthorized)
		t.Fail()
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, api.BasicAuthInvalid)
}
