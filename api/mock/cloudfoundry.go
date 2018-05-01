package mock

import (
	"os"
	"strconv"
)

type CloudFoundry struct{}

func (env CloudFoundry) Has(name string) bool {
	if os.Getenv(name) == "" {
		return false
	}
	return true
}

func (env CloudFoundry) String(name string) string {
	return os.Getenv(name)
}

func (env CloudFoundry) True(name string) bool {
	b, err := strconv.ParseBool(os.Getenv(name))
	if err != nil {
		return false
	}
	return b
}

func (env CloudFoundry) Int(name string) int {
	i, err := strconv.Atoi(os.Getenv(name))
	if err != nil {
		return 0
	}
	return i
}
