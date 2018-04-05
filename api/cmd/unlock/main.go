package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	log := &log.LogService{log: log.NewLogger()}
	cmd.Command(log, func(context *api.DatabaseService, account *api.Account) {
		if err := account.Unlock(); err != nil {
			log.WarnError("Failed to unlock account", err, api.LogFields{"account": account.Username})
		} else {
			log.Warn("Account unlocked", api.LogFields{"account": account.Username})
		}
	})
}
