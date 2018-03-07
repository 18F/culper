package main

import (
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/tools"
)

func main() {
	log := logmsg.NewLogger()
	tools.Command(log, func(account *model.Account) {
		if err := account.Unlock(); err != nil {
			log.WithField("account", account.Username).WithError(err).Warn("Failed to unlock account")
		} else {
			log.WithField("account", account.Username).Info("Account unlocked")
		}
	})
}
