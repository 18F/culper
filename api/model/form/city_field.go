package form

import "strings"

// CityField stores city information
type CityField string

// Valid validates that a city value is valid. This includes that `unknown` is not entered and that
// the maximum number of characters is not exceeded
func (f CityField) Valid() (bool, error) {
	s := string(f)
	if strings.ToLower(s) == "unknown" {
		return false, ErrFieldInvalid{"unknown is an invalid value"}
	}

	if len(s) > 100 {
		return false, ErrFieldInvalid{"exeeded the maximum number of characters"}
	}

	return true, nil
}
