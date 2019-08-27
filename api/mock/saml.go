package mock

// SamlService mock implementation of SAML handling.
type SamlService struct{}

// CreateAuthenticationRequest creates a SAML 2.0 authentication request based on the service provider settings.
// If configured to sign the request then the Base64 XML will be signed.
func (service *SamlService) CreateAuthenticationRequest() (string, string, error) {
	return "", "", nil
}

// ValidateAuthenticationResponse validations a SAML authentication response.
func (service *SamlService) ValidateAuthenticationResponse(encoded string) (string, error) {
	return "test01", nil
}
