package form

import "testing"

func TestStateField(t *testing.T) {
	tests := []struct {
		Field    StateField
		Expected bool
	}{
		{"", false},
		{"VA", true},
		{"Virginia", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
