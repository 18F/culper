package form

import "testing"

func TestBirthdateField(t *testing.T) {
	var tests = []struct {
		Field    BirthdateField
		Expected bool
	}{
		{
			BirthdateField{
				Month:     10,
				Day:       4,
				Year:      1986,
				Estimated: true,
			},
			true,
		},
		{
			BirthdateField{
				Month:     1,
				Day:       1,
				Year:      2010,
				Estimated: true,
			},
			false,
		},
		// Leap Year
		{
			BirthdateField{
				Month:     2,
				Day:       29,
				Year:      2016,
				Estimated: true,
			},
			false,
		},
		{
			BirthdateField{
				Month:     1,
				Day:       50,
				Year:      2002,
				Estimated: true,
			},
			false,
		},
		{
			BirthdateField{
				Month:     1,
				Day:       20,
				Year:      1800,
				Estimated: true,
			},
			false,
		},
	}
	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] [%v] to be [%v]\n", test.Field.Year, ok, test.Expected)
		}
	}
}
