package mock

type MFAService struct{}

func (service MFAService) Secret() string {
	return ""
}

func (service MFAService) Generate(account, secret string) (string, error) {
	return "", nil
}

func (service MFAService) Authenticate(token, secret string) (bool, error) {
	return true, nil
}

func (service MFAService) Email(address, secret string) error {
	return nil
}
