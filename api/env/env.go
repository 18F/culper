package env

import (
	"fmt"
	"net/url"
	"os"
	"strconv"
	"strings"

	"github.com/18F/e-QIP-prototype/api"
)

// Native settings using environment variables.
type Native struct{}

// Configure the environment.
func (env Native) Configure() {
	// Setting DatabaseURI overwrites all of the other database environment variables.
	if env.Has(api.DatabaseURI) {

		// Parse the address as a URI. If it fails behave as if DatabaseURI is not set
		dbString := env.String(api.DatabaseURI)
		uri, err := url.Parse(dbString)
		if err != nil {
			fmt.Printf("ERROR: The %s did not parse: %s\n", api.DatabaseURI, dbString)
		} else {
			// Remove the leading slash on the path to retrieve the database name
			dbName := strings.TrimPrefix(uri.Path, "/")

			// Ignore whether the password was set or not since an empty string suffices
			// for the connection options as well.
			dbPassword, _ := uri.User.Password()

			if env.Has(api.DatabaseUser) || env.Has(api.DatabasePassword) ||
				env.Has(api.DatabaseHost) || env.Has(api.DatabaseName) {
				fmt.Printf("WARNING: Setting %s is overwriting the values set in %s, %s, %s, and %s.\n",
					api.DatabaseURI, api.DatabaseUser, api.DatabasePassword, api.DatabaseHost, api.DatabaseName)
			}

			os.Setenv(api.DatabaseUser, uri.User.Username())
			os.Setenv(api.DatabasePassword, dbPassword)
			os.Setenv(api.DatabaseHost, uri.Host)
			os.Setenv(api.DatabaseName, dbName)
		}
	}

	// ensure the db variable defaults are set
	env.ensure(api.DatabaseUser, "postgres")
	env.ensure(api.DatabaseHost, "localhost:5432")
	env.ensure(api.DatabaseName, "postgres")
	env.ensure(api.TestDatabaseName, "eapp_test")

	env.ensure(api.GolangEnv, "development")
	env.ensure(api.LogLevel, "warning")
	env.ensure(api.SessionTimeout, "15")
	env.ensure(api.Port, "3000")
	env.ensure(api.HashRouting, "0")
	env.ensure(api.FlushStorage, "0")
	env.ensure(api.BasicEnabled, "0")
	env.ensure(api.SamlEnabled, "0")
	env.ensure(api.AttachmentsEnabled, "1")
	env.ensure(api.FileMaximumSize, "5000000")
	env.ensure(api.FileTypes, ".tiff;.png;.pdf")
	env.ensure(api.WsEnabled, "1")
}

// Has returns if the environment has a value for the given environment variable.
func (env Native) Has(name string) bool {
	if os.Getenv(name) == "" {
		return false
	}
	return true
}

// String returns the string value of the given environment variable.
func (env Native) String(name string) string {
	return os.Getenv(name)
}

// True returns the boolean value of the given environment variable.
func (env Native) True(name string) bool {
	b, err := strconv.ParseBool(os.Getenv(name))
	if err != nil {
		return false
	}
	return b
}

// Int returns the integer value of the given environment variable.
func (env Native) Int(name string) int {
	i, err := strconv.Atoi(os.Getenv(name))
	if err != nil {
		return 0
	}
	return i
}

func (env Native) ensure(name, value string) {
	if !env.Has(name) {
		os.Setenv(name, value)
	}
}
