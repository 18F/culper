package form

import "testing"

var tests = []struct {
	Field    DateField
	Expected bool
}{
	{
		DateField{
			Month:     1,
			Day:       1,
			Year:      2016,
			Estimated: true,
		},
		true,
	},
	// Leap Year
	{
		DateField{
			Month:     2,
			Day:       29,
			Year:      2016,
			Estimated: true,
		},
		true,
	},
	// Not a leap year
	{
		DateField{
			Month:     2,
			Day:       29,
			Year:      2017,
			Estimated: true,
		},
		false,
	},
	{
		DateField{
			Month:     13,
			Day:       29,
			Year:      2017,
			Estimated: true,
		},
		false,
	},
	{
		DateField{
			Month:     1,
			Day:       50,
			Year:      2017,
			Estimated: true,
		},
		false,
	},
}

func TestDateField(t *testing.T) {
	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestDateFieldTime(t *testing.T) {
	for _, test := range tests {
		if time, _ := test.Field.Time(); !time.IsZero() != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", time.IsZero(), test.Expected)
		}
	}
}
