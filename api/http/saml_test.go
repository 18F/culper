package http

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/mock"
	"github.com/18F/e-QIP-prototype/api/saml"
)

func TestSamlRequestHandlerSamlNotEnabled(t *testing.T) {
	os.Setenv(api.SamlEnabled, "0")
	var mockDB mock.DatabaseService
	var mockLog mock.LogService

	samlService := &saml.Service{
		Log: &mockLog,
		Env: &env.Native{},
	}

	handler := SamlRequestHandler{
		Env:      &env.Native{},
		Log:      &mockLog,
		Database: &mockDB,
		SAML:     samlService,
	}

	reqBody := strings.NewReader(validJSON)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req := httptest.NewRequest("POST", "/me/saml/request", reqBody)
	account := api.Account{
		ID: 1,
	}
	req = req.WithContext(SetAccountAndSessionInRequestContext(req, account, api.Session{}))
	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()
	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	resp := rr.Result()

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusInternalServerError {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusInternalServerError)
	}

	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "SAML is not enabled")
}

func TestSamlRequestHandlerSamlSLONotEnabled(t *testing.T) {
	os.Setenv(api.SamlSLONotEnabled, "0")
	var mockDB mock.DatabaseService
	var mockLog mock.LogService

	samlService := &saml.Service{
		Log: &mockLog,
		Env: &env.Native{},
	}

	handler := SamlSLORequestHandler{
		Env:      &env.Native{},
		Log:      &mockLog,
		Database: &mockDB,
		SAML:     samlService,
	}

	reqBody := strings.NewReader(validJSON)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req := httptest.NewRequest("POST", "/me/saml/request", reqBody)
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
}
