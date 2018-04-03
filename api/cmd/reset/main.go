package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	log := &log.LogService{log: log.NewLogger()}
	cmd.Command(log, func(context *api.DatabaseService, account *api.Account) {
		account.Token = ""
		account.TokenUsed = false
		if err := account.Save(); err != nil {
			log.Warn("Failed to reset MFA", err, api.LogFields{"account": account.Username})
		} else {
			log.Info("Account MFA reset", api.LogFields{"account": account.Username})
		}
	})
}
