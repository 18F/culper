package form

// MaritalStatusField stores the persons marital status
// {Never Married, Married (Including Common Law, Separated, Annulled, Divorced, Widowed}
type MaritalStatusField string

func (f MaritalStatusField) Valid() (bool, error) {
	return true, nil
}
