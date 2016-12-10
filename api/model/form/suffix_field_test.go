package form

import "testing"

func TestSuffixField(t *testing.T) {
	tests := []struct {
		Field    SuffixField
		Expected bool
	}{
		{
			"Jr",
			true,
		},
		{
			"Other",
			true,
		},
		{
			"",
			true,
		},
		{
			"Unknown",
			false,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}
