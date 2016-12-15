package form

// EyeColorField stores the persons eye color
type EyeColorField string

func (f EyeColorField) Valid() (bool, error) {
	// Check if from enum of hair color
	return true, nil
}
