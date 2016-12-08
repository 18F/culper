package form

// NameField stores name information for a particular person
type NameField struct {
	First  FirstnameField
	Last   LastnameField
	Middle MiddlenameField
	Suffix SuffixField
}

// Valid ensures that a person name is valid
func (f NameField) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := f.First.Valid(); !ok {
		stack.Append("Firstname", err)
	}

	if ok, err := f.Last.Valid(); !ok {
		stack.Append("Lastname", err)
	}

	if ok, err := f.Middle.Valid(); !ok {
		stack.Append("Middlename", err)
	}

	if ok, err := f.Suffix.Valid(); !ok {
		stack.Append("Suffix", err)
	}
	return !stack.HasErrors(), stack
}
