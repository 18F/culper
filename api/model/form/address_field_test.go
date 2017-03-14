package form

import (
	"fmt"
	"io/ioutil"
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
			XML: "../../geo/testdata/valid_address.xml",
			Field: AddressField{
				Address: "123 Some RD",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			Expected: true,
		},
		{
			XML: "../../geo/testdata/valid_address.xml",
			Field: AddressField{
				Address: "123 Some Road",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
			},
			Expected: false,
		},
		{
			XML: "../../geo/testdata/empty.xml",
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
			XML: "../../geo/testdata/address_error.xml",
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
		xml, err := readTestdata(test.XML)
		if err != nil {
			t.Fatal(err)
		}

		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/xml")
			fmt.Fprintln(w, xml)
		}))

		geo.Geocode = geo.NewTestUSPSGeocoder("test", ts.URL)
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
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
