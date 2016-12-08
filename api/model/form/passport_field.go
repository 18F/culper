package form

import "fmt"

// PassportField validates a passport number
type PassportField string

func (f PassportField) Valid() (bool, error) {
	pass := string(f)
	if pass == "" {
		return false, ErrFieldRequired{"Passport field is required"}
	}

	if len(pass) < 3 {
		return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid Passport number", pass)}
	}
	return true, nil
}
