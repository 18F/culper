package form

import "testing"

func TestPassportNumberField(t *testing.T) {

	tests := []struct {
		Field    PassportNumberField
		Expected bool
	}{
		{"", false},
		{"test", false},
		{"@12345", false},
		{"1234 789", false},
		{"12345", false},
		{"123456789", true},
		{"123456", true},
		{"A12345", true},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] [%v] to be [%v]\n", ok, string(test.Field), test.Expected)
		}
	}
}
