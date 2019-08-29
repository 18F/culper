package http

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestAllowedOrigin(t *testing.T) {
	tests := []struct {
		env     string
		origin  string
		allowed bool
	}{
		{env: "", origin: "https://test.com:443", allowed: false},
		{env: "*", origin: "https://test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://sub.test.com:443", allowed: true},
		{env: "(test.com)", origin: "https://tester.com:443", allowed: false},
		{env: "https://test.com", origin: "https://test.com:443", allowed: true},
		{env: "https://test.com:443", origin: "https://test.com:443", allowed: true},
	}

	for _, test := range tests {
		os.Setenv("CORS_ALLOWED", test.env)
		if allowedOrigin(test.origin, mock.Native{}) != test.allowed {
			suffix := ""
			if !test.allowed {
				suffix = "not "
			}
			t.Errorf("Expected origin (%s) to be %sallowed with environment (%s)", test.origin, suffix, test.env)
		}
	}
}

func TestAllowedOriginSuccess(t *testing.T) {
	os.Setenv(api.CORSAllowed, "*")
	mockEnv := mock.Native{}
	mockLog := mock.LogService{}
	corsHandler := CORSHandler{
		Log: &mockLog,
		Env: mockEnv,
	}
	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}
	wrappedHandler := corsHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)
	req.Header.Set("Origin", "Omaha.com")
	respW := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(respW, req)
	resp := respW.Result()
	// Test the expected headers are set
	accessMethods := resp.Header.Get("Access-Control-Allow-Methods")
	if accessMethods != "POST, GET, OPTIONS, PUT, DELETE" {
		t.Fatal("didn't get expected access methods")
	}

	accessOrigin := resp.Header.Get("Access-Control-Allow-Origin")
	if accessOrigin != "Omaha.com" {
		t.Fatal("didn't get expected origin")
	}

	accessCredentials := resp.Header.Get("Access-Control-Allow-Credentials")
	if accessCredentials != "true" {
		t.Fatal("didn't get expected credentials")
	}

	accessHeaders := resp.Header.Get("Access-Control-Allow-Headers")
	if accessHeaders != "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization" {
		t.Fatal("didn't get expected headers")
	}

	accessExposeHeaders := resp.Header.Get("Access-Control-Expose-Headers")
	if accessExposeHeaders != "X-CSRF-Token" {
		t.Fatal("didn't get expected exposed headers")
	}
}

func TestAllowedOriginMismatch(t *testing.T) {
	os.Setenv(api.CORSAllowed, "IMPOSSIBLE")
	mockEnv := mock.Native{}
	mockLog := mock.LogService{}
	corsHandler := CORSHandler{
		Log: &mockLog,
		Env: mockEnv,
	}
	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}
	wrappedHandler := corsHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)
	req.Header.Set("Origin", "Omaha.com")
	respW := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(respW, req)

	// Check the status code is what we expect.
	if status := respW.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}

	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(respW.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}

	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, api.CORSDenied)
}

func TestAssignOrigin(t *testing.T) {
	os.Setenv(api.CORSAllowed, "*")
	mockEnv := mock.Native{}
	mockLog := mock.LogService{}
	corsHandler := CORSHandler{
		Log: &mockLog,
		Env: mockEnv,
	}
	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}
	wrappedHandler := corsHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)
	// Set Origin as empty string
	req.Header.Set("Origin", "")
	respW := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(respW, req)
	resp := respW.Result()
	accessMethods := resp.Header.Get("Access-Control-Allow-Methods")
	if accessMethods != "POST, GET, OPTIONS, PUT, DELETE" {
		t.Fatal("didn't get expected access methods")
	}
}

func TestAllowedOriginMaxAge(t *testing.T) {
	os.Setenv(api.CORSAllowed, "*")
	maxAge := "15"
	os.Setenv(api.CORSMaxAge, maxAge)
	mockEnv := mock.Native{}
	mockLog := mock.LogService{}
	corsHandler := CORSHandler{
		Log: &mockLog,
		Env: mockEnv,
	}
	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}
	wrappedHandler := corsHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)
	req.Header.Set("Origin", "SewerCity.com")
	respW := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(respW, req)
	resp := respW.Result()
	// Test 3 of the expected set headers
	accessMethods := resp.Header.Get("Access-Control-Max-Age")
	if accessMethods != maxAge {
		t.Fatal("didn't get expected maxAge")
	}
}
