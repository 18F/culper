package form

// EmploymentStatusField contains a person employement status.
// {Full-time, Part-time}
type EmploymentStatusField string

func (e EmploymentStatusField) Valid() (bool, error) {
	return true, nil
}
