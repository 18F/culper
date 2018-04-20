package mock

type SamlService struct{}

func (service *SamlService) CreateAuthenticationRequest() (string, string, error) {
	return "", "", nil
}

func (service *SamlService) ValidateAuthenticationResponse(encoded string) (string, error) {
	return "test01", nil
}
