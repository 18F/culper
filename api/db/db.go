package db

import (
	"log"
	"os"

	pg "gopkg.in/pg.v5"
)

func NewDB() *pg.DB {
	user := os.Getenv("DATABASE_USER")
	database := os.Getenv("DATABASE_NAME")
	host := os.Getenv("DATABASE_HOST")

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

	db := pg.Connect(&pg.Options{
		User:     user,
		Database: database,
		Addr:     host,
	})

	return db
}
