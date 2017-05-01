package form

import (
	"fmt"
	"strings"
)

// StateField stores a state location
type StateField string

// Valid ensures that an appropriate state value is selected
func (f StateField) Valid() (bool, error) {
	s := string(f)
	for _, state := range stateList {
		if strings.EqualFold(state, s) {
			return true, nil
		}
	}

	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid state", s)}
}

var stateList = [...]string{
	"",
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"DC",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
	"AS",
	"FQ",
	"GU",
	"HQ",
	"DQ",
	"JQ",
	"KQ",
	"MH",
	"FM",
	"MQ",
	"BQ",
	"MP",
	"PW",
	"LQ",
	"PR",
	"VI",
	"WQ",
	"AE",
	"AP",
	"AA",
}
