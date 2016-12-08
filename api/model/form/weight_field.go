package form

import "fmt"

// WeightField stores a persons weight
type WeightField int64

func (f WeightField) Valid() (bool, error) {
	if f < 0 || f > 2000 {
		return false, fmt.Errorf("Invalid weight")
	}

	return true, nil
}
