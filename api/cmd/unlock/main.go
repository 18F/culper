package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	logger := &log.LogService{Log: log.NewLogger()}
	cmd.Command(logger, func(context api.DatabaseService, account *api.Account) {
		if err := account.Unlock(context); err != nil {
			logger.WarnError("Failed to unlock account", err, api.LogFields{"account": account.Username})
		} else {
			logger.Warn("Account unlocked", api.LogFields{"account": account.Username})
		}
	})
}
