package cmd

import (
	"flag"
	"os"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/cloudfoundry"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/simplestore"
)

var (
	flagAll = flag.Bool("all", false, "apply to all accounts")
)

// Command represents a basic utility command.
func Command(log api.LogService, action func(api.StorageService, *api.Account)) {
	cloudfoundry.Configure()
	settings := &env.Native{}
	settings.Configure()

	dbConf := simplestore.DBConfig{
		User:     settings.String(api.DatabaseUser),
		Password: settings.String(api.DatabasePassword),
		Address:  settings.String(api.DatabaseHost),
		DBName:   settings.String(api.DatabaseName),
		SSLMode:  settings.String(api.DatabaseSSLMode),
	}
	// database := postgresql.NewPostgresService(dbConf, log)

	serializer := simplestore.NewJSONSerializer()
	store, storeErr := simplestore.NewSimpleStore(simplestore.PostgresConnectURI(dbConf), log, serializer)
	if storeErr != nil {
		log.WarnError("Error configuring Simple Store", storeErr, api.LogFields{})
		return
	}

	flag.Parse()

	if *flagAll {
		// Retrieve all accounts within the system from the database so we
		// may iterate through them.
		accounts, listErr := store.ListAccounts()
		if listErr != nil {
			log.WarnError(api.NoAccount, listErr, api.LogFields{})
			return
		}

		// Iterate through the accounts with a given database context.
		for _, account := range accounts {
			// Perform the provided actions on the given account.
			action(store, &account)
		}
	} else {
		// Assume all arguments are a username delimited by white space.
		for _, username := range os.Args[1:] {
			// Retrieve the account with the provided username and database context.
			account, fetchErr := store.FetchAccountByUsername(username)
			if fetchErr != nil {
				log.WarnError(api.NoAccount, fetchErr, api.LogFields{"account": account.Username})
				continue
			}

			// Perform the provided actions on the given account.
			action(store, &account)
		}
	}
}
