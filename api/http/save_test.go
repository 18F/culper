package http

import (
    "fmt"
    "net/http"
    "net/http/httptest"
    "strings"
    "testing"

    "github.com/18F/e-QIP-prototype/api/mock"
)

func TestSaveHandler(t *testing.T) {

    var mockDB mock.DatabaseService
    mockDB.SelectFn = func(query interface{}) error {
        fmt.Println("SELECTING", query)
        return nil
    }

    var mockLog mock.LogService

    handler := SaveHandler{
        Env:      nil,
        Log:      &mockLog,
        Token:    nil,
        Database: &mockDB,
    }

    requestJSON := `
    {
       "type":"identification.name",
       "props":{
          "Name":{
             "type":"name",
             "props":{
                "first":"MacRae",
                "firstInitialOnly":false,
                "last":"Fenton",
                "lastInitialOnly":false,
                "middle":"William",
                "middleInitialOnly":false,
                "noMiddleName":false,
                "suffix":"",
                "suffixOther":""
             }
          }
       }
    }`
    reqBody := strings.NewReader(requestJSON)

    // Create a request to pass to our handler. We don't have any query parameters for now, so we'll
    // pass 'nil' as the third parameter.
    req := httptest.NewRequest("POST", "/me/save", reqBody)
    accountID := 1
    req = req.WithContext(SetAccountIDInRequestContext(req, accountID))
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
    expected := `{"Errors":null}` + "\n"
    if rr.Body.String() != expected {
        t.Errorf("handler returned unexpected body: got %v want %v",
            rr.Body.String(), expected)
    }

    // Check that the db got called
    if mockDB.SelectCount != 1 {
        t.Errorf("never called the mock db.")
    }
}

func TestSaveHandlerBadEntity(t *testing.T) {

    var mockDB mock.DatabaseService
    mockDB.SelectFn = func(query interface{}) error {
        fmt.Println("SELECTING", query)
        return nil
    }

    var mockLog mock.LogService

    handler := SaveHandler{
        Env:      nil,
        Log:      &mockLog,
        Token:    nil,
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
    accountID := 1
    req = req.WithContext(SetAccountIDInRequestContext(req, accountID))
    // We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
    rr := httptest.NewRecorder()
    // Our handlers satisfy http.Handler, so we can call their ServeHTTP method
    // directly and pass in our Request and ResponseRecorder.
    handler.ServeHTTP(rr, req)

    // Check the status code is what we expect.
    if status := rr.Code; status != http.StatusBadRequest {
        t.Errorf("handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }

    // Check the response body is what we expect.
    expected := `{"errors":[{"message":"Error converting payload into valid entity"}]}` + "\n"
    if rr.Body.String() != expected {
        t.Errorf("handler returned unexpected body: got %v want %v",
            rr.Body.String(), expected)
    }
}
