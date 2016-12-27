package form

import "testing"

func TestHeightField(t *testing.T) {
	tests := []struct {
		Field    HeightField
		Expected bool
	}{
		{
			HeightField{
				Feet:   2,
				Inches: 10,
			},
			true,
		},
		{
			HeightField{
				Feet:   0,
				Inches: 5,
			},
			false,
		},
		{
			HeightField{
				Feet:   5,
				Inches: -1,
			},
			false,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] [%v] to be [%v]\n", test.Field, ok, test.Expected)
		}
	}
}
