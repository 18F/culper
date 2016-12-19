package geo

import (
	"errors"
	"fmt"
	"os"
	"regexp"
	"strings"
)

var (
	// Geocode is the geocoder to be used by the application. It points to an interface so that the
	// underlying implementation can be easily swapped out
	Geocode Geocoder

	// ErrNoResultsFound is a generic error when results are not found but a request was valid
	ErrNoResultsFound = errors.New("No geolocation results were found")

	// CountyRegexp matches on variations of county
	CountyRegexp = regexp.MustCompile("(?i)(County|Co|Co\\.)$")
)

func init() {
	gmapAPIKey := os.Getenv("GOOGLE_MAPS_KEY")
	Geocode = NewGoogleGeocoder(gmapAPIKey)
	//Geocode = NewBingGeocoder("Aqijj8kKIT4hcDklhz3R-8QIQtkqFNA8lF8LKXAfHQrwh5o2MX9c0uOfAvWCdAse")
}

// Geocoder is an interface for geocoding implementations
type Geocoder interface {
	BirthPlace(Values) (bool, Results, error)
	Geocode(Values) (Results, error)
}

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
}

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

// Empty determines if any results are available
func (r Results) Empty() bool {
	return len(r) == 0
}

// String returns a friendly representation of a Result
func (r Result) String() string {
	return fmt.Sprintf("Street: %s\nCity: %s\nState: %s\nZipcode: %s\nCounty: %s\nCountry: %s\nPartial: %s\nFormatted: %s",
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

// Values stores generic geospatial related query parameters
type Values struct {
	Street  string
	City    string
	State   string
	County  string
	Country string
}
