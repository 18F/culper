package http

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestCacheHeadersSet(t *testing.T) {
	mockLog := mock.LogService{}
	cacheHandler := CacheHandler{
		Log: &mockLog,
	}
	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}
	wrappedHandler := cacheHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)
	respW := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(respW, req)
	resp := respW.Result()
	// Test the expected headers are set
	cacheControl := resp.Header.Get("Cache-Control")
	if cacheControl != "no-cache, no-store, must-revalidate" {
		t.Fatal("didn't get expected cache controle")
	}
	pragma := resp.Header.Get("Pragma")
	if pragma != "no-cache" {
		t.Fatal("didn't get expected pragma")
	}
	expiry := resp.Header.Get("Expires")
	if expiry != "0" {
		t.Fatal("didn't get expected expires")
	}

}
