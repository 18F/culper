package form

import "fmt"

// StateField stores a state location
type StateField string

func (f StateField) Valid() (bool, error) {
	state := string(f)
	if state == "" {
		return false, ErrFieldRequired{"State is required"}
	}

	if len(state) < 2 {
		return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid state", state)}
	}
	return true, nil
}
