// +build !windows

package api

import (
	"path/filepath"

	"github.com/truetandem/plucked/migration"
)

type Migration struct {
	Env      Settings
	Database DatabaseService
}

// MigrateUp attempts to push any pending updates to the database
func (service Migration) Up(directory, environment, schema string) error {
	conf, err := service.databaseConf(directory, environment, schema)
	if err != nil {
		return err
	}

	var target int64
	if service.Env.Has(DB_MIGRATION_TARGET) {
		target, err = migration.NumericComponent(service.Env.String("DB_MIGRATION_TARGET"))
		if err != nil {
			target, err = migration.GetMostRecentDBVersion(conf.MigrationsDir)
			if err != nil {
				return err
			}
		}
	}

	return migration.RunMigrations(conf, conf.MigrationsDir, target)
}

// CurrentVersion gets the database current version according to the migration status
func (service Migration) CurrentVersion(directory, environment, schema string) (int64, error) {
	conf, err := service.databaseConf(directory, environment, schema)
	if err != nil {
		return 0, err
	}

	return migration.GetDBVersion(conf)
}

// databaseConf will generate the configuration in memory using environment variables
// instead of the YAML file. This is ideal to reduce the dependencies in production.
func (service Migration) databaseConf(directory, environment, schema string) (*migration.DBConf, error) {
	// Pull from database connection string from the environment
	// TODO: Figure this one out
	// uri := cf.DatabaseURI("aws-rds")
	uri := ""
	return &migration.DBConf{
		MigrationsDir: filepath.Join(directory, "migrations"),
		Env:           environment,
		PgSchema:      schema,
		Driver:        service.databaseDriver(uri),
	}, nil
}

// databasDriver creates the structure required for migration database driver.
func (service Migration) databaseDriver(uri string) migration.DBDriver {
	return migration.DBDriver{
		Name:    "postgres",
		OpenStr: uri,
		Import:  "github.com/lib/pq",
		Dialect: &migration.PostgresDialect{},
	}
}
