package geo

import "fmt"

// Result represents geocoded information that has been transformed from the original source.
// All Geocoders should convert their location information into a Result struct
type Result struct {
	Street    string
	Street2   string
	City      string
	State     string
	County    string
	Country   string
	Zipcode   string
	Formatted string
	Partial   bool
	Error     string
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
	return fmt.Sprintf("Street: %s\nStreet2: %s\nCity: %s\nState: %s\nZipcode: %s\nCounty: %s\nCountry: %s\nPartial: %v\nFormatted: %s",
		r.Street,
		r.Street2,
		r.City,
		r.State,
		r.Zipcode,
		r.County,
		r.Country,
		r.Partial,
		r.Formatted,
	)
}
