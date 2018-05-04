package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	logger := &log.Service{Log: log.NewLogger()}
	cmd.Command(logger, func(context api.DatabaseService, account *api.Account) {
		api.PurgeAccountStorage(context, account.ID)
		logger.Info("Account information purged", api.LogFields{"account": account.Username})
	})
}
