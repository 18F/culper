package mock

import (
	"fmt"
	"os"
	"strconv"

	"github.com/18F/e-QIP-prototype/api"
)

type Native struct{}

func (env Native) Configure() {
	if !env.Has(api.DATABASE_URI) {
		connectionString := fmt.Sprintf("postgres://%s@%s/%s", os.Getenv(api.DATABASE_USER), os.Getenv(api.DATABASE_HOST), os.Getenv(api.DATABASE_NAME))
		os.Setenv(api.DATABASE_URI, connectionString)
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
