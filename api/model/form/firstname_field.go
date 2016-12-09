package form

// FirstnameField contains a persons first name. Also contains a flag to indicate
// if the person has entered an initial.
type FirstnameField struct {
	Name        string
	InitialOnly bool
}

func (f FirstnameField) Valid() (bool, error) {
	len := len(f.Name)
	if f.InitialOnly && len > 1 {
		return false, ErrFieldInvalid{"Specify one character if Initial Only is selected"}
	}

	if len > 100 {
		return false, ErrFieldInvalid{"Name only allows 100 characters"}
	}

	return true, nil
}
