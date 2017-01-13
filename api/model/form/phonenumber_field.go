package form

import (
	"fmt"
	"regexp"
	"strings"
)

var (
	domesticRegexp   = regexp.MustCompile("\\d{3}-\\d{3}-\\d{4}")
	dsnRegexp        = regexp.MustCompile("\\d{3}-\\d{4}")
	phoneNumberTypes = [...]string{"DSN", "International", "Domestic"}
	timeToCall       = [...]string{"Day", "Night", "Both"}
)

// PhoneNumberField contains the contents for a Phone Number
// TimeToCall = {Day, Night, Both}
// DSN = Check box if International or DSN phone number
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
