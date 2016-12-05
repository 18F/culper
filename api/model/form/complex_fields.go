package form

// AddressField contains complete address information for an entity
type AddressField struct {
	Address TextField
	Street  TextField
	City    CityField
	State   StateField
	Zipcode ZipcodeField
	County  TextField
	Country CountryField
}

// Valid validates the location fields for an address
func (a AddressField) Valid() (bool, error) {

	var stack ErrorStack

	if ok, err := a.Address.Valid(); !ok {
		stack.Append("Address", err)
	}

	if ok, err := a.Street.Valid(); !ok {
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

// PersonField stores information for a particular person
type PersonField struct {
	Firstname  FirstnameField
	Lastname   TextField
	Middlename MiddlenameField
	Suffix     Suffix
}

func (f PersonField) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := f.Firstname.Valid(); !ok {
		stack.Append("Firstname", err)
	}

	if ok, err := f.Lastname.Valid(); !ok {
		stack.Append("Lastname", err)
	}

	if ok, err := f.Middlename.Valid(); !ok {
		stack.Append("Middlename", err)
	}

	if ok, err := f.Suffix.Valid(); !ok {
		stack.Append("Middlename", err)
	}
	return !stack.HasErrors(), stack
}

// DateRangeField contains from and to dates and ensures they are within a valid range
type DateRangeField struct {
	From DateField
	To   DateField
}

func (f DateRangeField) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := f.From.Valid(); !ok {
		stack.Append("From", err)
	}

	if ok, err := f.To.Valid(); !ok {
		stack.Append("From", err)
	}
	return !stack.HasErrors(), stack
}
