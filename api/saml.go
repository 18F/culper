package api

// SamlService represents a service to request and validate SAML responses.
type SamlService interface {
	CreateAuthenticationRequest() (string, string, error)
	ValidateAuthenticationResponse(encoded string) (string, string, error)
	CreateSLORequest(string, string) (string, string, error)
}
