// +build windows

package db

import (
	"github.com/18F/e-QIP-prototype/api/logmsg"
	log "github.com/sirupsen/logrus"
)

// MigrateUp attempts to push any pending updates to the database
func MigrateUp(directory, environment, schema string) error {
	log.Warn(logmsg.MigrationUnsupported)
	return nil
}

// CurrentVersion gets the database current version according to the migration status
func CurrentVersion(directory, environment, schema string) (int64, error) {
	return 0, nil
}
