package cmd

import (
	"flag"
	"os"

	"github.com/18F/e-QIP-prototype/api/db"
	"github.com/18F/e-QIP-prototype/api/logmsg"
	"github.com/18F/e-QIP-prototype/api/model"
	"github.com/sirupsen/logrus"
)

var (
	flagAll = flag.Bool("all", false, "apply to all accounts")
)

func Command(log *logrus.Logger, action func(*db.DatabaseContext, *model.Account)) {
	context := db.NewDB()
	flag.Parse()

	if *flagAll {
		// Retrieve all accounts within the system from the database so we
		// may iterate through them.
		var accounts []*model.Account
		if err := context.Database.Model(&accounts).Select(); err != nil {
			log.WithError(err).Warn(logmsg.NoAccount)
			return
		}

		// Iterate through the accounts with a given database context.
		for _, account := range accounts {
			account.WithContext(context)
			if err := account.Get(); err != nil {
				log.WithField("account", account.Username).WithError(err).Warn(logmsg.NoAccount)
				continue
			}

			// Perform the provided actions on the given account.
			action(context, account)
		}
	} else {
		// Assume all arguments are a username delimited by white space.
		for _, username := range os.Args[1:] {
			// Retrieve the account with the provided username and database context.
			account := &model.Account{Username: username}
			account.WithContext(context)
			if err := account.Get(); err != nil {
				log.WithField("account", account.Username).WithError(err).Warn(logmsg.NoAccount)
				continue
			}

			// Perform the provided actions on the given account.
			action(context, account)
		}
	}
}
