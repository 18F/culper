package db

import (
	"net/url"
	"strings"

	"github.com/18F/e-QIP-prototype/api/cf"
	pg "gopkg.in/pg.v5"
)

// NewDB establishes a new database connection
func NewDB() *pg.DB {
	addr := cf.DatabaseURI("aws-rds")

	// Parse the address as a URI. If it fails return an empty connection
	uri, err := url.Parse(addr)
	if err != nil {
		return pg.Connect(&pg.Options{})
	}

	// Remove the leading slash on the path to retrieve the database name
	db := strings.TrimPrefix(uri.Path, "/")

	// Ignore whether the password was set or not since an empty string suffices
	// for the connection options as well.
	pw, _ := uri.User.Password()
	return pg.Connect(&pg.Options{
		User:     uri.User.Username(),
		Password: pw,
		Addr:     uri.Host,
		Database: db,
	})
}
