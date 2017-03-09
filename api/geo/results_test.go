package geo

import (
	"fmt"
	"testing"
)

func TestHasPartial(t *testing.T) {
	tests := []struct {
		Results  Results
		Expected bool
	}{
		{
			Results: Results{
				Result{
					Partial: false,
				},
				Result{
					Partial: true,
				},
			},
			Expected: true,
		},
		{
			Results: Results{
				Result{
					Partial: false,
				},
				Result{
					Partial: false,
				},
			},
			Expected: false,
		},
	}

	for _, test := range tests {
		partial := test.Results.HasPartial()
		if partial != test.Expected {
			t.Errorf("Expected [%v] to be [%v] but got [%v]", test.Results, test.Expected, partial)
		}
	}
}

func TestHasErrors(t *testing.T) {
	tests := []struct {
		Results  Results
		Expected bool
	}{
		{
			Results: Results{
				Result{
					Error: "Foo",
				},
				Result{
					Error: "",
				},
			},
			Expected: true,
		},
		{
			Results: Results{
				Result{
					Error: "",
				},
			},
			Expected: false,
		},
	}

	for _, test := range tests {
		partial := test.Results.HasErrors()
		if partial != test.Expected {
			t.Errorf("Expected [%v] to be [%v] but got [%v]", test.Results, test.Expected, partial)
		}
	}
}

func TestEmpty(t *testing.T) {
	tests := []struct {
		Results  Results
		Expected bool
	}{
		{
			Results:  Results{},
			Expected: true,
		},
		{
			Results: Results{
				Result{
					Error: "",
				},
			},
			Expected: false,
		},
	}

	for _, test := range tests {
		partial := test.Results.Empty()
		if partial != test.Expected {
			t.Errorf("Expected [%v] to be [%v] but got [%v]", test.Results, test.Expected, partial)
		}
	}
}

func TestResultsString(t *testing.T) {
	result := Result{
		Address:   "123",
		City:      "Arlington",
		State:     "VA",
		County:    "ATown",
		Zipcode:   "22202",
		Formatted: "",
		Partial:   false,
		Error:     "",
	}
	expected := fmt.Sprintf("Street: %s\nCity: %s\nState: %s\nZipcode: %s\nCounty: %s\nCountry: %s\nPartial: %v\nFormatted: %s",
		"123",
		"Arlington",
		"VA",
		"22202",
		"ATown",
		"",
		false,
		"",
	)
	if result.String() != expected {
		t.Errorf("Expected [%v] to be [%v]", result.String(), expected)
	}
}
