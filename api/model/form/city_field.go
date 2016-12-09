package form

import "fmt"

// StateField stores a state location
type CityField string

func (f CityField) Valid() (bool, error) {
	s := string(f)
	if s == "" {
		return false, ErrFieldRequired{"City is required"}
	}
	// TODO Just forcing more characters for testing purposes
	if len(s) < 3 {
		return false, ErrFieldRequired{fmt.Sprintf("`%v` is an invalid city", s)}
	}
	return true, nil
}
