package env

import (
	"os"
	"strconv"
)

type Native struct{}

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
