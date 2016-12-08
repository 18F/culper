package form

import "testing"

func TestCountryField(t *testing.T) {
	tests := []struct {
		Field    CountryField
		Expected bool
	}{
		{"", false},
		{"United States", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
