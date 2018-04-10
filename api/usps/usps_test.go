package usps

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/mock"
)

func TestQuerySuccess(t *testing.T) {
	tests := []struct {
		Values          api.GeocodeValues
		XML             string
		ExpectedResults api.GeocodeResults
	}{
		{
			Values: api.GeocodeValues{
				Street:  "123 Some Rd",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			XML: "../testdata/valid_address.xml",
			ExpectedResults: api.GeocodeResults{
				{
					Street:  "123 SOME RD",
					City:    "ARLINGTON",
					State:   "VA",
					Zipcode: "22202",
					Partial: false,
				},
			},
		},
		{
			Values: api.GeocodeValues{
				Street:  "123 Some Road",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			XML: "../testdata/valid_address.xml",
			ExpectedResults: api.GeocodeResults{
				{
					Street:  "123 SOME RD",
					City:    "ARLINGTON",
					State:   "VA",
					Zipcode: "22202",
					Partial: true,
				},
			},
		},
	}

	for _, test := range tests {
		xml, err := readTestdata(test.XML)
		if err != nil {
			t.Fatal(err)
		}

		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/xml")
			fmt.Fprintln(w, xml)
		}))

		geocoder := USPSGeocoder{
			baseURI: ts.URL,
			Env:     mock.Native{},
			Log:     mock.LogService{},
		}
		results, _ := geocoder.query(test.Values)
		equal := reflect.DeepEqual(results, test.ExpectedResults)
		if !equal {
			t.Errorf("Expected %v to be %v\n", results, test.ExpectedResults)
		}
	}

}

func TestQueryError(t *testing.T) {
	tests := []struct {
		Values      api.GeocodeValues
		XML         string
		ExpectError bool
	}{
		{
			Values: api.GeocodeValues{
				Street:  "123 Some Rd",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			XML:         "../testdata/address_error.xml",
			ExpectError: true,
		},
		{
			Values:      api.GeocodeValues{},
			XML:         "../testdata/foo_address.xml",
			ExpectError: true,
		},
		{
			Values:      api.GeocodeValues{},
			XML:         "../testdata/address_returntext.xml",
			ExpectError: true,
		},
		{
			Values:      api.GeocodeValues{},
			XML:         "../testdata/usps_error.xml",
			ExpectError: true,
		},
	}

	for _, test := range tests {
		xml, err := readTestdata(test.XML)
		if err != nil {
			t.Fatal(err)
		}

		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/xml")
			fmt.Fprintln(w, xml)
		}))

		geocoder := USPSGeocoder{
			baseURI: ts.URL,
			Env:     mock.Native{},
			Log:     mock.LogService{},
		}
		_, err = geocoder.query(test.Values)
		if (err == nil) == test.ExpectError {
			t.Errorf("Expected %v but got %v for %v\n", test.ExpectError, (err == nil), test.XML)
		}
	}
}

func readTestdata(filepath string) (string, error) {
	b, err := ioutil.ReadFile(filepath)
	if err != nil {
		return "", err
	}
	return string(b), nil
}
