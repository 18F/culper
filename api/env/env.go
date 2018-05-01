package env

import (
	"fmt"
	"net/url"
	"os"
	"strconv"

	"github.com/18F/e-QIP-prototype/api"
)

// Native settings using environment variables.
type Native struct{}

// Configure the environment.
func (env Native) Configure() {
	env.ensure(api.GolangEnv, "development")
	env.ensure(api.LogLevel, "warning")
	env.ensure(api.SessionTimeout, "15")
	env.ensure(api.DatabaseURI, env.buildDatabaseURI())
	env.ensure(api.Port, "3000")
	env.ensure(api.HashRouting, "0")
	env.ensure(api.FlushStorage, "0")
	env.ensure(api.BasicEnabled, "0")
	env.ensure(api.SamlEnabled, "0")
	env.ensure(api.Disable2FA, "0")
	env.ensure(api.Allow2FAReset, "0")
	env.ensure(api.WindowSize, "3")
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

func (env Native) buildDatabaseURI() string {
	// By user (+ password) + database + host
	uri := &url.URL{Scheme: "postgres"}
	username := env.String(api.DatabaseUser)
	if username == "" {
		username = "postgres"
	}

	// Check if there is a password set. If not then we need to create
	// the Userinfo structure in a different way so we don't include
	// exta colons (:).
	pw := env.String(api.DatabasePassword)
	if pw == "" {
		uri.User = url.User(username)
	} else {
		uri.User = url.UserPassword(username, pw)
	}

	// The database name will be part of the URI path so it needs
	// a prefix of "/"
	database := env.String(api.DatabaseName)
	if database == "" {
		database = "postgres"
	}
	uri.Path = fmt.Sprintf("/%s", database)

	// Host can be either "address + port" or just "address"
	host := env.String(api.DatabaseHost)
	if host == "" {
		host = "localhost:5432"
	}
	uri.Host = host

	return uri.String()
}
