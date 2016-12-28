package form

import "fmt"

// WeightField stores a persons weight
type WeightField int64

// Valid validates that a person weight is within the specified range
func (f WeightField) Valid() (bool, error) {
	if f < 10 || f > 999 {
		return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid weight value. Weight must be between 10 and 999")}
	}

	return true, nil
}
