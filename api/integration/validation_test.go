package integration

import (
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
		t.Fatal("Should have gotten an error validating a non-address . ", resp.StatusCode)
	}

}
