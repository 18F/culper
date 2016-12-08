package form

// AddressField contains complete address information for an entity
type AddressField struct {
	Street1 TextField
	Street2 TextField
	City    CityField
	State   StateField
	Zipcode ZipcodeField
	County  TextField
	Country CountryField
}

// Valid validates the location fields for an address
func (a AddressField) Valid() (bool, error) {

	var stack ErrorStack

	if ok, err := a.Street1.Valid(); !ok {
		stack.Append("Address", err)
	}

	if ok, err := a.Street2.Valid(); !ok {
		stack.Append("Street", err)
	}

	if ok, err := a.City.Valid(); !ok {
		stack.Append("City", err)
	}

	if ok, err := a.State.Valid(); !ok {
		stack.Append("State", err)
	}

	if ok, err := a.Zipcode.Valid(); !ok {
		stack.Append("Zipcode", err)
	}

	if ok, err := a.County.Valid(); !ok {
		stack.Append("County", err)
	}

	if ok, err := a.Country.Valid(); !ok {
		stack.Append("Country", err)
	}

	return !stack.HasErrors(), stack
}
