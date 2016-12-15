package form

import "testing"

func TestSSNField(t *testing.T) {
	tests := []struct {
		Field    SSNField
		Expected bool
	}{
		{
			SSNField{
				SSN:        "123456789",
				Applicable: true,
			},
			true,
		},
		{
			SSNField{
				SSN:        "1",
				Applicable: true,
			},
			false,
		},
		{
			SSNField{
				SSN:        "",
				Applicable: true,
			},
			false,
		},
		{
			SSNField{
				SSN:        "",
				Applicable: false,
			},
			true,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] [%v] to be [%v]\n", test.Field, ok, test.Expected)
		}
	}
}
