package api

// MFAService represents a service which implements mutliple factor authentication.
type MFAService interface {
	Secret() string
	Generate(account, secret string) (string, error)
	Authenticate(token, secret string) (bool, error)
}
