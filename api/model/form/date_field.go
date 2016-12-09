package form

import (
	"fmt"
	"time"
)

var (
	dateFieldParser = "1/2/2006"
)

// DateField stores date information by month, day and year. It also
// contains a flag to indicate if the date is estimated
type DateField struct {
	Month     int64
	Day       int64
	Year      int64
	Estimated bool
}

// Valid determines if the provided date values are valid. The time.Time
// package properly takes into account leap years. If a date field is out of
// range, an error is returned
func (d DateField) Valid() (bool, error) {
	formatted := fmt.Sprintf("%v/%v/%v", d.Month, d.Day, d.Year)
	if _, err := time.Parse(dateFieldParser, formatted); err != nil {
		return false, ErrFieldInvalid{err.Error()}
	}
	return true, nil
}

// Time creates a time.Time based off of the values entered
func (d DateField) Time() (time.Time, error) {
	if ok, err := d.Valid(); !ok {
		return time.Time{}, err
	}

	formatted := fmt.Sprintf("%v/%v/%v", d.Month, d.Day, d.Year)
	return time.Parse(dateFieldParser, formatted)
}
