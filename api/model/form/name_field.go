package form

// NameField stores name information for a particular person
type NameField struct {
	First       FirstnameField
	Last        LastnameField
	Middle      MiddlenameField
	Suffix      SuffixField
	SuffixOther GenericNameField
}

// Valid ensures that a person name is valid
func (f NameField) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := f.First.Valid(); !ok {
		stack.Append("First", err)
	}

	if ok, err := f.Last.Valid(); !ok {
		stack.Append("Last", err)
	}

	if ok, err := f.Middle.Valid(); !ok {
		stack.Append("Middle", err)
	}

	if ok, err := f.Suffix.Valid(); !ok {
		stack.Append("Suffix", err)
	} else {
		suffix := string(f.Suffix)
		suffixOther := string(f.SuffixOther)

		// Suffix option is valid. Now make sure that if `Other` Suffix is selected
		// that SuffixOther contains a valid value
		if suffix == "Other" {
			switch suffixOther {
			// Empty SuffixOthe
			case "":
				stack.Append("SuffixOther", ErrFieldRequired{"is required if `Other` Suffix is selected"})
			// SuffixOther contains a value but we check it contains valid characters and length
			default:
				if ok, err := f.SuffixOther.Valid(); !ok {
					stack.Append("SuffixOther", err)
				}
			}
		}
	}

	return !stack.HasErrors(), stack
}
