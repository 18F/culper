package form

import "testing"

func TestDateRangeField(t *testing.T) {

	tests := []struct {
		Field    DateRangeField
		Expected bool
	}{
		{
			DateRangeField{
				From: DateField{
					Day:   1,
					Month: 1,
					Year:  2000,
				},
				To: DateField{
					Day:   2,
					Month: 2,
					Year:  2002,
				},
			},
			true,
		},
		{
			DateRangeField{
				From: DateField{
					Day:   1,
					Month: 1,
					Year:  2016,
				},
				To: DateField{
					Day:   2,
					Month: 2,
					Year:  2002,
				},
			},
			false,
		},
	}

	for _, test := range tests {
		if ok, _ := test.Field.Valid(); ok != test.Expected {
			t.Errorf("Expected [%v] to be [%v]\n", ok, test.Expected)
		}
	}
}

func TestDateRangeFieldParse(t *testing.T) {
	tests := []struct {
		From        string
		To          string
		ExpectError bool
	}{
		{
			"01/01/1999",
			"02/02/2000",
			false,
		},
		{
			"hi",
			"02/02/2000",
			true,
		},
		{
			"02/02/2000",
			"hi",
			true,
		},
		{
			"02/02/2000",
			"",
			false,
		},
	}

	for _, test := range tests {
		df := DateRangeField{}
		if err := df.Parse(test.From, test.To); (err == nil) == test.ExpectError {
			t.Errorf("Expected From [%v] and To [%v] to be properly parsed", df.From, df.To)
		}
	}
}
