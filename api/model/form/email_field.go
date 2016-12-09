package form

import "net/mail"

// EmailField contains a properly formatted email
type EmailField string

func (e EmailField) Valid() (bool, error) {
	if _, err := mail.ParseAddress(string(e)); err != nil {
		return false, ErrFieldInvalid{"Invalid email"}
	}
	return true, nil
}
