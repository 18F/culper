package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"

	"github.com/pkg/errors"

	"github.com/18F/e-QIP-prototype/api"
	"github.com/18F/e-QIP-prototype/api/env"
	"github.com/18F/e-QIP-prototype/api/postgresql"
)

func pathToPattern(path, pattern string) string {

	dir, subject := filepath.Split(path)
	if subject == pattern {
		return path
	}

	if subject == "" {
		return ""
	}

	return pathToPattern(dir, pattern)
}

func runMigrations(dbName string, migrationsPath string) error {
	os.Setenv(api.DatabaseName, dbName)

	settings := env.Native{}
	settings.Configure()

	dbConf := postgresql.DBConfig{
		User:     settings.String(api.DatabaseUser),
		Password: settings.String(api.DatabasePassword),
		Address:  settings.String(api.DatabaseHost),
		DBName:   dbName,
	}

	connStr := postgresql.PostgresConnectURI(dbConf)

	apiPath := filepath.Dir(filepath.Clean(migrationsPath))

	migration := api.Migration{Env: settings}
	if migrationErr := migration.Up(connStr, apiPath, settings.String(api.GolangEnv), ""); migrationErr != nil {
		return errors.Wrap(migrationErr, fmt.Sprintf("Error running migrations in path: %s", migrationsPath))
	}

	return nil
}

type stackTracer interface {
	StackTrace() errors.StackTrace
}

func main() {
	migrationsPath := flag.String("migrations_path", "", "path to the directory containing migrations. If left out it will be guessed.")

	flag.Parse()

	if *migrationsPath == "" {
		fmt.Println("Must pass -migrations_path explicitly")
		flag.Usage()
		os.Exit(1)
	}

	if len(flag.Args()) != 1 {
		fmt.Println("Must pass the db_name as an argument")
		flag.Usage()
		os.Exit(1)
	}

	dbName := flag.Args()[0]

	migrationErr := runMigrations(dbName, *migrationsPath)
	if migrationErr != nil {
		fmt.Println(migrationErr)
		os.Exit(1)
	}

}
