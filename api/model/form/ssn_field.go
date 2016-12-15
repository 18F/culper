package form

import "regexp"

var (
	// SSNRegexp validates the format of a Social Security Number
	SSNRegexp = regexp.MustCompile("^\\d{3}\\d{2}\\d{4}$")
)

// SSNField stores a persons social security number
// https://www.ssa.gov/employer/randomization.html
type SSNField struct {
	SSN        string
	Applicable bool
}

// Valid validates the format of a Social Security Number if it is applicable
func (s SSNField) Valid() (bool, error) {
	if !s.Applicable {
		return true, nil
	}

	// If Applicable, a SSN must be provided
	if s.SSN == "" {
		return false, ErrFieldRequired{"if Applicable is marked, a Social Security Number must be provided"}
	}

	if ok := SSNRegexp.MatchString(s.SSN); !ok {
		return false, ErrFieldInvalid{"is not a valid formatted Social Security Number"}
	}

	return true, nil
}
