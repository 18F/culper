package geo

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestQuerySuccess(t *testing.T) {
	tests := []struct {
		Values          Values
		XML             string
		ExpectedResults Results
	}{
		{
			Values: Values{
				Address: "123 Some Rd",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			XML: `
				<?xml version="1.0" encoding="UTF-8"?>
				<AddressValidateResponse>
					<Address>
						<Address2>123 SOME RD</Address2>
						<City>ARLINGTON</City>
						<State>VA</State>
						<Zip5>22202</Zip5>
						<Zip4></Zip4>
					</Address>
				</AddressValidateResponse>`,
			ExpectedResults: Results{
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
			Values: Values{
				Address: "123 Some Road",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			XML: `
				<?xml version="1.0" encoding="UTF-8"?>
				<AddressValidateResponse>
					<Address>
						<Address2>123 SOME RD</Address2>
						<City>ARLINGTON</City>
						<State>VA</State>
						<Zip5>22202</Zip5>
						<Zip4></Zip4>
					</Address>
				</AddressValidateResponse>`,
			ExpectedResults: Results{
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

		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/xml")
			fmt.Fprintln(w, test.XML)
		}))

		geocoder := USPSGeocoder{
			baseURI: ts.URL,
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
		Values      Values
		XML         string
		ExpectError bool
	}{
		{
			Values: Values{
				Address: "123 Some Rd",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			XML: `
				<?xml version="1.0" encoding="UTF-8"?>
				<AddressValidateResponse>
					<Address>
						<Error>
						<Number>-2147219401</Number>
						<Source>clsAMS</Source>
						<Description>Address Not Found.</Description>
						<HelpFile/>
						<HelpContext/>
						</Error>
					</Address>
				</AddressValidateResponse>`,
			ExpectError: true,
		},
		{
			Values: Values{},
			XML: `
				<Foo>
				</Foo>`,
			ExpectError: true,
		},
		{
			Values: Values{},
			XML: `
				<AddressValidateResponse>
					<Address>
						<Address2>123 SOME RD</Address2>
						<City>ARLINGTON</City>
						<State>VA</State>
						<Zip5>22202</Zip5>
						<Zip4></Zip4>
						<ReturnText>Missing apartment</ReturnText>
					</Address>
				</AddressValidateResponse>`,
			ExpectError: true,
		},
		{
			Values: Values{},
			XML: `
				<Error>
					<Description>Foo</Description>
				</Error>`,
			ExpectError: true,
		},
	}

	for _, test := range tests {

		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/xml")
			fmt.Fprintln(w, test.XML)
		}))

		geocoder := USPSGeocoder{
			baseURI: ts.URL,
		}
		_, err := geocoder.query(test.Values)
		if (err == nil) == test.ExpectError {
			t.Errorf("Expected %v but got %v for %v\n", test.ExpectError, (err == nil), test.XML)
		}
	}

}
