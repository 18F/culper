package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	logger := &log.Service{Log: log.NewLogger()}
	cmd.Command(logger, func(context api.DatabaseService, store api.StorageService, account *api.Account) {
		account.Unsubmit()
		if _, err := account.Save(context, account.ID); err != nil {
			logger.WarnError("Failed to save unlocked account", err, api.LogFields{"account": account.Username})
		} else {
			logger.Warn("Account unlocked", api.LogFields{"account": account.Username})
		}
	})
}
