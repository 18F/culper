package model

import (
	"io/ioutil"
	"log"

	"github.com/18F/e-QIP-prototype/api/db"

	"github.com/go-pg/pg"
)

func LoadSchema(db *pg.DB) {
	b, err := ioutil.ReadFile("../../db/schema.sql")
	if err != nil {
		log.Println(err)
	}

	db.Exec(string(b))

}

func NewTestDB() *pg.DB {
	db := db.NewDB()
	return db
}
