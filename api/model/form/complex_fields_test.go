package form

import "testing"

func TestAddressField(t *testing.T) {

	tests := []struct {
		Field    AddressField
		Expected bool
	}{
		{
			AddressField{
				Address: "12345",
				Street:  "Some rd",
				City:    "Arlington",
				State:   "VA",
				Zipcode: "22202",
				County:  "Arlington",
				Country: "United States",
			},
			true,
		},
		{
			AddressField{
				Address: "",
				Street:  "",
				City:    "",
				State:   "",
				Zipcode: "",
				County:  "",
				Country: "",
			},
			false,
		},
		{
			AddressField{
				Address: "Some Address",
				Street:  "",
				City:    "",
				State:   "",
				Zipcode: "",
				County:  "",
				Country: "",
			},
			false,
		},
		{
			AddressField{
				Address: "Some Address",
				Street:  "1234",
				City:    "",
				State:   "",
				Zipcode: "",
				County:  "",
				Country: "",
			},
			false,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
