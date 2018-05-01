package api

import (
	"fmt"
	"testing"
)

func TestHasPartial(t *testing.T) {
	tests := []struct {
		Results  GeocodeResults
		Expected bool
	}{
		{
			Results: GeocodeResults{
				GeocodeResult{
					Partial: false,
				},
				GeocodeResult{
					Partial: true,
				},
			},
			Expected: true,
		},
		{
			Results: GeocodeResults{
				GeocodeResult{
					Partial: false,
				},
				GeocodeResult{
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
		Results  GeocodeResults
		Expected bool
	}{
		{
			Results: GeocodeResults{
				GeocodeResult{
					Error: "Foo",
				},
				GeocodeResult{
					Error: "",
				},
			},
			Expected: true,
		},
		{
			Results: GeocodeResults{
				GeocodeResult{
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
		Results  GeocodeResults
		Expected bool
	}{
		{
			Results:  GeocodeResults{},
			Expected: true,
		},
		{
			Results: GeocodeResults{
				GeocodeResult{
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
	result := GeocodeResult{
		Street:    "123",
		Street2:   "APT 1",
		City:      "Arlington",
		State:     "VA",
		County:    "ATown",
		Zipcode:   "22202",
		Formatted: "",
		Partial:   false,
		Error:     "",
	}
	expected := fmt.Sprintf("Street: %s\nStreet2: %s\nCity: %s\nState: %s\nZipcode: %s\nCounty: %s\nCountry: %s\nPartial: %v\nFormatted: %s",
		"123",
		"APT 1",
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
