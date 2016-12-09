package form

import "fmt"

// HeightField stores a persons height
type HeightField struct {
	Feet   int64
	Inches int64
}

func (f HeightField) Valid() (bool, error) {
	if f.Feet < 1 || f.Feet > 9 {
		return false, fmt.Errorf("Invalid Feet")
	}

	if f.Inches < 0 || f.Inches > 11 {
		return false, fmt.Errorf("Invalid Inches")
	}

	return true, nil
}
