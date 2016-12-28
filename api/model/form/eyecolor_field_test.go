package form

import "testing"

func TestEyeColorField(t *testing.T) {
	tests := []struct {
		Field    EyeColorField
		Expected bool
	}{
		{"", true},
		{"Black", true},
		{"Nothing", false},
		{"12", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
