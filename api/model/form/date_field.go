package form

import (
	"fmt"
	"time"
)

const (
	dateFieldParser = "1-2-2006"
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
	formatted := fmt.Sprintf("%v-%v-%v", d.Month, d.Day, d.Year)
	if _, err := time.Parse(dateFieldParser, formatted); err != nil {
		fmt.Println(err)
		return false, ErrFieldInvalid{err.Error()}
	}
	return true, nil
}

// Time creates a time.Time based off of the values entered
func (d DateField) Time() (time.Time, error) {
	if ok, err := d.Valid(); !ok {
		return time.Time{}, err
	}

	formatted := fmt.Sprintf("%v-%v-%v", d.Month, d.Day, d.Year)
	return time.Parse(dateFieldParser, formatted)
}

// Parse converts a date string and populates the date field values
func (d *DateField) Parse(date string) error {
	t, err := time.Parse(dateFieldParser, date)
	if err != nil {
		return ErrFieldInvalid{err.Error()}
	}
	d.Day = int64(t.Day())
	d.Month = int64(t.Month())
	d.Year = int64(t.Year())

	return nil
}

// YearDiff finds the difference in years between two dates.
// This was obtained from a stack overflow post.  http://stackoverflow.com/a/36531443/464064
// Finding the difference in years is not as trivial since it has to take into account leap years
func (d DateField) YearDiff(a, b time.Time) int {
	if a.Location() != b.Location() {
		b = b.In(a.Location())
	}
	if a.After(b) {
		a, b = b, a
	}
	y1, M1, d1 := a.Date()
	y2, M2, d2 := b.Date()

	h1, m1, s1 := a.Clock()
	h2, m2, s2 := b.Clock()

	year := int(y2 - y1)
	month := int(M2 - M1)
	day := int(d2 - d1)
	hour := int(h2 - h1)
	min := int(m2 - m1)
	sec := int(s2 - s1)

	// Normalize negative values
	if sec < 0 {
		sec += 60
		min--
	}
	if min < 0 {
		min += 60
		hour--
	}
	if hour < 0 {
		hour += 24
		day--
	}
	if day < 0 {
		// days in month:
		t := time.Date(y1, M1, 32, 0, 0, 0, 0, time.UTC)
		day += 32 - t.Day()
		month--
	}
	if month < 0 {
		month += 12
		year--
	}

	return year
}
