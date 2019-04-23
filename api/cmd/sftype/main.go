package main

import (
	"fmt"
	"os"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/log"
	"github.com/18F/e-QIP-prototype/api/postgresql"
)

const usage string = `Usage:
	Print Type: $ sftype USERNAME
	  Set Type: $ sftype USERNAME SF_TYPE SF_VERSION
`

// sftype allows you to the SF type for an account.

func configureDB() api.DatabaseService {
	os.Setenv(api.LogLevel, "info")
	logger := &log.Service{Log: log.NewLogger()}
	settings := &env.Native{}
	settings.Configure()

	dbConf := postgresql.DBConfig{
		User:     os.Getenv(api.DatabaseUser),
		Password: os.Getenv(api.DatabasePassword),
		Address:  os.Getenv(api.DatabaseHost),
		DBName:   os.Getenv(api.DatabaseName),
	}

	db := postgresql.NewPostgresService(dbConf, logger)

	return db
}

func main() {

	if !((len(os.Args) == 2) || (len(os.Args) == 4)) {
		fmt.Println(usage)
		os.Exit(1)
	}

	username := os.Args[1]

	db := configureDB()

	account := api.Account{}
	account.Username = username
	err := account.Find(db)
	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	if len(os.Args) == 4 {
		sfType := os.Args[2]
		sfVersion := os.Args[3]

		account.FormType = sfType
		account.FormVersion = sfVersion
		_, err = account.Save(db, account.ID)
		if err != nil {
			fmt.Println("Error: ", err)
			os.Exit(1)
		}
	}

	fmt.Printf("%s %s %s\n", account.Username, account.FormType, account.FormVersion)

}
