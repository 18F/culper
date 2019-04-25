package cmd

import (
	"flag"
	"os"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cloudfoundry"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/postgresql"
)

var (
	flagAll = flag.Bool("all", false, "apply to all accounts")
)

// Command represents a basic utility command.
func Command(log api.LogService, action func(api.DatabaseService, *api.Account)) {
	cloudfoundry.Configure()
	settings := &env.Native{}
	settings.Configure()

	dbConf := postgresql.DBConfig{
		User:     settings.String(api.DatabaseUser),
		Password: settings.String(api.DatabasePassword),
		Address:  settings.String(api.DatabaseHost),
		DBName:   settings.String(api.TestDatabaseName),
		SSLMode:  settings.String(api.DatabaseSSLMode),
	}
	database := postgresql.NewPostgresService(dbConf, log)

	flag.Parse()

	if *flagAll {
		// Retrieve all accounts within the system from the database so we
		// may iterate through them.
		var accounts []*api.Account
		if err := database.FindAll(&accounts); err != nil {
			log.WarnError(api.NoAccount, err, api.LogFields{})
			return
		}

		// Iterate through the accounts with a given database context.
		for _, account := range accounts {
			if _, err := account.Get(database, 0); err != nil {
				log.WarnError(api.NoAccount, err, api.LogFields{"account": account.Username})
				continue
			}

			// Perform the provided actions on the given account.
			action(database, account)
		}
	} else {
		// Assume all arguments are a username delimited by white space.
		for _, username := range os.Args[1:] {
			// Retrieve the account with the provided username and database context.
			account := &api.Account{Username: username}
			if _, err := account.Get(database, 0); err != nil {
				log.WarnError(api.NoAccount, err, api.LogFields{"account": account.Username})
				continue
			}

			// Perform the provided actions on the given account.
			action(database, account)
		}
	}
}
