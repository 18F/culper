// +build !windows

package api

import (
	"path/filepath"

	"github.com/truetandem/plucked/migration"
)

// Migration is a service used for data storage migrations.
type Migration struct {
	Env Settings
}

// Up attempts to push any pending updates to the database
func (service Migration) Up(directory, environment, schema string) error {
	conf, err := service.databaseConf(directory, environment, schema)
	if err != nil {
		return err
	}

	target, err := migration.NumericComponent(service.Env.String("DB_MIGRATION_TARGET"))
	if err != nil {
		target, err = migration.GetMostRecentDBVersion(conf.MigrationsDir)
		if err != nil {
			return err
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
	uri := service.Env.String(DATABASE_URI)
	return &migration.DBConf{
		MigrationsDir: filepath.Join(directory, "migrations"),
		Env:           environment,
		PgSchema:      schema,
		Driver:        service.databaseDriver(uri),
	}, nil
}

// databaseDriver creates the structure required for migration database driver.
func (service Migration) databaseDriver(uri string) migration.DBDriver {
	return migration.DBDriver{
		Name:    "postgres",
		OpenStr: uri,
		Import:  "github.com/lib/pq",
		Dialect: &migration.PostgresDialect{},
	}
}
