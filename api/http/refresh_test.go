package http

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestRefreshHandler(t *testing.T) {

	var mockDB mock.DatabaseService

	var mockLog mock.LogService

	handler := RefreshHandler{
		Env:      nil,
		Log:      &mockLog,
		Database: &mockDB,
	}

	reqBody := strings.NewReader(validJSON)

	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req := httptest.NewRequest("POST", "/me/refresh", reqBody)
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
}
