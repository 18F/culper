package api

type SamlService interface {
	CreateAuthenticationRequest() (string, string, error)
	ValidateAuthenticationResponse(encoded string) (string, error)
}
