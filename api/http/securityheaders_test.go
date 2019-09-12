package http

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestDisableSLL(t *testing.T) {

	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}

	// Test SSL disabled
	os.Setenv(api.DevDisableSSL, "1")
	mockEnv := mock.Native{}
	mockLog := mock.LogService{}
	securityHandler := SecurityHandler{
		Log: &mockLog,
		Env: mockEnv,
	}

	wrappedHandler := securityHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)
	responseWriter := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(responseWriter, req)
	resp := responseWriter.Result()

	// Test that the "Strict-Transport-Security" header is not set
	value := resp.Header.Get("Strict-Transport-Security")
	if value != "" {
		t.Fatal("Strict-Transport-Security header was set, but should have been disabled.")
	}
}

func TestEnableSLL(t *testing.T) {

	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}

	// Test SSL enabled
	os.Setenv(api.DevDisableSSL, "0")
	mockEnv := mock.Native{}
	mockLog := mock.LogService{}
	securityHandler := SecurityHandler{
		Log: &mockLog,
		Env: mockEnv,
	}

	wrappedHandler := securityHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)
	responseWriter := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(responseWriter, req)
	resp := responseWriter.Result()

	// Test that the "Strict-Transport-Security" header is set
	value := resp.Header.Get("Strict-Transport-Security")
	if value == "" || value != "max-age = 31536000; includeSubDomains" {
		t.Fatal("Strict-Transport-Security header was not set, but should have been enabled.")
	}
}
