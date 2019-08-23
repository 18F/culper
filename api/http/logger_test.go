package http

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestLoggerMiddlewareSUccess(t *testing.T) {
	mockLog := mock.LogService{}
	loggingHandler := LoggingHandler{
		Log: &mockLog,
	}
	handler := func(w http.ResponseWriter, r *http.Request) {
		return
	}
	wrappedHandler := loggingHandler.Middleware(http.HandlerFunc(handler))
	req := httptest.NewRequest("GET", "/i/love/dogs", nil)

	respW := httptest.NewRecorder()
	wrappedHandler.ServeHTTP(respW, req)
}
