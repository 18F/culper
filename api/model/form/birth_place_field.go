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

	// Geocode information and determine if any results are found
	//_, results, err := geo.Geocode.BirthPlace(
	//geo.Values{
	//City:    string(f.City),
	//State:   string(f.State),
	//County:  string(f.County),
	//Country: string(f.Country),
	//})

	//if err != nil {
	//return false, ErrFieldInvalid{err.Error()}
	//}

	//if results.Empty() {
	//return false, ErrFieldInvalid{"No valid result was found matching your location"}
	//}

	//if !partial {
	//return true, nil
	//}

	return false, ErrInvalidLocation{
		Message:     "Geocode result is a partial match. Suggestions are available",
		Suggestions: nil,
	}
}
