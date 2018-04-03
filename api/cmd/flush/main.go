package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	log := &log.LogService{log: log.NewLogger()}
	cmd.Command(log, func(context *api.DatabaseService, account *api.Account) {
		api.PurgeAccountStorage(context, account.ID)
		log.Info("Account information purged", api.LogFields{"account": account.Username})
	})
}
