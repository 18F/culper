// +build !windows

package api

import (
	"path/filepath"

	"github.com/pkg/errors"
	"github.com/truetandem/plucked/migration"
)

// Migration is a service used for data storage migrations.
type Migration struct {
	Env Settings
}

// Up attempts to push any pending updates to the database
func (service Migration) Up(dbURI, directory, environment, schema string) error {
	conf, err := service.databaseConf(dbURI, directory, environment, schema)
	if err != nil {
		return errors.Wrap(err, "Couldn't determine db Conf")
	}

	target, err := migration.NumericComponent(service.Env.String(DbMigrationTarget))
	if err != nil {
		target, err = migration.GetMostRecentDBVersion(conf.MigrationsDir)
		if err != nil {
			return errors.Wrap(err, "Couldn't Get most recent version")
		}
	}

	return migration.RunMigrations(conf, conf.MigrationsDir, target)
}

// CurrentVersion gets the database current version according to the migration status
func (service Migration) CurrentVersion(dbURI, directory, environment, schema string) (int64, error) {
	conf, err := service.databaseConf(dbURI, directory, environment, schema)
	if err != nil {
		return 0, err
	}

	return migration.GetDBVersion(conf)
}

// databaseConf will generate the configuration in memory using environment variables
// instead of the YAML file. This is ideal to reduce the dependencies in production.
func (service Migration) databaseConf(dbURI, directory, environment, schema string) (*migration.DBConf, error) {
	return &migration.DBConf{
		MigrationsDir: filepath.Join(directory, "migrations"),
		Env:           environment,
		PgSchema:      schema,
		Driver:        service.databaseDriver(dbURI),
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
