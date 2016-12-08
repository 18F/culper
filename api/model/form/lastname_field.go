package form

// LastnameField stores a person lastname
type LastnameField string

//Valid checks that a lastname is not empty and uses the NameField validation rules
func (f LastnameField) Valid() (bool, error) {
	s := string(f)
	if s == "" {
		return false, ErrFieldRequired{"field is required"}
	}

	// Leverage validation rules from generic name field
	name := GenericNameField(f)
	return name.Valid()
}
