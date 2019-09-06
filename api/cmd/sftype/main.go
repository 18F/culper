package main

import (
	"fmt"
	"os"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/simplestore"
)

const usage string = `Usage:
	Print Type: $ sftype USERNAME
	  Set Type: $ sftype USERNAME SF_TYPE SF_VERSION
`

// sftype allows you to the SF type for an account.

func configureDB() simplestore.SimpleStore {
	os.Setenv(api.LogLevel, "info")
	logger := &log.Service{Log: log.NewLogger()}
	settings := &env.Native{}
	settings.Configure()

	dbConf := simplestore.DBConfig{
		User:     os.Getenv(api.DatabaseUser),
		Password: os.Getenv(api.DatabasePassword),
		Address:  os.Getenv(api.DatabaseHost),
		DBName:   os.Getenv(api.DatabaseName),
		SSLMode:  os.Getenv(api.DatabaseSSLMode),
	}

	serializer := simplestore.NewJSONSerializer()
	store, storeErr := simplestore.NewSimpleStore(simplestore.PostgresConnectURI(dbConf), logger, serializer)
	if storeErr != nil {
		fmt.Println(storeErr)
		os.Exit(2)
	}

	return store
}

func main() {

	if !((len(os.Args) == 2) || (len(os.Args) == 4)) {
		fmt.Println(usage)
		os.Exit(1)
	}

	username := os.Args[1]

	store := configureDB()

	account, fetchErr := store.FetchAccountByUsername(username)
	if fetchErr != nil {
		fmt.Println("Error: ", fetchErr)
		os.Exit(1)
	}

	if len(os.Args) == 4 {
		sfType := os.Args[2]
		sfVersion := os.Args[3]

		account.FormType = sfType
		account.FormVersion = sfVersion

		updateErr := store.UpdateAccountInfo(&account)
		if updateErr != nil {
			fmt.Println("Error: ", updateErr)
			os.Exit(1)
		}
	}

	fmt.Printf("%s %s %s\n", account.Username, account.FormType, account.FormVersion)

}
