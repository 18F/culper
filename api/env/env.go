package env

import (
	"fmt"
	"net/url"
	"os"
	"strconv"

	"github.com/18F/e-QIP-prototype/api"
)

type Native struct{}

func (env Native) Configure() {
	if !env.Has(api.DATABASE_URI) {
		os.Setenv(api.DATABASE_URI, env.buildDatabaseURI())
	}
}

func (env Native) Has(name string) bool {
	if os.Getenv(name) == "" {
		return false
	}
	return true
}

func (env Native) String(name string) string {
	return os.Getenv(name)
}

func (env Native) True(name string) bool {
	b, err := strconv.ParseBool(os.Getenv(name))
	if err != nil {
		return false
	}
	return b
}

func (env Native) Int(name string) int {
	i, err := strconv.Atoi(os.Getenv(name))
	if err != nil {
		return 0
	}
	return i
}

func (env Native) buildDatabaseURI() string {
	// By user (+ password) + database + host
	uri := &url.URL{Scheme: "postgres"}
	username := env.String(api.DATABASE_USER)
	if username == "" {
		username = "postgres"
	}

	// Check if there is a password set. If not then we need to create
	// the Userinfo structure in a different way so we don't include
	// exta colons (:).
	pw := env.String(api.DATABASE_PASSWORD)
	if pw == "" {
		uri.User = url.User(username)
	} else {
		uri.User = url.UserPassword(username, pw)
	}

	// The database name will be part of the URI path so it needs
	// a prefix of "/"
	database := env.String(api.DATABASE_NAME)
	if database == "" {
		database = "postgres"
	}
	uri.Path = fmt.Sprintf("/%s", database)

	// Host can be either "address + port" or just "address"
	host := env.String(api.DATABASE_HOST)
	if host == "" {
		host = "localhost:5432"
	}
	uri.Host = host

	return uri.String()
}
