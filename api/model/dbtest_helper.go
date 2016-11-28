package model

import (
	"io/ioutil"
	"log"

	pg "gopkg.in/pg.v5"
)

func LoadSchema(db *pg.DB) {
	b, err := ioutil.ReadFile("../../db/schema.sql")
	if err != nil {
		log.Println(err)
	}

	db.Exec(string(b))

}

func NewTestDB() *pg.DB {
	db := pg.Connect(&pg.Options{
		User:     "postgres",
		Database: "postgres",
	})
	return db
}
