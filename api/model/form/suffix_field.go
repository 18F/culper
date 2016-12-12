package form

import "fmt"

// SuffixField Represents a person suffix if applicable
type SuffixField string

// Valid validates that a suffix that meets the following criteria:
// - If Suffix is empty, we return as valid since it's not a required field
// - Suffix is in the list of allowable values
func (s SuffixField) Valid() (bool, error) {

	suffix := string(s)
	options := []string{"", "Jr", "Sr", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "Other"}
	for _, option := range options {
		switch option {
		case string(suffix):
			return true, nil
		}
	}
	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid field", suffix)}
}
