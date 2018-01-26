// +build !windows

package db

import (
	"os"

	"bitbucket.org/liamstask/goose/lib/goose"
	"github.com/18F/e-QIP-prototype/api/cf"
)

// MigrateUp attempts to push any pending updates to the database
func MigrateUp(directory, environment, schema string) error {
	setDatabaseURI()
	conf, err := goose.NewDBConf(directory, environment, schema)
	if err != nil {
		return err
	}

	target, err := goose.NumericComponent(os.Getenv("DB_MIGRATION_TARGET"))
	if err != nil {
		target, err = goose.GetMostRecentDBVersion(conf.MigrationsDir)
		if err != nil {
			return err
		}
	}

	return goose.RunMigrations(conf, conf.MigrationsDir, target)
}

// CurrentVersion gets the database current version according to the migration status
func CurrentVersion(directory, environment, schema string) (int64, error) {
	setDatabaseURI()
	conf, err := goose.NewDBConf(directory, environment, schema)
	if err != nil {
		return 0, err
	}

	return goose.GetDBVersion(conf)
}

func setDatabaseURI() {
	if addr := cf.DatabaseURI("aws-rds"); addr != "" {
		os.Setenv("DATABASE_URI", addr)
	}
}
