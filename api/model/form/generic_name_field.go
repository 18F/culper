package form

import "regexp"

var (
	NameRegex = regexp.MustCompile("[^A-Za-z\\-\\.'\\s]")
)

//GenericNameField is a generic field to be used for Firstnames, lastname and middlenames. It checks that a name
// contains valid characters
type GenericNameField string

func (f GenericNameField) Valid() (bool, error) {
	s := string(f)
	if NameRegex.MatchString(s) {
		return false, ErrFieldInvalid{"contains invalid characters"}
	}

	if len([]rune(s)) > 100 {
		return false, ErrFieldInvalid{"exceeded the maximum number of characters"}
	}
	return true, nil
}
