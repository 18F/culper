package form

import "net/mail"

// EmailField contains a properly formatted email
type EmailField string

// Valid validates the format of an email address
func (e EmailField) Valid() (bool, error) {
	if _, err := mail.ParseAddress(string(e)); err != nil {
		return false, ErrFieldInvalid{"Email is not correctly formatted"}
	}
	return true, nil
}
