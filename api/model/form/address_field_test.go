package form

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/18F/e-QIP-prototype/api/geo"
)

func TestAddressField(t *testing.T) {
	tests := []struct {
		XML      string
		Field    AddressField
		Expected bool
	}{
		{
			XML: `<?xml version="1.0" encoding="UTF-8"?>
			<AddressValidateResponse>
				<Address>
					<Address2>123 SOME RD</Address2>
					<City>ARLINGTON</City>
					<State>VA</State>
					<Zip5>22202</Zip5>
					<Zip4></Zip4>
				</Address>
			</AddressValidateResponse>`,
			Field: AddressField{
				Address: "123 Some RD",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			Expected: true,
		},
		{
			XML: `<?xml version="1.0" encoding="UTF-8"?>
			<AddressValidateResponse>
				<Address>
					<Address2>123 SOME RD</Address2>
					<City>ARLINGTON</City>
					<State>VA</State>
					<Zip5>22202</Zip5>
					<Zip4></Zip4>
				</Address>
			</AddressValidateResponse>`,
			Field: AddressField{
				Address: "123 Some Road",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			Expected: false,
		},
		{
			XML: "",
			Field: AddressField{
				Address: "",
				City:    "",
				State:   "",
				Zipcode: "",
				County:  "",
				Country: "",
			},
			Expected: false,
		},
		{
			XML: `<?xml version="1.0" encoding="UTF-8"?>
			<AddressValidateResponse>
				<Address>
					<Error>
						<Number>-2147219401</Number>
						<Source>clsAMS</Source>
						<Description>Address Not Found.  </Description>
						<HelpFile/>
						<HelpContext/>
					</Error>
				</Address>
			</AddressValidateResponse>`,
			Field: AddressField{
				Address: "123",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			Expected: false,
		},
	}

	for _, test := range tests {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/xml")
			fmt.Fprintln(w, test.XML)
		}))

		geo.Geocode = geo.NewTestUSPSGeocoder("test", ts.URL)
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
