package main

import (
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/18F/e-QIP-prototype/api/tools"
)

func main() {
	log := logmsg.NewLogger()
	tools.Command(log, func(account *model.Account) {
		form.PurgeAccountStorage(context, account.ID)
		log.WithField("account", account.Username).Info("Account information purged")
	})
}
