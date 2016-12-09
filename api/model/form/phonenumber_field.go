package form

// PhoneNumberField contains the contents for a Phone Number
// TimeToCall = {Day, Night, Both}
// DSN = Check box if International or DSN phone number
type PhoneNumberField struct {
	Number     string
	Extension  string
	TimeToCall string
	DSN        bool
}

func (p PhoneNumberField) Valid() (bool, error) {
	return true, nil
}
