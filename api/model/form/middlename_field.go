package form

// MiddlenameField stores and validates a persons Middle Name
type MiddlenameField string

// Valid ensures that a middle name, if entered, matches the validation rules for a generic name text field
func (f MiddlenameField) Valid() (bool, error) {
	n := GenericNameField(f)
	if ok, err := n.Valid(); !ok {
		return false, err
	}

	return true, nil
}
