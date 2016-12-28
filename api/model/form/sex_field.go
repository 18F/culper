package form

import (
	"fmt"
	"strings"
)

// SexField stores a person sex
type SexField string

// Valid validates that a valid sex was inputted
func (f SexField) Valid() (bool, error) {
	s := string(f)
	for _, sex := range sexList {
		if strings.EqualFold(s, sex) {
			return true, nil
		}
	}
	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid sex field", s)}
}

var sexList = [...]string{
	"",
	"female",
	"f",
	"male",
	"m",
}
