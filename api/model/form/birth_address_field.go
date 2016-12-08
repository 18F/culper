package form

// BirthAddress contains the birth location for a person. This contains a
// subset of the Address information
type BirthAddressField struct {
	City    CityField
	State   StateField
	County  TextField
	Country CountryField
}

// Valid validates information for a person Birth Address
func (f BirthAddressField) Valid() (bool, error) {
	var stack ErrorStack
	if ok, err := f.City.Valid(); !ok {
		stack.Append("City", err)
	}

	if ok, err := f.State.Valid(); !ok {
		stack.Append("State", err)
	}

	if ok, err := f.County.Valid(); !ok {
		stack.Append("County", err)
	}

	if ok, err := f.Country.Valid(); !ok {
		stack.Append("Country", err)
	}

	return !stack.HasErrors(), stack
}
