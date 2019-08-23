package integration

import (
	"encoding/json"
	"io/ioutil"
	gohttp "net/http"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api/http"
)

// giveCookie takes a cookie from the response and applies it to the request
func giveCookie(t *testing.T, response *gohttp.Response, request *gohttp.Request, name string) {
	for _, cookie := range response.Cookies() {
		if cookie.Name == name {
			request.AddCookie(cookie)
			return
		}
	}
	t.Fatal("Cookie was not found in response", name)
}

func TestCSRFToken(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	statusRespW, statusReq := standardResponseAndRequest("GET", "/me/status", nil, account)

	statusHandler := http.StatusHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	authKey := []byte("123456789012345678901234567890")
	csrfMiddleware, csrfErr := http.NewCSRFMiddleware(services.log, authKey, true)
	if csrfErr != nil {
		t.Fatal(csrfErr)
	}

	wrappedHandler := csrfMiddleware.Middleware(statusHandler)

	wrappedHandler.ServeHTTP(statusRespW, statusReq)

	statusResp := statusRespW.Result()

	if statusResp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	csrfTokens := statusResp.Header["X-CSRF-Token"]
	if len(csrfTokens) != 1 {
		t.Fatal("No CSRF Token included in /status call")
	}

	token := csrfTokens[0]
	if len(token) == 0 {
		t.Fatal("Got nothing for the token")
	}

	// Now, make a save call without the token
	idSection := readTestData(t, "../testdata/identification/identification-birthplace-full.json")

	badRespW, badReq := standardResponseAndRequest("POST", "/me/save", strings.NewReader(string(idSection)), account)
	giveCookie(t, statusResp, badReq, "_gorilla_csrf")

	saveHandler := http.SaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	wrappedSaveHandler := csrfMiddleware.Middleware(saveHandler)

	wrappedSaveHandler.ServeHTTP(badRespW, badReq)

	badSaveResp := badRespW.Result()

	if badSaveResp.StatusCode != 403 {
		t.Log("Should not have saved without CSRF protection. Got: ", badSaveResp.StatusCode)
		t.Fail()
	}

	badBytes, readErr := ioutil.ReadAll(badSaveResp.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	var errorsJSON map[string][]map[string]string
	jsonErr := json.Unmarshal(badBytes, &errorsJSON)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	message, ok := errorsJSON["errors"][0]["message"]
	if !ok {
		t.Fatal("Error with message missing from response")
	}

	if message != "The state modifying request is missing a CSRF Token" {
		t.Log("Got the wrong message for a missing token: ", message)
		t.Fail()
	}

}

func TestGoodCSRFToken(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	statusRespW, statusReq := standardResponseAndRequest("GET", "/me/status", nil, account)

	statusHandler := http.StatusHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	authKey := []byte("123456789012345678901234567890")
	csrfMiddleware, csrfErr := http.NewCSRFMiddleware(services.log, authKey, true)
	if csrfErr != nil {
		t.Fatal(csrfErr)
	}

	wrappedHandler := csrfMiddleware.Middleware(statusHandler)

	wrappedHandler.ServeHTTP(statusRespW, statusReq)

	statusResp := statusRespW.Result()

	if statusResp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	csrfTokens := statusResp.Header["X-CSRF-Token"]
	if len(csrfTokens) != 1 {
		t.Fatal("No CSRF Token included in /status call")
	}

	token := csrfTokens[0]
	if len(token) == 0 {
		t.Fatal("Got nothing for the token")
	}

	idSection := readTestData(t, "../testdata/identification/identification-birthplace-full.json")

	saveHandler := http.SaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	wrappedSaveHandler := csrfMiddleware.Middleware(saveHandler)

	// now make a request with a good token
	goodRespW, goodReq := standardResponseAndRequest("POST", "/me/save", strings.NewReader(string(idSection)), account)
	giveCookie(t, statusResp, goodReq, "_gorilla_csrf")

	goodReq.Header.Set("X-CSRF-Token", token)

	wrappedSaveHandler.ServeHTTP(goodRespW, goodReq)

	goodSaveRep := goodRespW.Result()
	if goodSaveRep.StatusCode != 200 {
		t.Fatal("Should have saved with CSRF protection. Got: ", goodSaveRep.StatusCode)
	}

}

func TestGarbageCSRFToken(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)

	statusRespW, statusReq := standardResponseAndRequest("GET", "/me/status", nil, account)

	statusHandler := http.StatusHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	authKey := []byte("123456789012345678901234567890")
	csrfMiddleware, csrfErr := http.NewCSRFMiddleware(services.log, authKey, true)
	if csrfErr != nil {
		t.Fatal(csrfErr)
	}

	wrappedHandler := csrfMiddleware.Middleware(statusHandler)

	wrappedHandler.ServeHTTP(statusRespW, statusReq)

	statusResp := statusRespW.Result()

	if statusResp.StatusCode != 200 {
		t.Log("Got an error back from GetApplication")
		t.Fail()
	}

	csrfTokens := statusResp.Header["X-CSRF-Token"]
	if len(csrfTokens) != 1 {
		t.Fatal("No CSRF Token included in /status call")
	}

	token := csrfTokens[0]
	if len(token) == 0 {
		t.Fatal("Got nothing for the token")
	}

	// Now, with a garbage token
	idSection := readTestData(t, "../testdata/identification/identification-birthplace-full.json")

	saveHandler := http.SaveHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	wrappedSaveHandler := csrfMiddleware.Middleware(saveHandler)

	garbageRespW, garbageReq := standardResponseAndRequest("POST", "/me/save", strings.NewReader(string(idSection)), account)
	giveCookie(t, statusResp, garbageReq, "_gorilla_csrf")

	garbageReq.Header.Set("X-CSRF-Token", "garbage-token")

	wrappedSaveHandler.ServeHTTP(garbageRespW, garbageReq)

	garbageRep := garbageRespW.Result()
	if garbageRep.StatusCode != 403 {
		t.Fatal("Should NOT have saved with garbage CSRF protection. Got: ", garbageRep.StatusCode)
	}

	badBytes, readErr := ioutil.ReadAll(garbageRep.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	var errorsJSON map[string][]map[string]string
	jsonErr := json.Unmarshal(badBytes, &errorsJSON)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	message, ok := errorsJSON["errors"][0]["message"]
	if !ok {
		t.Fatal("Error with message missing from response")
	}

	if message != "The state modifying request has an invalid CSRF Token" {
		t.Log("Got the wrong message for a missing token: ", message)
		t.Fail()
	}

}

func TestCSRFTokenSetsAuthKey(t *testing.T) {
	services := cleanTestServices(t)

	authKey := []byte("")
	_, csrfErr := http.NewCSRFMiddleware(services.log, authKey, true)
	if csrfErr != nil {
		t.Fatal(csrfErr)
	}
}
