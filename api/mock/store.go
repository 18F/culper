package mock

import (
	"github.com/18F/e-QIP-prototype/api"
)

type StorageService struct{}

func (s *StorageService) CreateApplication(app api.Application) error {
	return nil
}

func (s *StorageService) UpdateApplication(app api.Application) error {
	return nil
}

func (s *StorageService) SaveSection(section api.Section, accountID int) error {
	return nil
}

func (s *StorageService) LoadApplication(accountID int) (api.Application, error) {
	return api.Application{}, nil
}
