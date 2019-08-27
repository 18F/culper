//+build !test

package mock

import (
	"fmt"
	"os"
	"strconv"

	"github.com/18F/e-QIP-prototype/api"
)

// Native is a mock (not really) implementation.
type Native struct{}

// Configure the environment.
func (env Native) Configure() {
	if !env.Has(api.DatabaseURI) {
		connectionString := fmt.Sprintf("postgres://%s@%s/%s", os.Getenv(api.DatabaseUser), os.Getenv(api.DatabaseHost), os.Getenv(api.DatabaseName))
		os.Setenv(api.DatabaseURI, connectionString)
	}
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
