package form

// MonthYearField is a subset of the DateField
type MonthYearField struct {
	Month     int64
	Year      int64
	Estimated bool
}

func (d MonthYearField) Valid() (bool, error) {
	return true, nil
}
