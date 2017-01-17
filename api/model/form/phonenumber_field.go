package form

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	domesticRegexp = regexp.MustCompile("\\d{3}-\\d{3}-\\d{4}")
	// first three are for the country code
	internationalRegexp = regexp.MustCompile("\\d{3}-\\d{4}-\\d{4}")
	dsnRegexp           = regexp.MustCompile("\\d{3}-\\d{4}")
	phoneNumberTypes    = [...]string{"DSN", "International", "Domestic"}
	timeToCall          = [...]string{"Day", "Night", "Both"}

	// DomesticPhoneNumberVar contains expected constant for domestic number
	DomesticPhoneNumberKey = "Domestic"

	// InternationalPhoneNumberVar contains expected constant for international numbers
	InternationalPhoneNumberKey = "International"

	// DSNPhoneNumberVar contains expected constant for DSN numbers
	DSNPhoneNumberKey = "DSN"
)

// PhoneNumberField contains the contents for a Phone Number
// TimeToCall = {Day, Night, Both}
// Type = Dsn, International or Domestic
type PhoneNumberField struct {
	Number     string
	Extension  string
	TimeToCall TimeToCallField
	Type       PhoneNumberTypeField
}

// Valid validates a phone number
func (p PhoneNumberField) Valid() (bool, error) {
	// Make sure we have a valid type
	if ok, err := p.Type.Valid(); !ok {
		return false, err
	}

	// Make sure the number formats are correct
	switch strings.ToLower(string(p.Type)) {
	case "domestic":
		if ok := domesticRegexp.MatchString(p.Number); !ok {
			return false, ErrFieldInvalid{fmt.Sprintf("Domestic number `%v` is not properly formatted", p.Number)}
		}
	case "dsn":
		if ok := dsnRegexp.MatchString(p.Number); !ok {
			return false, ErrFieldInvalid{fmt.Sprintf("DSN number `%v` is not properly formatted", p.Number)}
		}
	case "international":
		if ok := internationalRegexp.MatchString(p.Number); !ok {
			return false, ErrFieldInvalid{fmt.Sprintf("International number `%v` is not properly formatted", p.Number)}
		}
	}

	// Make sure a valid time to call value is used
	if ok, err := p.TimeToCall.Valid(); !ok {
		return false, err
	}

	return true, nil
}

// TimeToCallField stores a time value when a person is available to speak
type TimeToCallField string

// Valid that a valid time to call option is entered
func (t TimeToCallField) Valid() (bool, error) {
	ttc := string(t)
	for _, t := range timeToCall {
		if strings.EqualFold(t, ttc) {
			return true, nil
		}
	}
	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid time to call value", ttc)}

}

// PhoneNumberTypeField stores a specific phone number type
type PhoneNumberTypeField string

// Valid validates that a correct phone number type is inputted
func (p PhoneNumberTypeField) Valid() (bool, error) {
	pType := string(p)
	for _, t := range phoneNumberTypes {
		if strings.EqualFold(t, pType) {
			return true, nil
		}
	}
	return false, ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid phone number type", pType)}
}
