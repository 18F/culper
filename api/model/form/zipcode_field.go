package form

import (
	"fmt"
	"regexp"
)

// ZipcodeField stores a properly formatted zipcode
type ZipcodeField string

func (f ZipcodeField) Valid() (bool, error) {
	zip := string(f)
	if string(zip) == "" {
		return false, ErrFieldRequired{"Zipcode is required"}
	} else {
		if ok, _ := regexp.MatchString("^\\d{5}$", zip); !ok {
			return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid Zipcode", zip)}
		}
	}

	return true, nil
}
