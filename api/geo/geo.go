package geo

import (
	"errors"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	log "github.com/sirupsen/logrus"
)

var (
	// Geocode is the geocoder to be used by the application. It points to an interface so that the
	// underlying implementation can be easily swapped out
	Geocode Geocoder

	// ErrNoResultsFound is a generic error when results are not found but a request was valid
	ErrNoResultsFound = errors.New("No geolocation results were found")
)

func init() {
	uspsUserID := cf.UserService("usps-api", "api_key")
	if uspsUserID == "" {
		log.Warn(logmsg.USPSMissingKey)
	}

	Geocode = NewUSPSGeocoder(uspsUserID)
}

// Geocoder is an interface for geocoding implementations
type Geocoder interface {
	Validate(Values) (Results, error)
}
