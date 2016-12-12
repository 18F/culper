package form

import "testing"

func TestFirstnameField(t *testing.T) {
	tests := []struct {
		Field    FirstnameField
		Expected bool
	}{
		{"Bryan", true},
		{"J.F.", true},
		{"Winston *the* terrible", false},
		{"Finley-Doe", true},
		{"John Doe's Do-ey", true},
		{"", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] [%v] to be [%v]\n", test.Field, ok, test.Expected)
		}
	}
}
