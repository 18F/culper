package form

// DateRangeField contains from and to dates and ensures they are within a valid range
type DateRangeField struct {
	From DateField
	To   DateField
}

func (f DateRangeField) Valid() (bool, error) {
	var stack ErrorStack

	if ok, err := f.From.Valid(); !ok {
		stack.Append("From", err)
	}

	if ok, err := f.To.Valid(); !ok {
		stack.Append("From", err)
	}
	return !stack.HasErrors(), stack
}
