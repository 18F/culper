package form

import "time"

// BirthdateField represents an applicants birthdate. We create this based
// off of the DateField type to reuse its fields. Note that the Valid() method
// is NOT inherited.
type BirthdateField DateField

// Valid ensures the an applicants birthdate meets the following criteria:
// - Is a valid date that accounts for leap years and out of bounds date values
// - Applicant is older than 16 years
// - Maximum date difference is 130 years
func (f BirthdateField) Valid() (bool, error) {

	// Use generic DateField validation to ensure date values are valid
	d := DateField(f)
	if ok, err := d.Valid(); !ok {
		return false, err
	}

	// Ensure difference is within range
	t, err := d.Time()
	if err != nil {
		return false, err
	}

	// Get time difference between birthdate and now
	years := d.YearDiff(time.Now(), t)

	// Ensure that birthdate is greater than 16 years old
	if years <= 16 {
		return false, ErrFieldInvalid{"Birthdate is less than 16 years"}
	}

	if years >= 130 {
		return false, ErrFieldInvalid{"Birthdate is greater than 130 years"}
	}

	return true, nil
}
