package form

import "testing"

func TestEmailField(t *testing.T) {

	tests := []struct {
		Field    EmailField
		Expected bool
	}{
		{"", false},
		{"test", false},
		{"test@local.dev", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
