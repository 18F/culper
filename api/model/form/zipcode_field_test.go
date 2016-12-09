package form

import "testing"

func TestZipcodeField(t *testing.T) {
	tests := []struct {
		Field    ZipcodeField
		Expected bool
	}{
		{"", false},
		{"212", false},
		{"22310", true},
		{"22310-2", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}

}
