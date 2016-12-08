package form

import "testing"

func TestTextField(t *testing.T) {

	tests := []struct {
		Field    TextField
		Expected bool
	}{
		{"", false},
		{"hello", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
