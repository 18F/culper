package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	logger := &log.Service{Log: log.NewLogger()}
	cmd.Command(logger, func(store api.StorageService, account *api.Account) {
		account.Unsubmit()
		updateErr := store.UpdateAccountStatus(account)
		if updateErr != nil {
			logger.WarnError("Failed to save unlocked account", updateErr, api.LogFields{"account": account.Username})
		} else {
			logger.Warn("Account unlocked", api.LogFields{"account": account.Username})
		}
	})
}
