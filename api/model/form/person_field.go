package form

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
