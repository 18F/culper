package form

// HairColorField stores the persons hair color
type HairColorField string

func (f HairColorField) Valid() (bool, error) {
	// Check if from enum of hair color
	return true, nil
}
