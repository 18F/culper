package mock

// MFAService is a mock implementation of multiple factor authentication.
type MFAService struct{}

// Secret creates a random secret and then base32 encodes it.
func (service MFAService) Secret() string {
	return ""
}

// Generate will create a QR code in PNG format which will then
// be base64 encoded so it can traverse the wire to the front end.
func (service MFAService) Generate(account, secret string) (string, error) {
	return "", nil
}

// Authenticate validates the initial token generated when configuring two-factor
// authentication for the first time.
func (service MFAService) Authenticate(token, secret string) (bool, error) {
	return true, nil
}
