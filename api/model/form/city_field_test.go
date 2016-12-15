package form

import "testing"

func TestCityField(t *testing.T) {
	tests := []struct {
		Field    CityField
		Expected bool
	}{
		{"", true},
		{"Arlington", true},
		{"unknown", false},
		{"Unknown", false},
		{"UnkNown", false},
		{"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero nibh, lacinia vel nulla vitae nullam.", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
