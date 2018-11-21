package api

// SAMLResponseType represents the type of a SAML response received from the identity server
type SAMLResponseType string

const (
	// AuthnSAMLResponseType represents an Aunthn Response
	AuthnSAMLResponseType SAMLResponseType = "AuthnSAMLResponseType"
	// LogoutSAMLResponseType represents a Logout Response
	LogoutSAMLResponseType SAMLResponseType = "LogoutSAMLResponseType"
)

// SamlService represents a service to request and validate SAML responses.
type SamlService interface {
	CreateAuthenticationRequest() (string, string, error)
	ValidateAuthenticationResponse(encoded string) (string, string, error)
	CreateSLORequest(string, string) (string, string, error)
	ResponseType(encoded string) (SAMLResponseType, error)
}
