package main

import (
	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cmd"
	"github.com/18F/e-QIP-prototype/api/log"
)

func main() {
	logger := &log.Service{Log: log.NewLogger()}
	cmd.Command(logger, func(context api.DatabaseService, account *api.Account) {
		account.Token = ""
		account.TokenUsed = false
		if _, err := account.Save(context, account.ID); err != nil {
			logger.WarnError("Failed to reset MFA", err, api.LogFields{"account": account.Username})
		} else {
			logger.Info("Account MFA reset", api.LogFields{"account": account.Username})
		}
	})
}
