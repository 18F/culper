package api

import (
	"errors"
	"fmt"
)

var (
	// Geocode is the geocoder to be used by the application. It points to an interface so that the
	// underlying implementation can be easily swapped out
	Geocode Geocoder

	// ErrNoResultsFound is a generic error when results are not found but a request was valid
	ErrNoResultsFound = errors.New("No geolocation results were found")
)

// func init() {
// 	log := logmsg.NewLogger()
// 	uspsUserID := cf.UserService("usps-api", "api_key")
// 	if uspsUserID == "" {
// 		log.Warn(logmsg.USPSMissingKey)
// 	}

// 	Geocode = NewUSPSGeocoder(uspsUserID)
// }

// Geocoder is an interface for geocoding implementations
type Geocoder interface {
	Validate(Values) (GeocodeResults, error)
}

// Result represents geocoded information that has been transformed from the original source.
// All Geocoders should convert their location information into a Result struct
type GeocodeResult struct {
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
type GeocodeResults []GeocodeResult

// HasPartial determines if any of the matches is partial
func (r GeocodeResults) HasPartial() bool {
	for _, result := range r {
		if result.Partial {
			return true
		}
	}
	return false
}

// HasErrors checks if any of the results contains error information
func (r GeocodeResults) HasErrors() bool {
	for _, result := range r {
		if result.Error != "" {
			return true
		}
	}
	return false
}

// Empty determines if any results are available
func (r GeocodeResults) Empty() bool {
	return len(r) == 0
}

// String returns a friendly representation of a Result
func (r GeocodeResult) String() string {
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

// Values stores generic geospatial related query parameters
type GeocodeValues struct {
	Street  string
	Street2 string
	City    string
	State   string
	Zipcode string
	County  string
	Country string
}
