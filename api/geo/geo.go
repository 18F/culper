package geo

import (
	"errors"
	"log"
	"os"
)

var (
	// Geocode is the geocoder to be used by the application. It points to an interface so that the
	// underlying implementation can be easily swapped out
	Geocode Geocoder

	// ErrNoResultsFound is a generic error when results are not found but a request was valid
	ErrNoResultsFound = errors.New("No geolocation results were found")
)

func init() {
	uspsUserID := os.Getenv("USPS_USERID")
	if uspsUserID == "" {
		log.Print("WARNING: USPS API Key has not been set")
	}

	Geocode = NewUSPSGeocoder(uspsUserID)
	//Geocode = NewGoogleGeocoder(gmapAPIKey)
}

// Geocoder is an interface for geocoding implementations
type Geocoder interface {
	Validate(Values) (Results, error)
}
