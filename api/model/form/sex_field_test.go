package form

import "testing"

func TestSexField(t *testing.T) {

	tests := []struct {
		Field    SexField
		Expected bool
	}{
		{"", true},
		{"female", true},
		{"f", true},
		{"male", true},
		{"m", true},
		{"1234", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
