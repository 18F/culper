package form

// FirstnameField contains a persons first name.
type FirstnameField string

// Valid ensures that a first name, if entered, matches the validation rules for a generic name text field
func (f FirstnameField) Valid() (bool, error) {
	s := GenericNameField(f)
	if ok, err := s.Valid(); !ok {
		return false, err
	}

	return true, nil
}
