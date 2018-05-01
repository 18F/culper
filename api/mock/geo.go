package mock

import (
	"github.com/18F/e-QIP-prototype/api"
)

// Geocoder is a mock implementation.
type Geocoder struct{}

// Validate takes values to be geocoded and executes a web service call
func (service Geocoder) Validate(api.GeocodeValues) (api.GeocodeResults, error) {
	return api.GeocodeResults{}, nil
}
