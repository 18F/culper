package main

import (
	"bufio"
	"database/sql"
	"flag"
	"fmt"
	"os"
	"unicode"

	_ "github.com/lib/pq"
	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/postgresql"
)

func checkDBNameIsAllowed(dbName string) bool {
	for _, r := range dbName {
		if !(unicode.IsLetter(r) || r == '_') {
			return false
		}
	}
	return true
}

func resetDB(dbName string, force bool) error {
	fmt.Println("Resetting", dbName)

	if !checkDBNameIsAllowed(dbName) || dbName == "" {
		return errors.New(fmt.Sprintf("Attempted to reset a db with a strange name: %s", dbName))
	}

	settings := env.Native{}
	settings.Configure()

	dbConf := postgresql.DBConfig{
		User:     settings.String(api.DatabaseUser),
		Password: settings.String(api.DatabasePassword),
		Address:  settings.String(api.DatabaseHost),
		DBName:   "template1", // template1 exists on all default postgres instances.
	}

	connStr := postgresql.PostgresConnectURI(dbConf)

	db, openErr := sql.Open("postgres", connStr)
	if openErr != nil {
		return errors.Wrap(openErr, "Error opening connection")
	}

	check, checkErr := db.Exec("SELECT 1 AS result FROM pg_database WHERE datname=$1", dbName)
	if checkErr != nil {
		return errors.Wrap(checkErr, fmt.Sprintf("ERROR Checking for existence of %s", dbName))
	}

	checkCount, _ := check.RowsAffected()
	if checkCount != 0 {
		// We need to delete the requested db.

		if !force {
			fmt.Printf("DANGER: resetting this db will erase all the data in %s permanently, is that what you want? [y/N]: ", dbName)
			scanner := bufio.NewScanner(os.Stdin)
			scanner.Scan()
			text := scanner.Text()

			if scanner.Err() != nil {
				return errors.New("error getting user confirmation")
			}

			fmt.Println(text)
			if !(text == "y" || text == "Y" || text == "YES" || text == "yes") {
				return errors.New("user disconfirmed reset")
			}

		}

		dropCmd := "DROP DATABASE " + dbName
		_, dropErr := db.Exec(dropCmd)
		if dropErr != nil {
			return dropErr
		}

	}

	createCmd := "CREATE DATABASE " + dbName
	_, createErr := db.Exec(createCmd)
	if createErr != nil {
		return errors.Wrap(createErr, "Error Creating db")
	}

	return nil
}

func main() {
	forceReset := flag.Bool("force", false, "skips the interactive dialog triggered by reset")
	flag.Parse()

	if len(flag.Args()) != 1 {
		fmt.Println("Must pass the db_name as an argument")
		flag.Usage()
		os.Exit(1)
	}

	dbName := flag.Args()[0]

	resetErr := resetDB(dbName, *forceReset)
	if resetErr != nil {
		fmt.Println(resetErr)
		os.Exit(1)
	}

	fmt.Println("HI THERE")

}
