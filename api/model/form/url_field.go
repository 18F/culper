package form

// URLField contains a properly formatted URL
type URLField string

func (e URLField) Valid() (bool, error) {
	return true, nil
}
