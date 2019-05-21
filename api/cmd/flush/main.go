package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	logger := &log.Service{Log: log.NewLogger()}
	cmd.Command(logger, func(context api.DatabaseService, account *api.Account) {
		delErr := store.DeleteApplication(account.ID)
		if delErr != nil {
			logger.Warn("Failed to purge account information", api.LogFields{"account": account.Username})
		}
		logger.Info("Account information purged", api.LogFields{"account": account.Username})
	})
}
