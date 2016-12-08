package form

import (
	"fmt"
	"regexp"
)

// SSNField stores a persons social security number
// https://www.ssa.gov/employer/randomization.html
type SSNField struct {
	First         string
	Middle        string
	Last          string
	NotApplicable bool
}

// Valid validates the format of a Social Security Number if it is applicable
func (s SSNField) Valid() (bool, error) {
	if s.NotApplicable {
		return true, nil
	}

	var stack ErrorStack
	if s.First == "" {
		stack.Append("First", ErrFieldRequired{"First is a required field"})
	} else {
		if ok, _ := regexp.MatchString("^\\d{3}$", s.First); !ok {
			stack.Append("First", ErrFieldInvalid{fmt.Sprintf("`%s` is an invalid First value", s.First)})
		}
	}

	if s.Middle == "" {
		stack.Append("Middle", ErrFieldRequired{"Middle is a required field"})
	} else {
		if ok, _ := regexp.MatchString("^\\d{2}$", s.First); !ok {
			stack.Append("Middle", ErrFieldInvalid{fmt.Sprintf("`%s` is an invalid Middle value", s.Middle)})
		}
	}

	if s.Last == "" {
		stack.Append("Last", ErrFieldRequired{"Last is a required field"})
	} else {
		if ok, _ := regexp.MatchString("^\\d{4}$", s.First); !ok {
			stack.Append("Last", ErrFieldInvalid{fmt.Sprintf("`%s` is an invalid Last value", s.Last)})
		}
	}

	// Make sure values are accurate
	return !stack.HasErrors(), stack
}
