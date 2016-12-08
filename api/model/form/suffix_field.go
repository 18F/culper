package form

import "fmt"

// SuffixField Represents a person suffix if applicable
type SuffixField struct {
	Suffix      string
	SuffixOther string
}

// Valid validates that a suffix that meets the following criteria:
// - If Suffix is empty, we return as valid since it's not a required field
// - Suffix is in the list of allowable values
// - If Suffix is `Other` then a value must be entered for SuffixOther
func (s SuffixField) Valid() (bool, error) {
	var stack ErrorStack
	if s.Suffix == "" {
		return true, nil
	}

	options := []string{"Jr", "Sr", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"}
	for _, option := range options {
		switch option {
		case s.Suffix:
			return true, nil
		}
	}

	// If we haven't hit on the enumeration before, check if it's Other.
	if s.Suffix != "Other" {
		stack.Append("Suffix", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid Suffix value", s.Suffix)})
		return false, stack
	}

	// We are still here so let's make sure OtherSuffix has a value
	if s.SuffixOther == "" {
		stack.Append("SuffixOther", ErrFieldRequired{"is required when `Other` Suffix is selected"})
		return false, stack
	}

	// Make sure SuffixOther contains valid characters
	return GenericNameField(s.SuffixOther).Valid()

}
