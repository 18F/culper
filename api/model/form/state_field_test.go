package form

import "testing"

func TestStateField(t *testing.T) {
	tests := []struct {
		Field    StateField
		Expected bool
	}{
		{"", true},
		{"VA", true},
		{"V", false},
		{"123", false},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
