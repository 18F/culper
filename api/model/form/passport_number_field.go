package form

import "regexp"

var (
	passportAlphaNumRegexp = regexp.MustCompile("^([[:alnum:]]{6,9})+$")
)

// PassportNumberField validates a passport number
type PassportNumberField string

// Valid Validates that a United States passport number is valid
// A valid Passport number contains the following rules:
//	- The number must be between six and nine alphanumeric characters (letters and numbers)
//  - Must not contain any special characters.
//
// See issue for more details https://github.com/truetandem/e-QIP-prototype/issues/194
func (f PassportNumberField) Valid() (bool, error) {
	s := string(f)

	// Make sure we only have alpha-numeric values and that we're in between 6 and 9 characters
	if ok := passportAlphaNumRegexp.MatchString(s); !ok {
		return false, ErrFieldInvalid{"must contain only numbers or letters and be between 6 and 9 characters long"}
	}
	return true, nil
}
