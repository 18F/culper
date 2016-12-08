package form

import "fmt"

// Represents a person suffix if applicable
type Suffix string

func (s Suffix) Valid() (bool, error) {
	options := []string{"Jr", "Sr", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "Other"}
	for _, option := range options {
		if string(s) == option {
			return true, nil
		}
	}
	return false, ErrFieldInvalid{fmt.Sprintf("Suffix `%v` is not a valid value", s)}
}
