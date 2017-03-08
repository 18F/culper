package form

import "github.com/18F/e-QIP-prototype/api/geo"

// AddressField contains complete address information for an entity
type AddressField struct {
	Address TextField
	City    CityField
	State   StateField
	Zipcode ZipcodeField
	County  TextField
	Country CountryField
}

// Valid validates the location fields for an address
func (a AddressField) Valid() (bool, error) {

	var stack ErrorStack

	// TODO: Add multiple street/address fields to UI
	if ok, err := a.Address.Valid(); !ok {
		stack.Append("Address", err)
	}

	if ok, err := a.City.Valid(); !ok {
		stack.Append("City", err)
	}

	if ok, err := a.State.Valid(); !ok {
		stack.Append("State", err)
	}

	if ok, err := a.Country.Valid(); !ok {
		stack.Append("Country", err)
	}

	// Make sure non-geocoding validation checks are good
	if stack.HasErrors() {
		return true, stack
	}

	// Perform geocoding
	results, err := geo.Geocode.Validate(
		geo.Values{
			Address: string(a.Address),
			City:    string(a.City),
			State:   string(a.State),
			Zipcode: string(a.Zipcode),
		})

	if err != nil {
		return false, ErrInvalidLocation{
			Message:     err.Error(),
			Suggestions: results,
		}
	}

	return true, nil
}
