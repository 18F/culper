package integration

import (
	"io/ioutil"
	gohttp "net/http"
	"strings"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"

	"github.com/18F/e-QIP-prototype/api/http"
)

func TestCanValidateLocation(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)
	api.Geocode = mock.Geocoder{}

	location := readTestData(t, "../testdata/location.json")

	w, r := standardResponseAndRequest("POST", "/me/validate", strings.NewReader(string(location)), account)

	validationHandler := http.ValidateHandler{
		Log: services.log,
	}

	validationHandler.ServeHTTP(w, r)

	resp := w.Result()

	if resp.StatusCode != 200 {
		t.Fatal("Didn't manage to validate safely. ", resp.StatusCode)
	}

}

func TestCanNotValidateSomethingElse(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)
	api.Geocode = mock.Geocoder{}

	location := readTestData(t, "../testdata/history/history-employment.json")

	w, r := standardResponseAndRequest("POST", "/me/validate", strings.NewReader(string(location)), account)

	validationHandler := http.ValidateHandler{
		Log: services.log,
	}

	validationHandler.ServeHTTP(w, r)

	resp := w.Result()

	if resp.StatusCode != 400 {
		t.Fatal("Should have gotten an error validating a non-address. ", resp.StatusCode)
	}

}

func TestValidateHandlerInvalidAddress(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)
	api.Geocode = mock.Geocoder{}

	// Pass a bad address
	location := readTestData(t, "../testdata/nonstandardized-address.json")

	w, r := standardResponseAndRequest("POST", "/me/validate", strings.NewReader(string(location)), account)

	validationHandler := http.ValidateHandler{
		Log: services.log,
	}

	validationHandler.ServeHTTP(w, r)
	if status := w.Code; status != gohttp.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, gohttp.StatusBadRequest)
	}
	resp := w.Result()
	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}

	// mock geocoder does not populate geocoding JSON response
	if len(responseJSON) != 0 {
		t.Fail()
	}
}

func TestValidateHandlerBadEntity(t *testing.T) {
	services := cleanTestServices(t)
	account := createTestAccount(t, services.db)
	api.Geocode = mock.Geocoder{}

	// Pass a non-JSON address
	location := readTestData(t, "../testdata/empty.xml")

	w, r := standardResponseAndRequest("POST", "/me/validate", strings.NewReader(string(location)), account)

	validationHandler := http.ValidateHandler{
		Log: services.log,
	}

	validationHandler.ServeHTTP(w, r)
	if status := w.Code; status != gohttp.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, gohttp.StatusBadRequest)
	}
	resp := w.Result()
	// Check the response body is what we expect.
	responseJSON, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Log("Error reading the response: ", err)
		t.Fail()
	}
	// Check the error message is what we expect
	confirmErrorMsg(t, responseJSON, "Failed to deserialize payload")
}
