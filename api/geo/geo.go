package geo

import (
	"fmt"
	"os"
)

var (
	// Geocode is
	Geocode Geocoder
)

func init() {
	gmapAPIKey := os.Getenv("GOOGLE_MAPS_KEY")
	Geocode = NewGoogleGeocoder(gmapAPIKey)
}

// Geocoder is an interface for geocoding implementations
type Geocoder interface {
	BirthPlace(Values) (bool, []Result, error)
}

// Result represents geocoded information
type Result struct {
	Street    string
	City      string
	State     string
	County    string
	Country   string
	Zipcode   string
	Formatted string
}

func (r Result) String() string {
	return fmt.Sprintf("Street: %s\nCity: %s\nState: %s\nZipcode: %s\nCounty: %s\nCountry: %s\nFormatted: %s",
		r.Street,
		r.City,
		r.State,
		r.Zipcode,
		r.County,
		r.Country,
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
