package db

import (
	"log"

	"github.com/truetandem/e-QIP-prototype/api/cf"
	pg "gopkg.in/pg.v5"
)

// NewDB establishes a new database connection
func NewDB() *pg.DB {
	// By address (preferred)
	addr := cf.UserService("database", "url")

	if addr != "" {
		return pg.Connect(&pg.Options{
			Addr: addr,
		})
	}

	// Or, by user + database + host
	user := cf.UserService("database", "user")
	database := cf.UserService("database", "name")
	host := cf.UserService("database", "host")

	if user == "" {
		log.Println("WARNING: `DATABASE_USER` env variable has not been set. Setting default")
		user = "postgres"
	}

	if database == "" {
		log.Println("WARNING: `DATABASE_NAME` env variable has not been set. Setting default")
		database = "postgres"
	}

	if host == "" {
		host = "localhost:5432"
		log.Println("WARNING: `DATABASE_HOST` env variable has not been set. Setting default")
	}

	return pg.Connect(&pg.Options{
		User:     user,
		Database: database,
		Addr:     host,
	})

}
