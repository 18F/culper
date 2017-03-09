package form

// BirthPlaceField contains the birth location for a person. This contains a
// subset of the Address information
type BirthPlaceField struct {
	City    CityField
	State   StateField
	County  string
	Country CountryField
}

// Valid validates information for a person Birth Address.
// TODO Geocoding to validate county information
func (f BirthPlaceField) Valid() (bool, error) {
	if ok, err := f.City.Valid(); !ok {
		return false, err
	}

	if ok, err := f.State.Valid(); !ok {
		return false, err
	}

	if ok, err := f.Country.Valid(); !ok {
		return false, err
	}

	return true, nil
}
