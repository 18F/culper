package http

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRoot(t *testing.T) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	rec := httptest.NewRecorder()
	handler := http.HandlerFunc(RootHandler)
	handler.ServeHTTP(rec, req)
	if status := rec.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	expected := fmt.Sprintf("%s.%s", APIName, APIVersion)
	if rec.Header().Get("X-Eqip-Media-Type") != expected {
		t.Errorf("handler returned unexpected header: got %v want %v", rec.Header().Get("X-Eqip-Media-Type"), expected)
	}
}
