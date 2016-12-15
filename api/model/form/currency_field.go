package form

// CurrencyField stores US Currency alues
type CurrencyField struct {
	Amount    string
	Estimated bool
}

func (f CurrencyField) Valid() (bool, error) {
	return true, nil
}
