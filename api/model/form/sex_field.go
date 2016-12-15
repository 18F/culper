package form

import (
	"fmt"
	"strings"
)

// SexField stores a person sex
type SexField string

func (f SexField) Valid() (bool, error) {
	switch strings.ToLower(string(f)) {
	case "male":
		return true, nil
	case "female":
		return true, nil
	default:
		return false, fmt.Errorf("Invalid sex field")
	}
}
