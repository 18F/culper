package form

import (
	"fmt"
	"time"
)

// DateField stores date information by month, day and year. It also
// contains a flag to indicate if the date is estimated
type DateField struct {
	Month     int64
	Day       int64
	Year      int64
	Estimated bool
}

// Valid determines if field is valid
// TODO Figure out exactly how estimated affects overall validation
func (d DateField) Valid() (bool, error) {
	var stack ErrorStack

	if d.Month < 1 || d.Month > 12 {
		stack.Append("Month", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid month", d.Month)})
	}

	if d.Day < 1 || d.Day > 31 {
		stack.Append("Day", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid day", d.Month)})
	}

	if d.Year < 1900 {
		stack.Append("Year", ErrFieldInvalid{fmt.Sprintf("`%v` is an invalid year", d.Month)})
	}

	return !stack.HasErrors(), stack
}

// Time creates a time.Time based off of the values entered
// TODO this will be affected by how estimated is calculated
func (d DateField) Time() (time.Time, error) {
	if ok, err := d.Valid(); !ok {
		return time.Time{}, err
	}

	formatted := fmt.Sprintf("%v/%v/%v", d.Month, d.Day, d.Year)
	return time.Parse("1/2/2006", formatted)
}
