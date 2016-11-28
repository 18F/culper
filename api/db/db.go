package db

import (
	"log"
	"os"

	pg "gopkg.in/pg.v5"
)

func NewDB() *pg.DB {
	user := os.Getenv("DATABASE_USER")
	database := os.Getenv("DATABASE_NAME")

	if user == "" {
		log.Println("WARNING: `DATABASE_USER` env variable has not been set. Setting default")
		user = "postgres"
	}
	if database == "" {
		log.Println("WARNING: `DATABASE_NAME` env variable has not been set. Setting default")
		database = "postgres"
	}

	db := pg.Connect(&pg.Options{
		User:     user,
		Database: database,
	})

	return db
}
