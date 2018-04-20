package mock

import (
	"github.com/18F/e-QIP-prototype/api"
)

type Geocoder struct{}

func (service Geocoder) Validate(api.GeocodeValues) (api.GeocodeResults, error) {
	return api.GeocodeResults{}, nil
}
