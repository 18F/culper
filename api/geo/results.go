package geo

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	// CountyRegexp matches on variations of county
	CountyRegexp = regexp.MustCompile("(?i)(County|Co|Co\\.)$")
)

// Result represents geocoded information that has been transformed from the original source.
// All Geocoders should convert their location information into a Result struct
type Result struct {
	Street    string
	City      string
	State     string
	County    string
	Country   string
	Zipcode   string
	Formatted string
	Partial   bool
	Error     string
}

// CountyEqual compares the County value against a passed in county.
// This strips out variations of county which include the following:
// - <county name> County
// - <county name> Co
// - <county name> Co.
func (r Result) CountyEqual(county string) bool {
	// Clean result county
	rCounty := strings.TrimSpace(
		CountyRegexp.ReplaceAllString(strings.TrimSpace(r.County), ""),
	)

	// clean county to compare
	county = strings.TrimSpace(
		CountyRegexp.ReplaceAllString(strings.TrimSpace(county), ""),
	)

	return rCounty == county
}

// Results contains a list of found Result. It contains helper methods to determine if
// partial matches were found
type Results []Result

// HasPartial determines if any of the matches is partial
func (r Results) HasPartial() bool {
	for _, result := range r {
		if result.Partial {
			return true
		}
	}
	return false
}

// HasErrors checks if any of the results contains error information
func (r Results) HasErrors() bool {
	for _, result := range r {
		if result.Error != "" {
			return true
		}
	}
	return false
}

// Empty determines if any results are available
func (r Results) Empty() bool {
	return len(r) == 0
}

// String returns a friendly representation of a Result
func (r Result) String() string {
	return fmt.Sprintf("Street: %s\nCity: %s\nState: %s\nZipcode: %s\nCounty: %s\nCountry: %s\nPartial: %v\nFormatted: %s",
		r.Street,
		r.City,
		r.State,
		r.Zipcode,
		r.County,
		r.Country,
		r.Partial,
		r.Formatted,
	)
}
