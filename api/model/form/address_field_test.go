package form

import "testing"

func TestAddressField(t *testing.T) {

	tests := []struct {
		Field    AddressField
		Expected bool
	}{
		{
			AddressField{
				Street1: "12345",
				Street2: "Some rd",
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
				Street1: "",
				Street2: "",
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
				Street1: "Some Address",
				Street2: "",
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
				Street1: "Some Address",
				Street2: "1234",
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
