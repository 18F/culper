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
	{
		DateField{
			Month:     10,
			Day:       4,
			Year:      1988,
			Estimated: true,
		},
		true,
	},
}

func TestDateField(t *testing.T) {
	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestDateFieldParse(t *testing.T) {
	tests := []struct {
		Date     string
		Expected bool
	}{
		{
			"01/01/2001",
			true,
		},
		{
			"01/2001",
			false,
		},
		{
			"hello",
			false,
		},
	}

	df := DateField{}
	for _, test := range tests {
		if err := df.Parse(test.Date); (err != nil) == test.Expected {
			t.Fatalf("Expected [%v] to be [%v]\n", err != nil, test.Expected)
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
