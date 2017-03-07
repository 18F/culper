package form

import (
	"fmt"
	"time"
)

// DateRangeField contains from and to dates and ensures they are within a valid range
type DateRangeField struct {
	From DateField
	To   DateField
}

// Valid validates that a from date comes before a to date
func (f DateRangeField) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := f.From.Valid(); !ok {
		stack.Append("From", err)
	}

	if ok, err := f.To.Valid(); !ok {
		stack.Append("To", err)
	}
	if stack.HasErrors() {
		return false, stack
	}

	from, _ := f.From.Time()
	to, _ := f.To.Time()
	if from.After(to) {
		var stack ErrorStack
		stack.Append("From", ErrFieldInvalid{fmt.Sprintf("From date `%v` must come before To date `%v`", from, to)})
		return false, stack
	}

	return true, nil
}

// Parse takes a formatted date string `yyyy-mm-dd` and populates the To and From
// datefields
func (f *DateRangeField) Parse(from, to string) error {

	// Handle from date
	fromDateField := DateField{}
	if err := fromDateField.Parse(from); err != nil {
		return ErrFieldInvalid{err.Error()}
	}
	f.From = fromDateField

	// If `to` is empty, assume present
	if to == "" {
		now := time.Now()
		f.From = DateField{
			Day:   int64(now.Day()),
			Year:  int64(now.Year()),
			Month: int64(now.Month()),
		}
		return nil
	}

	toDateField := DateField{}
	if err := toDateField.Parse(to); err != nil {
		return ErrFieldInvalid{err.Error()}
	}
	f.To = toDateField
	return nil
}
