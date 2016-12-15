package form

import "testing"

func TestBirthPlaceField(t *testing.T) {
	tests := []struct {
		Field    BirthPlaceField
		Expected bool
	}{
		{
			BirthPlaceField{
				City:    "Arlington",
				State:   "VA",
				County:  "",
				Country: "United States",
			},
			true,
		},
		{
			BirthPlaceField{
				City:    "",
				State:   "MD",
				County:  "",
				Country: "United States",
			},
			true,
		},
		{
			BirthPlaceField{
				City:    "",
				State:   "M",
				County:  "",
				Country: "United States",
			},
			false,
		},
		{
			BirthPlaceField{
				City:    "",
				State:   "",
				County:  "",
				Country: "United",
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
