package main

import (
	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/tools"
)

func main() {
	log := logmsg.NewLogger()
	tools.Command(log, func(context *db.DatabaseContext, account *model.Account) {
		account.Token = ""
		account.TokenUsed = false
		if err := account.Save(); err != nil {
			log.WithField("account", account.Username).WithError(err).Warn("Failed to reset MFA")
		} else {
			log.WithField("account", account.Username).Info("Account MFA reset")
		}
	})
}
