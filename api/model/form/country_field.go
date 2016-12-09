package form

import "strings"

// CountryField stores a country location
type CountryField string

func (f CountryField) Valid() (bool, error) {

	if strings.TrimSpace(string(f)) == "" {
		return false, ErrInvalidLocation{"Country is required", nil}
	}
	return true, nil
}
