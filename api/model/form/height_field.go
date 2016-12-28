package form

import "fmt"

// HeightField stores a persons height
type HeightField struct {
	Feet   int64
	Inches int64
}

// Valid validates that a persons height in feet is between 1 and 9 and that a person height in inches is between 0 and 11
func (f HeightField) Valid() (bool, error) {
	var stack ErrorStack
	if f.Feet < 1 || f.Feet > 9 {
		stack.Append("Feet", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid value. Feet must be between 1 and 9", f.Feet)})
	}

	if f.Inches < 0 || f.Inches > 11 {
		stack.Append("Feet", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid value. Inches must be between 0 and 11", f.Inches)})
	}

	return !stack.HasErrors(), stack
}
