// +build !windows

package db

import (
	"os"
	"path/filepath"

	"github.com/18F/e-QIP-prototype/api/cf"
	"github.com/truetandem/plucked/migration"
)

// MigrateUp attempts to push any pending updates to the database
func MigrateUp(directory, environment, schema string) error {
	conf, err := databaseConf(directory, environment, schema)
	if err != nil {
		return err
	}

	target, err := migration.NumericComponent(os.Getenv("DB_MIGRATION_TARGET"))
	if err != nil {
		target, err = migration.GetMostRecentDBVersion(conf.MigrationsDir)
		if err != nil {
			return err
		}
	}

	return migration.RunMigrations(conf, conf.MigrationsDir, target)
}

// CurrentVersion gets the database current version according to the migration status
func CurrentVersion(directory, environment, schema string) (int64, error) {
	conf, err := databaseConf(directory, environment, schema)
	if err != nil {
		return 0, err
	}

	return migration.GetDBVersion(conf)
}

// databaseConf will generate the configuration in memory using environment variables
// instead of the YAML file. This is ideal to reduce the dependencies in production.
func databaseConf(directory, environment, schema string) (*migration.DBConf, error) {
	// Pull from database connection string from the environment
	uri := cf.DatabaseURI("aws-rds")
	return &migration.DBConf{
		MigrationsDir: filepath.Join(directory, "migrations"),
		Env:           environment,
		PgSchema:      schema,
		Driver:        databaseDriver(uri),
	}, nil
}

// databasDriver creates the structure required for migration database driver.
func databaseDriver(uri string) migration.DBDriver {
	return migration.DBDriver{
		Name:    "postgres",
		OpenStr: uri,
		Import:  "github.com/lib/pq",
		Dialect: &migration.PostgresDialect{},
	}
}
