package integration

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	gohttp "net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/http"
	"github.com/18F/e-QIP-prototype/api/saml"
	"github.com/18F/e-QIP-prototype/api/session"
)

func makeAuthenticatedFormRequest(services serviceSet, sessionService *session.Service, sessionKey string) *gohttp.Response {
	sessionMiddleware := http.NewSessionMiddleware(services.log, sessionService)

	formHandler := http.FormHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		Store:    services.store,
	}

	wrappedHandler := sessionMiddleware.Middleware(formHandler)

	responseWriter := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/me/save", nil)

	if sessionKey != "" {
		sessionCookie := &gohttp.Cookie{
			Name:     http.SessionCookieName,
			Value:    sessionKey,
			HttpOnly: true,
		}

		req.AddCookie(sessionCookie)
	}

	// make a request to some endpoint wrapped in middleware
	wrappedHandler.ServeHTTP(responseWriter, req)

	// confirm response follows unauthorized path
	response := responseWriter.Result()
	return response
}

func TestFullSessionHTTPFlow_Unauthenticated(t *testing.T) {
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	response := makeAuthenticatedFormRequest(services, sessionService, "")

	if response.StatusCode != 401 {
		t.Fatal("Session middleware should have returned 401 unauthorized response")
	}
}

func TestFullSessionHTTPFlow_BadAuthentication(t *testing.T) {
	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	response := makeAuthenticatedFormRequest(services, sessionService, "GARBAGE")

	// confirm response follows unauthorized path
	if response.StatusCode != 401 {
		t.Fatal("Session middleware should have returned 401 unauthorized response")
	}
}

func TestFullSessionHTTPFlow_SAMLAuthenticated(t *testing.T) {
	os.Setenv("API_BASE_URL", "http://localhost:3000")
	os.Setenv("SAML_PUBLIC_CERT", "../saml/testdata/test_cert.pem")
	os.Setenv("SAML_PRIVATE_CERT", "../saml/testdata/test_key.pem")
	os.Setenv("SAML_IDP_SSO_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_SSO_DESC_URL", "http://localhost:8080")
	os.Setenv("SAML_IDP_PUBLIC_CERT", "../saml/testdata/test_cert.pem")
	os.Setenv("SAML_ENABLED", "1")
	os.Setenv("SAML_SIGN_REQUEST", "1")
	os.Setenv("SAML_SLO_ENABLED", "1")
	os.Setenv("SAML_CONSUMER_SERVICE_URL", "")

	services := cleanTestServices(t)
	sessionService := session.NewSessionService(5*time.Minute, services.store, services.log)

	samlService := &saml.Service{
		Log: services.log,
		Env: services.env,
	}

	loginRequestHandler := http.SamlResponseHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		SAML:     samlService,
		Session:  sessionService,
	}

	conf := saml.TestResponseConfig{
		SigningCert:    "../saml/testdata/test_cert.pem",
		SigningKey:     "../saml/testdata/test_key.pem",
		IDPIssuerURL:   "http://localhost:8080",
		SSODescription: "http://localhost:8080",
		CallbackURL:    "http://localhost:3000/auth/saml/callback",
	}
	encodedResponse := saml.CreateSamlTestResponse(t, conf)

	// encode authn in the URL. This isn't how WSO2 does this but it comes out the same in the go code
	data := url.Values{}
	data.Set("SAMLResponse", encodedResponse)
	req := httptest.NewRequest("POST", fmt.Sprintf("/saml/callback?%s", data.Encode()), nil)

	responseWriter := httptest.NewRecorder()
	loginRequestHandler.ServeHTTP(responseWriter, req)

	// confirm login succeeded
	response := responseWriter.Result()

	body, readErr := ioutil.ReadAll(response.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}
	// Should get a redirect back
	if response.StatusCode != 302 {
		fmt.Println("GOT", response.StatusCode, string(body))
		t.Fatal("should be a valid login")
	}

	// Check that one of the cookies is the session cookie
	cookies := response.Cookies()
	var sessionCookie *gohttp.Cookie
	for _, cookie := range cookies {
		if cookie.Name == http.SessionCookieName {
			sessionCookie = cookie
			break
		}
	}
	if sessionCookie == nil {
		t.Fatal("The cookie was not set on the response")
	}
	if sessionCookie.HttpOnly != true {
		t.Fatal("The cookie was not set HTTP_ONLY = true")
	}

	// confirm that you can make an authenticated request
	sessionKey := sessionCookie.Value

	// now make an authenticated request with this valid session key
	authenticatedResponse := makeAuthenticatedFormRequest(services, sessionService, sessionKey)

	if authenticatedResponse.StatusCode != 200 {
		t.Fatal("Got an invalid status code while making an authenticated request", authenticatedResponse.StatusCode)
	}

	authdBody, readAuthedErr := ioutil.ReadAll(authenticatedResponse.Body)
	if readAuthedErr != nil {
		t.Fatal(readAuthedErr)
	}

	if string(authdBody) != `{"Metadata":{"form_type":"SF86","form_version":"2017-07","type":"metadata"}}` {
		t.Fatal("GET /me/form didn't return the expected body: ", authdBody)
	}

	// now, get a logout request, make sure it has a session index

	logoutRequestHandler := http.SamlSLORequestHandler{
		Env:      services.env,
		Log:      services.log,
		Database: services.db,
		SAML:     samlService,
		Session:  sessionService,
	}

	sessionMiddleware := http.NewSessionMiddleware(services.log, sessionService)

	wrappedHandler := sessionMiddleware.Middleware(logoutRequestHandler)

	sloResp := httptest.NewRecorder()
	sloReq := httptest.NewRequest("GET", "/saml/slo", nil)

	sloReq.AddCookie(sessionCookie)

	wrappedHandler.ServeHTTP(sloResp, sloReq)

	sloRequestResponse := sloResp.Result()

	if sloRequestResponse.StatusCode != 200 {
		t.Fatal("Should not have errored fetching SLO", sloRequestResponse.StatusCode)
	}

	sloBody, readErr := ioutil.ReadAll(sloRequestResponse.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}

	jsonResponse := make(map[string]string)
	jsonErr := json.Unmarshal(sloBody, &jsonResponse)
	if jsonErr != nil {
		t.Fatal(jsonErr)
	}

	decodedSLO, base64Err := base64.StdEncoding.DecodeString(jsonResponse["Base64XML"])
	if base64Err != nil {
		t.Fatal(base64Err)
	}

	// make sure that the SAML SLO message has the session index in it.
	if !strings.Contains(string(decodedSLO), "fake-session-index") {
		t.Fatal("The SAML response did not contain the SessionIndex")
	}

}

func TestFullSessionHTTPFlow_BasicAuthenticated(t *testing.T) {
	os.Setenv("BASIC_ENABLED", "1")
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
	response := responseWriter.Result()

	body, readErr := ioutil.ReadAll(response.Body)
	if readErr != nil {
		t.Fatal(readErr)
	}
	if response.StatusCode != 200 {
		fmt.Println("GOT", response.StatusCode, string(body))
		t.Fatal("should be a valid login")
	}

	// Check that one of the cookies is the session cookie
	cookies := response.Cookies()
	var sessionCookie *gohttp.Cookie
	for _, cookie := range cookies {
		if cookie.Name == http.SessionCookieName {
			sessionCookie = cookie
			break
		}
	}

	if sessionCookie == nil {
		t.Fatal("The cookie was not set on the response")
	}

	if sessionCookie.HttpOnly != true {
		t.Fatal("The cookie was not set HTTP_ONLY = true")
	}

	sessionKey := sessionCookie.Value

	// now make an authenticated request with this valid session key
	authenticatedResponse := makeAuthenticatedFormRequest(services, sessionService, sessionKey)

	if authenticatedResponse.StatusCode != 200 {
		t.Fatal("Got an invalid status code while making an authenticated request", response.StatusCode)
	}

	authdBody, readAuthedErr := ioutil.ReadAll(authenticatedResponse.Body)
	if readAuthedErr != nil {
		t.Fatal(readAuthedErr)
	}

	if string(authdBody) != `{"Metadata":{"form_type":"SF86","form_version":"2017-07","type":"metadata"}}` {
		t.Fatal("GET /me/form didn't return the expected body: ", authdBody)
	}

	// Make a logout request
	logoutHandler := http.LogoutHandler{
		Log:     services.log,
		Session: sessionService,
	}
	sessionMiddleware := http.NewSessionMiddleware(services.log, sessionService)
	authenticatedLogout := sessionMiddleware.Middleware(logoutHandler)

	logoutW := httptest.NewRecorder()
	logoutR := httptest.NewRequest("GET", "/me/logout", nil)

	logoutR.AddCookie(sessionCookie)

	authenticatedLogout.ServeHTTP(logoutW, logoutR)

	logoutResponse := logoutW.Result()

	if logoutResponse.StatusCode != 200 {
		t.Fatal("Logout Errored: ", logoutResponse.StatusCode)
	}

	// now make an authenticated request with this valid session key
	unauthenticatedResponse := makeAuthenticatedFormRequest(services, sessionService, sessionKey)

	if unauthenticatedResponse.StatusCode != 401 {
		t.Fatal("Didn't get an auth error even though we logged out", unauthenticatedResponse.StatusCode)
	}

	os.Setenv("BASIC_ENABLED", "")
}
